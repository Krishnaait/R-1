import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  userTeams, 
  teamPlayers, 
  contests, 
  contestEntries,
  InsertUserTeam,
  InsertTeamPlayer,
  InsertContest,
  InsertContestEntry
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ==================== USER QUERIES ====================

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ==================== TEAM QUERIES ====================

export async function createTeam(team: InsertUserTeam) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(userTeams).values(team);
  return result[0].insertId;
}

export async function addTeamPlayers(players: InsertTeamPlayer[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(teamPlayers).values(players);
}

export async function getTeamsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(userTeams).where(eq(userTeams.userId, userId)).orderBy(desc(userTeams.createdAt));
}

export async function getTeamsByUserAndMatch(userId: number, matchId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(userTeams).where(
    and(eq(userTeams.userId, userId), eq(userTeams.matchId, matchId))
  );
}

export async function getTeamById(teamId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(userTeams).where(eq(userTeams.id, teamId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getTeamPlayers(teamId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(teamPlayers).where(eq(teamPlayers.teamId, teamId));
}

// ==================== CONTEST QUERIES ====================

export async function createContest(contest: InsertContest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contests).values(contest);
  return result[0].insertId;
}

export async function getContestsByMatchId(matchId: string) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contests).where(eq(contests.matchId, matchId));
}

export async function getContestById(contestId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(contests).where(eq(contests.id, contestId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllContests() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contests).orderBy(desc(contests.createdAt));
}

export async function updateContestEntries(contestId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(contests)
    .set({ currentEntries: sql`${contests.currentEntries} + 1` })
    .where(eq(contests.id, contestId));
}

export async function updateContestStatus(contestId: number, status: "upcoming" | "live" | "completed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(contests).set({ status }).where(eq(contests.id, contestId));
}

export async function updateContestStatusByMatchIds(matchIds: string[], status: "upcoming" | "live" | "completed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (matchIds.length === 0) return;

  // Update contests where matchId is in the list
  for (const matchId of matchIds) {
    await db.update(contests).set({ status }).where(eq(contests.matchId, matchId));
  }
}

export async function getContestMatchIds() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select({ matchId: contests.matchId }).from(contests);
  return result.map(r => r.matchId);
}

// ==================== CONTEST ENTRY QUERIES ====================

export async function createContestEntry(entry: InsertContestEntry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contestEntries).values(entry);
  return result[0].insertId;
}

export async function getContestEntriesByContest(contestId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contestEntries)
    .where(eq(contestEntries.contestId, contestId))
    .orderBy(desc(contestEntries.points));
}

export async function getContestEntriesByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contestEntries).where(eq(contestEntries.userId, userId));
}

export async function checkUserContestEntry(userId: number, contestId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(contestEntries)
    .where(and(eq(contestEntries.userId, userId), eq(contestEntries.contestId, contestId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function updateEntryPoints(entryId: number, points: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(contestEntries).set({ points }).where(eq(contestEntries.id, entryId));
}

export async function updateEntryRank(entryId: number, rankPosition: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(contestEntries).set({ rankPosition }).where(eq(contestEntries.id, entryId));
}

// ==================== LEADERBOARD QUERIES ====================

export async function getLeaderboard(contestId: number) {
  const db = await getDb();
  if (!db) return [];

  const entries = await db.select({
    entryId: contestEntries.id,
    points: contestEntries.points,
    rankPosition: contestEntries.rankPosition,
    teamId: contestEntries.teamId,
    userId: contestEntries.userId,
  }).from(contestEntries)
    .where(eq(contestEntries.contestId, contestId))
    .orderBy(desc(contestEntries.points));

  // Enrich with user and team data
  const enrichedEntries = await Promise.all(entries.map(async (entry) => {
    const user = await getUserById(entry.userId);
    const team = await getTeamById(entry.teamId);
    return {
      ...entry,
      userName: user?.name || "Unknown",
      teamName: team?.name || "Unknown Team",
    };
  }));

  return enrichedEntries;
}
