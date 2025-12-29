/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// Fantasy Cricket Platform Types

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: Score[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
  t1?: string;
  t2?: string;
  t1img?: string;
  t2img?: string;
  t1s?: string;
  t2s?: string;
  ms?: string;
  series?: string;
}

export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface Player {
  id: string;
  name: string;
  role?: string;
  battingStyle?: string;
  bowlingStyle?: string;
  country?: string;
  credits?: number;
}

export interface SquadData {
  teamName: string;
  players: Player[];
}

export interface LeaderboardEntry {
  entryId: number;
  points: string;
  rankPosition?: number;
  teamId: number;
  userId: number;
  userName: string;
  teamName: string;
}

// Company Info
export const COMPANY_INFO = {
  name: "IMAGINITIATE VENTURES PRIVATE LIMITED",
  companyName: "IMAGINITIATE VENTURES PRIVATE LIMITED",
  brandName: "IMAGINITIATE",
  tagline: "Fantasy Sports",
  address: "A-96 GROUND FLOOR, SHANKAR GARDEN VIKASPURI, NEW DELHI, East Delhi, Delhi, 110018",
  domain: "imaginitiatesports.com",
  email: "support@imaginitiatesports.com",
  phone: "+91-XXXXXXXXXX",
} as const;
