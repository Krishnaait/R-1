import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with fantasy cricket specific fields.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User Teams - Stores fantasy teams created by users for specific matches
 */
export const userTeams = mysqlTable("user_teams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  matchId: varchar("matchId", { length: 128 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  captainId: varchar("captainId", { length: 128 }).notNull(),
  viceCaptainId: varchar("viceCaptainId", { length: 128 }).notNull(),
  totalCreditsUsed: decimal("totalCreditsUsed", { precision: 5, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserTeam = typeof userTeams.$inferSelect;
export type InsertUserTeam = typeof userTeams.$inferInsert;

/**
 * Team Players - Junction table linking teams to their selected players
 */
export const teamPlayers = mysqlTable("team_players", {
  id: int("id").autoincrement().primaryKey(),
  teamId: int("teamId").notNull(),
  playerId: varchar("playerId", { length: 128 }).notNull(),
  playerName: varchar("playerName", { length: 255 }),
  playerRole: varchar("playerRole", { length: 64 }),
  credits: decimal("credits", { precision: 4, scale: 2 }).default("8.0"),
});

export type TeamPlayer = typeof teamPlayers.$inferSelect;
export type InsertTeamPlayer = typeof teamPlayers.$inferInsert;

/**
 * Contests - Fantasy cricket contests for matches
 */
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  matchId: varchar("matchId", { length: 128 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  entryFee: int("entryFee").notNull().default(0),
  prizePool: int("prizePool").notNull().default(0),
  maxEntries: int("maxEntries").notNull().default(100),
  currentEntries: int("currentEntries").notNull().default(0),
  status: mysqlEnum("status", ["upcoming", "live", "completed"]).default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

/**
 * Contest Entries - User participation in contests with their teams
 */
export const contestEntries = mysqlTable("contest_entries", {
  id: int("id").autoincrement().primaryKey(),
  contestId: int("contestId").notNull(),
  userId: int("userId").notNull(),
  teamId: int("teamId").notNull(),
  points: decimal("points", { precision: 8, scale: 2 }).default("0"),
  rankPosition: int("rankPosition"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContestEntry = typeof contestEntries.$inferSelect;
export type InsertContestEntry = typeof contestEntries.$inferInsert;
