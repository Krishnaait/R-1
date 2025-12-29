import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { getMatches, getMatchSquad, getMatchInfo, categorizeMatches, generatePlayerCredits } from "./cricketApi";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ==================== CRICKET DATA ====================
  cricket: router({
    // Get all matches categorized by status
    getMatches: publicProcedure.query(async () => {
      const matches = await getMatches();
      const categorized = categorizeMatches(matches);
      return {
        all: matches,
        ...categorized,
      };
    }),

    // Get single match info
    getMatch: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        const match = await getMatchInfo(input.matchId);
        return match;
      }),

    // Get match squad with credits
    getSquad: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        const squad = await getMatchSquad(input.matchId);
        // Add credits to each player
        return squad.map(team => ({
          ...team,
          players: team.players.map(player => ({
            ...player,
            credits: generatePlayerCredits(),
          })),
        }));
      }),
  }),

  // ==================== TEAMS ====================
  teams: router({
    // Create a new fantasy team
    create: protectedProcedure
      .input(z.object({
        matchId: z.string(),
        name: z.string().min(1).max(255),
        captainId: z.string(),
        viceCaptainId: z.string(),
        players: z.array(z.object({
          playerId: z.string(),
          playerName: z.string().optional(),
          playerRole: z.string().optional(),
          credits: z.number(),
        })).length(11),
      }))
      .mutation(async ({ ctx, input }) => {
        // Validate captain and vice-captain are in the team
        const playerIds = input.players.map(p => p.playerId);
        if (!playerIds.includes(input.captainId)) {
          throw new Error("Captain must be in the team");
        }
        if (!playerIds.includes(input.viceCaptainId)) {
          throw new Error("Vice-captain must be in the team");
        }
        if (input.captainId === input.viceCaptainId) {
          throw new Error("Captain and vice-captain must be different players");
        }

        // Calculate total credits
        const totalCredits = input.players.reduce((sum, p) => sum + p.credits, 0);
        if (totalCredits > 100) {
          throw new Error("Total credits cannot exceed 100");
        }

        // Create team
        const teamId = await db.createTeam({
          userId: ctx.user.id,
          matchId: input.matchId,
          name: input.name,
          captainId: input.captainId,
          viceCaptainId: input.viceCaptainId,
          totalCreditsUsed: totalCredits.toFixed(2),
        });

        // Add players
        await db.addTeamPlayers(input.players.map(p => ({
          teamId,
          playerId: p.playerId,
          playerName: p.playerName,
          playerRole: p.playerRole,
          credits: p.credits.toFixed(2),
        })));

        return { success: true, teamId };
      }),

    // Get user's teams
    myTeams: protectedProcedure.query(async ({ ctx }) => {
      return await db.getTeamsByUserId(ctx.user.id);
    }),

    // Get user's teams for a specific match
    getByMatch: protectedProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ ctx, input }) => {
        return await db.getTeamsByUserAndMatch(ctx.user.id, input.matchId);
      }),

    // Get team details with players
    getDetails: protectedProcedure
      .input(z.object({ teamId: z.number() }))
      .query(async ({ ctx, input }) => {
        const team = await db.getTeamById(input.teamId);
        if (!team) {
          throw new Error("Team not found");
        }
        if (team.userId !== ctx.user.id) {
          throw new Error("Not authorized to view this team");
        }
        const players = await db.getTeamPlayers(input.teamId);
        return { ...team, players };
      }),
  }),

  // ==================== CONTESTS ====================
  contests: router({
    // Get contests for a match
    getByMatch: publicProcedure
      .input(z.object({ matchId: z.string() }))
      .query(async ({ input }) => {
        return await db.getContestsByMatchId(input.matchId);
      }),

    // Get all contests
    getAll: publicProcedure.query(async () => {
      return await db.getAllContests();
    }),

    // Get single contest
    getById: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return await db.getContestById(input.contestId);
      }),

    // Seed contests for a match (admin/dev use)
    seed: protectedProcedure
      .input(z.object({ matchId: z.string() }))
      .mutation(async ({ input }) => {
        const sampleContests = [
          { name: "Mega Contest", entryFee: 10, prizePool: 1000, maxEntries: 100 },
          { name: "Head to Head", entryFee: 50, prizePool: 90, maxEntries: 2 },
          { name: "Winner Takes All", entryFee: 25, prizePool: 225, maxEntries: 10 },
          { name: "Free Practice", entryFee: 0, prizePool: 0, maxEntries: 1000 },
          { name: "Premium League", entryFee: 100, prizePool: 5000, maxEntries: 50 },
        ];

        const createdIds: number[] = [];
        for (const contest of sampleContests) {
          const id = await db.createContest({
            matchId: input.matchId,
            ...contest,
          });
          createdIds.push(id);
        }

        return { success: true, contestIds: createdIds };
      }),

    // Join a contest
    join: protectedProcedure
      .input(z.object({
        contestId: z.number(),
        teamId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check if contest exists
        const contest = await db.getContestById(input.contestId);
        if (!contest) {
          throw new Error("Contest not found");
        }

        // Check if contest is full
        if (contest.currentEntries >= contest.maxEntries) {
          throw new Error("Contest is full");
        }

        // Check if contest is still open
        if (contest.status !== "upcoming") {
          throw new Error("Contest is no longer accepting entries");
        }

        // Check if team exists and belongs to user
        const team = await db.getTeamById(input.teamId);
        if (!team) {
          throw new Error("Team not found");
        }
        if (team.userId !== ctx.user.id) {
          throw new Error("Team does not belong to you");
        }

        // Check if team is for the same match
        if (team.matchId !== contest.matchId) {
          throw new Error("Team is not for this match");
        }

        // Check if user already joined this contest
        const existingEntry = await db.checkUserContestEntry(ctx.user.id, input.contestId);
        if (existingEntry) {
          throw new Error("You have already joined this contest");
        }

        // Create entry
        const entryId = await db.createContestEntry({
          contestId: input.contestId,
          userId: ctx.user.id,
          teamId: input.teamId,
        });

        // Update contest entry count
        await db.updateContestEntries(input.contestId);

        return { success: true, entryId };
      }),

    // Get user's contest entries
    myEntries: protectedProcedure.query(async ({ ctx }) => {
      const entries = await db.getContestEntriesByUser(ctx.user.id);
      
      // Enrich with contest and team data
      const enrichedEntries = await Promise.all(entries.map(async (entry) => {
        const contest = await db.getContestById(entry.contestId);
        const team = await db.getTeamById(entry.teamId);
        return {
          ...entry,
          contestName: contest?.name || "Unknown Contest",
          contestStatus: contest?.status || "unknown",
          matchId: contest?.matchId || "",
          teamName: team?.name || "Unknown Team",
        };
      }));

      return enrichedEntries;
    }),

    // Get leaderboard for a contest
    leaderboard: publicProcedure
      .input(z.object({ contestId: z.number() }))
      .query(async ({ input }) => {
        return await db.getLeaderboard(input.contestId);
      }),

    // Sync contest statuses with match statuses
    sync: protectedProcedure.mutation(async () => {
      const matches = await getMatches();
      const categorized = categorizeMatches(matches);

      // Update contest statuses
      const liveMatchIds = categorized.live.map(m => m.id);
      const completedMatchIds = categorized.completed.map(m => m.id);

      if (liveMatchIds.length > 0) {
        await db.updateContestStatusByMatchIds(liveMatchIds, "live");
      }
      if (completedMatchIds.length > 0) {
        await db.updateContestStatusByMatchIds(completedMatchIds, "completed");
      }

      // Auto-create contests for new upcoming matches
      const existingMatchIds = await db.getContestMatchIds();
      const upcomingMatchIds = categorized.upcoming.map(m => m.id);
      const newMatchIds = upcomingMatchIds.filter(id => !existingMatchIds.includes(id));

      for (const matchId of newMatchIds) {
        // Create default contests for new matches
        const defaultContests = [
          { name: "Mega Contest", entryFee: 10, prizePool: 1000, maxEntries: 100 },
          { name: "Free Practice", entryFee: 0, prizePool: 0, maxEntries: 1000 },
        ];

        for (const contest of defaultContests) {
          await db.createContest({ matchId, ...contest });
        }
      }

      return {
        success: true,
        message: "Contests synchronized successfully",
        stats: {
          liveContests: liveMatchIds.length,
          completedContests: completedMatchIds.length,
          newContestsCreated: newMatchIds.length * 2,
        },
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
