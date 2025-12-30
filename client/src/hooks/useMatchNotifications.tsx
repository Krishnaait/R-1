import { useEffect, useRef } from 'react';
import { trpc } from '@/lib/trpc';
import { useNotifications } from '@/contexts/NotificationContext';
import type { Match } from '@shared/types';

/**
 * Hook to monitor match status changes and send notifications
 * when subscribed matches go live
 */
export function useMatchNotifications() {
  const { subscribedMatches, sendNotification, permission } = useNotifications();
  const previousMatchStatusRef = useRef<Map<string, boolean>>(new Map());

  // Fetch matches data with 3-second refresh
  const { data: matchesData } = trpc.cricket.getMatches.useQuery(undefined, {
    refetchInterval: 3000,
    enabled: subscribedMatches.length > 0 && permission === 'granted',
  });

  useEffect(() => {
    if (!matchesData || subscribedMatches.length === 0) return;

    // Get all matches from the response
    const allMatches = matchesData.all || [];

    // Check each subscribed match for status changes
    subscribedMatches.forEach((matchId) => {
      const match = allMatches.find((m: Match) => m.id === matchId);
      if (!match) return;

      const isLive = match.ms === 'live' || (match.matchStarted && !match.matchEnded);
      const wasLive = previousMatchStatusRef.current.get(matchId);

      // If match just went live, send notification
      if (isLive && wasLive === false) {
        const matchName = `${match.t1 || match.teams?.[0]} vs ${match.t2 || match.teams?.[1]}`;
        sendNotification(`🏏 Match is LIVE!`, {
          body: `${matchName} has started! Join now to track your team's performance.`,
          tag: `match-live-${matchId}`,
          requireInteraction: true,
        });
      }

      // Update previous status
      previousMatchStatusRef.current.set(matchId, isLive);
    });
  }, [matchesData, subscribedMatches, sendNotification]);

  // Initialize previous status on first load
  useEffect(() => {
    if (!matchesData) return;

    const allMatches = matchesData.all || [];

    allMatches.forEach((match: Match) => {
      if (subscribedMatches.includes(match.id)) {
        const isLive = match.ms === 'live' || (match.matchStarted && !match.matchEnded);
        if (!previousMatchStatusRef.current.has(match.id)) {
          previousMatchStatusRef.current.set(match.id, isLive);
        }
      }
    });
  }, [matchesData, subscribedMatches]);
}
