/**
 * Cron Job Handler for Contest Sync
 * 
 * This module provides an endpoint that can be called by external cron services
 * (like cron-job.org, Vercel Cron, or any scheduler) to sync contest statuses.
 * 
 * The endpoint requires a CRON_SECRET for authentication to prevent unauthorized access.
 */

import { getMatches, categorizeMatches } from "./cricketApi";
import * as db from "./db";

export interface CronSyncResult {
  success: boolean;
  message: string;
  timestamp: string;
  stats: {
    liveContests: number;
    completedContests: number;
    newContestsCreated: number;
  };
}

/**
 * Sync contest statuses with match statuses
 * This function should be called periodically (e.g., every 5 minutes)
 */
export async function syncContests(): Promise<CronSyncResult> {
  try {
    const matches = await getMatches();
    const categorized = categorizeMatches(matches);

    // Update contest statuses based on match status
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
      timestamp: new Date().toISOString(),
      stats: {
        liveContests: liveMatchIds.length,
        completedContests: completedMatchIds.length,
        newContestsCreated: newMatchIds.length * 2,
      },
    };
  } catch (error) {
    console.error("[Cron] Error syncing contests:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
      timestamp: new Date().toISOString(),
      stats: {
        liveContests: 0,
        completedContests: 0,
        newContestsCreated: 0,
      },
    };
  }
}

/**
 * Verify cron secret for authentication
 */
export function verifyCronSecret(providedSecret: string | undefined): boolean {
  const cronSecret = process.env.CRON_SECRET;
  
  // If no CRON_SECRET is set, allow in development mode only
  if (!cronSecret) {
    console.warn("[Cron] CRON_SECRET not set. Allowing request in development mode.");
    return process.env.NODE_ENV !== "production";
  }
  
  return providedSecret === cronSecret;
}
