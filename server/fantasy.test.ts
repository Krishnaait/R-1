import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock database functions with correct function names from db.ts
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(null),
  // Teams
  createTeam: vi.fn().mockResolvedValue(1),
  addTeamPlayers: vi.fn().mockResolvedValue(undefined),
  getTeamsByUserId: vi.fn().mockResolvedValue([]),
  getTeamsByUserAndMatch: vi.fn().mockResolvedValue([]),
  getTeamById: vi.fn().mockResolvedValue(null),
  getTeamPlayers: vi.fn().mockResolvedValue([]),
  // Contests
  getContestsByMatchId: vi.fn().mockResolvedValue([]),
  getAllContests: vi.fn().mockResolvedValue([]),
  getContestById: vi.fn().mockResolvedValue(null),
  createContest: vi.fn().mockResolvedValue(1),
  joinContest: vi.fn().mockResolvedValue(1),
  getUserContestEntries: vi.fn().mockResolvedValue([]),
  getLeaderboard: vi.fn().mockResolvedValue([]),
  syncContestStatuses: vi.fn().mockResolvedValue(undefined),
}));

// Mock cricket API
vi.mock("./cricketApi", () => ({
  getMatches: vi.fn().mockResolvedValue([
    {
      id: "test-match-1",
      name: "India vs Australia",
      matchType: "T20",
      status: "Match not started",
      venue: "Mumbai",
      date: "2024-12-31",
      dateTimeGMT: "2024-12-31T14:00:00",
      teams: ["India", "Australia"],
      series_id: "series-1",
      fantasyEnabled: true,
      bbbEnabled: true,
      hasSquad: true,
      matchStarted: false,
      matchEnded: false,
    },
  ]),
  getMatchSquad: vi.fn().mockResolvedValue([
    {
      teamName: "India",
      players: [
        { id: "p1", name: "Virat Kohli", role: "Batsman", credits: 10 },
        { id: "p2", name: "Rohit Sharma", role: "Batsman", credits: 10 },
      ],
    },
    {
      teamName: "Australia",
      players: [
        { id: "p3", name: "Steve Smith", role: "Batsman", credits: 9 },
        { id: "p4", name: "Pat Cummins", role: "Bowler", credits: 9 },
      ],
    },
  ]),
  getMatchInfo: vi.fn().mockResolvedValue({
    id: "test-match-1",
    name: "India vs Australia",
    status: "Match not started",
  }),
  categorizeMatches: vi.fn().mockReturnValue({
    live: [],
    upcoming: [{ id: "test-match-1", name: "India vs Australia" }],
    completed: [],
  }),
  generatePlayerCredits: vi.fn().mockReturnValue(9),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(authenticated: boolean = false): TrpcContext {
  const user: AuthenticatedUser | null = authenticated
    ? {
        id: 1,
        openId: "test-user-123",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      }
    : null;

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("Cricket API Routes", () => {
  it("should return matches list", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.cricket.getMatches();

    expect(result).toBeDefined();
    expect(result.all).toBeDefined();
    expect(Array.isArray(result.all)).toBe(true);
    expect(result.all.length).toBeGreaterThan(0);
    expect(result.all[0]).toHaveProperty("id");
    expect(result.all[0]).toHaveProperty("name");
    expect(result.all[0]).toHaveProperty("teams");
  });

  it("should return match squad", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const squad = await caller.cricket.getSquad({ matchId: "test-match-1" });

    expect(squad).toBeDefined();
    expect(Array.isArray(squad)).toBe(true);
    expect(squad.length).toBe(2);
    expect(squad[0]).toHaveProperty("teamName");
    expect(squad[0]).toHaveProperty("players");
  });
});

describe("Teams Routes", () => {
  it("should return user teams when authenticated", async () => {
    const ctx = createMockContext(true);
    const caller = appRouter.createCaller(ctx);

    const teams = await caller.teams.myTeams();

    expect(teams).toBeDefined();
    expect(Array.isArray(teams)).toBe(true);
  });

  it("should throw error when creating team without authentication", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.teams.create({
        matchId: "test-match-1",
        name: "My Team",
        captainId: "p1",
        viceCaptainId: "p2",
        players: [
          { playerId: "p1", playerName: "Player 1", playerRole: "Batsman", credits: 9 },
          { playerId: "p2", playerName: "Player 2", playerRole: "Batsman", credits: 9 },
          { playerId: "p3", playerName: "Player 3", playerRole: "Batsman", credits: 9 },
          { playerId: "p4", playerName: "Player 4", playerRole: "Batsman", credits: 9 },
          { playerId: "p5", playerName: "Player 5", playerRole: "Bowler", credits: 9 },
          { playerId: "p6", playerName: "Player 6", playerRole: "Bowler", credits: 9 },
          { playerId: "p7", playerName: "Player 7", playerRole: "Bowler", credits: 9 },
          { playerId: "p8", playerName: "Player 8", playerRole: "All-Rounder", credits: 9 },
          { playerId: "p9", playerName: "Player 9", playerRole: "All-Rounder", credits: 9 },
          { playerId: "p10", playerName: "Player 10", playerRole: "Wicket-Keeper", credits: 9 },
          { playerId: "p11", playerName: "Player 11", playerRole: "Wicket-Keeper", credits: 9 },
        ],
      })
    ).rejects.toThrow();
  });
});

describe("Contests Routes", () => {
  it("should return contests for a match", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const contests = await caller.contests.getByMatch({ matchId: "test-match-1" });

    expect(contests).toBeDefined();
    expect(Array.isArray(contests)).toBe(true);
  });

  it("should throw error when joining contest without authentication", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contests.join({
        contestId: 1,
        teamId: 1,
      })
    ).rejects.toThrow();
  });

  it("should return leaderboard for a contest", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const leaderboard = await caller.contests.leaderboard({ contestId: 1 });

    expect(leaderboard).toBeDefined();
    expect(Array.isArray(leaderboard)).toBe(true);
  });
});

describe("Auth Routes", () => {
  it("should return null user when not authenticated", async () => {
    const ctx = createMockContext(false);
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();

    expect(user).toBeNull();
  });

  it("should return user when authenticated", async () => {
    const ctx = createMockContext(true);
    const caller = appRouter.createCaller(ctx);

    const user = await caller.auth.me();

    expect(user).toBeDefined();
    expect(user?.name).toBe("Test User");
    expect(user?.email).toBe("test@example.com");
  });

  it("should successfully logout", async () => {
    const ctx = createMockContext(true);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
  });
});
