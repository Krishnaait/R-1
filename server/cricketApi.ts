/**
 * Cricket API Integration
 * Fetches live cricket data from CricAPI
 */

const CRIC_API_BASE = "https://api.cricapi.com/v1";

// IST offset in milliseconds (5 hours 30 minutes)
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// Get API key from environment
function getApiKey(): string {
  const key = process.env.CRICAPI_KEY;
  if (!key) {
    console.warn("[CricketAPI] CRICAPI_KEY not set");
    return "";
  }
  return key;
}

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  dateTimeIST: string; // Added IST time
  teams: string[];
  teamInfo?: TeamInfo[];
  score?: Score[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
  // CricScore specific fields
  t1?: string;
  t2?: string;
  t1img?: string;
  t2img?: string;
  t1s?: string;
  t2s?: string;
  ms?: string; // match status: "live" | "fixture" | "result"
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
}

export interface SquadData {
  teamName: string;
  players: Player[];
}

/**
 * Convert GMT time string to IST
 */
function convertToIST(dateTimeGMT: string): string {
  try {
    const gmtDate = new Date(dateTimeGMT);
    const istDate = new Date(gmtDate.getTime() + IST_OFFSET_MS);
    return istDate.toISOString().replace('T', ' ').substring(0, 19) + ' IST';
  } catch {
    return dateTimeGMT;
  }
}

/**
 * Format date for display in IST
 */
export function formatDateIST(dateTimeGMT: string): string {
  try {
    const gmtDate = new Date(dateTimeGMT);
    const istDate = new Date(gmtDate.getTime() + IST_OFFSET_MS);
    
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    
    return istDate.toLocaleDateString('en-IN', options) + ' IST';
  } catch {
    return dateTimeGMT;
  }
}

/**
 * Get match status based on flags and time
 */
function getMatchStatus(match: any): 'live' | 'fixture' | 'result' {
  // If explicitly ended, it's a result
  if (match.matchEnded === true) {
    return 'result';
  }
  
  // If explicitly started but not ended, it's live
  if (match.matchStarted === true && match.matchEnded !== true) {
    return 'live';
  }
  
  // Check if match should have started based on time
  if (match.dateTimeGMT) {
    const matchTime = new Date(match.dateTimeGMT);
    const now = new Date();
    
    // If match time is in the future, it's upcoming
    if (matchTime > now) {
      return 'fixture';
    }
    
    // If match time has passed but not marked as ended, check status text
    const statusLower = (match.status || '').toLowerCase();
    if (statusLower.includes('won') || 
        statusLower.includes('draw') || 
        statusLower.includes('tied') ||
        statusLower.includes('no result') ||
        statusLower.includes('abandoned')) {
      return 'result';
    }
    
    // If status indicates ongoing match
    if (statusLower.includes('innings') || 
        statusLower.includes('break') ||
        statusLower.includes('batting') ||
        statusLower.includes('bowling') ||
        statusLower.includes('need') ||
        statusLower.includes('trail') ||
        statusLower.includes('lead')) {
      return 'live';
    }
  }
  
  // Default based on matchStarted flag
  return match.matchStarted ? 'live' : 'fixture';
}

/**
 * Fetch current matches from CricAPI
 * Uses currentMatches endpoint for comprehensive match data
 */
export async function getMatches(): Promise<Match[]> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error("[CricketAPI] No API key available");
    return [];
  }

  try {
    // Use currentMatches endpoint for more comprehensive data
    const response = await fetch(`${CRIC_API_BASE}/currentMatches?apikey=${apiKey}&offset=0`);
    const data = await response.json();
    
    if (data.status !== "success") {
      console.error("[CricketAPI] Failed to fetch matches:", data.reason || data);
      return [];
    }
    
    // Transform the data to match our interface
    const matches: Match[] = (data.data || []).map((match: any) => {
      const matchStatus = getMatchStatus(match);
      
      return {
        id: match.id,
        name: match.name,
        matchType: match.matchType || "unknown",
        status: match.status,
        venue: match.venue || "TBD",
        date: match.date,
        dateTimeGMT: match.dateTimeGMT,
        dateTimeIST: convertToIST(match.dateTimeGMT),
        teams: match.teams || [],
        teamInfo: match.teamInfo,
        score: match.score,
        series_id: match.series_id || "",
        fantasyEnabled: match.fantasyEnabled || false,
        bbbEnabled: match.bbbEnabled || false,
        hasSquad: match.hasSquad || false,
        matchStarted: match.matchStarted || false,
        matchEnded: match.matchEnded || false,
        t1: match.teams?.[0] || match.t1,
        t2: match.teams?.[1] || match.t2,
        t1img: match.teamInfo?.[0]?.img || "",
        t2img: match.teamInfo?.[1]?.img || "",
        t1s: formatTeamScore(match.score, match.teams?.[0]),
        t2s: formatTeamScore(match.score, match.teams?.[1]),
        ms: matchStatus,
        series: match.series || "",
      };
    });
    
    console.log(`[CricketAPI] Fetched ${matches.length} matches`);
    
    return matches;
  } catch (error) {
    console.error("[CricketAPI] Error fetching matches:", error);
    return [];
  }
}

/**
 * Format team score from score array
 */
function formatTeamScore(scores: any[] | undefined, teamName: string | undefined): string {
  if (!scores || !teamName) return "";
  
  // Find score for this team
  const teamScore = scores.find(s => {
    const inning = (s.inning || '').toLowerCase();
    const team = teamName.toLowerCase();
    return inning.includes(team);
  });
  
  if (!teamScore) return "";
  
  return `${teamScore.r}/${teamScore.w} (${teamScore.o})`;
}

/**
 * Fetch match squad/players
 */
export async function getMatchSquad(matchId: string): Promise<SquadData[]> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error("[CricketAPI] No API key available for squad fetch");
    return [];
  }

  try {
    const response = await fetch(`${CRIC_API_BASE}/match_squad?apikey=${apiKey}&id=${matchId}`);
    const data = await response.json();
    
    if (data.status !== "success") {
      console.error("[CricketAPI] Failed to fetch squad:", data.reason || data);
      return [];
    }
    
    // Transform squad data
    const squadData: SquadData[] = (data.data || []).map((team: any) => ({
      teamName: team.teamName || team.name || "Unknown Team",
      players: (team.players || []).map((player: any) => ({
        id: player.id || `player-${Math.random().toString(36).substr(2, 9)}`,
        name: player.name || player.playerName || "Unknown Player",
        role: player.role || player.playingRole || inferRole(player),
        battingStyle: player.battingStyle,
        bowlingStyle: player.bowlingStyle,
        country: player.country,
      })),
    }));
    
    return squadData;
  } catch (error) {
    console.error("[CricketAPI] Error fetching squad:", error);
    return [];
  }
}

/**
 * Infer player role from batting/bowling style if role not provided
 */
function inferRole(player: any): string {
  const battingStyle = player.battingStyle?.toLowerCase() || "";
  const bowlingStyle = player.bowlingStyle?.toLowerCase() || "";
  
  if (player.role) return player.role;
  
  // Check for wicketkeeper
  if (player.name?.toLowerCase().includes("keeper") || 
      player.playingRole?.toLowerCase().includes("keeper")) {
    return "WK-Batsman";
  }
  
  // Check for all-rounder
  if (battingStyle && bowlingStyle && !bowlingStyle.includes("none")) {
    return "All-Rounder";
  }
  
  // Check for bowler
  if (bowlingStyle && !bowlingStyle.includes("none")) {
    return "Bowler";
  }
  
  // Default to batsman
  return "Batsman";
}

/**
 * Fetch match info/details
 */
export async function getMatchInfo(matchId: string): Promise<Match | null> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error("[CricketAPI] No API key available for match info");
    return null;
  }

  try {
    const response = await fetch(`${CRIC_API_BASE}/match_info?apikey=${apiKey}&id=${matchId}`);
    const data = await response.json();
    
    if (data.status !== "success") {
      console.error("[CricketAPI] Failed to fetch match info:", data.reason || data);
      return null;
    }
    
    const match = data.data;
    if (!match) return null;
    
    const matchStatus = getMatchStatus(match);
    
    return {
      id: match.id,
      name: match.name,
      matchType: match.matchType || "unknown",
      status: match.status,
      venue: match.venue || "TBD",
      date: match.date,
      dateTimeGMT: match.dateTimeGMT,
      dateTimeIST: convertToIST(match.dateTimeGMT),
      teams: match.teams || [],
      teamInfo: match.teamInfo,
      score: match.score,
      series_id: match.series_id || "",
      fantasyEnabled: match.fantasyEnabled || false,
      bbbEnabled: match.bbbEnabled || false,
      hasSquad: match.hasSquad || false,
      matchStarted: match.matchStarted || false,
      matchEnded: match.matchEnded || false,
      t1: match.teams?.[0],
      t2: match.teams?.[1],
      t1img: match.teamInfo?.[0]?.img || "",
      t2img: match.teamInfo?.[1]?.img || "",
      t1s: formatScore(match.score, match.teams?.[0]),
      t2s: formatScore(match.score, match.teams?.[1]),
      ms: matchStatus,
      series: match.series || "",
    };
  } catch (error) {
    console.error("[CricketAPI] Error fetching match info:", error);
    return null;
  }
}

/**
 * Format score from score array
 */
function formatScore(scores: Score[] | undefined, teamName: string | undefined): string {
  if (!scores || !teamName) return "";
  
  const teamScore = scores.find(s => s.inning?.toLowerCase().includes(teamName.toLowerCase()));
  if (!teamScore) return "";
  
  return `${teamScore.r}/${teamScore.w} (${teamScore.o})`;
}

/**
 * Categorize matches by status
 */
export function categorizeMatches(matches: Match[]) {
  const live: Match[] = [];
  const upcoming: Match[] = [];
  const completed: Match[] = [];

  for (const match of matches) {
    const status = match.ms || getMatchStatus(match);
    
    if (status === "live") {
      live.push(match);
    } else if (status === "fixture") {
      upcoming.push(match);
    } else {
      completed.push(match);
    }
  }

  // Sort by date
  const sortByDate = (a: Match, b: Match) => {
    const dateA = new Date(a.dateTimeGMT || a.date);
    const dateB = new Date(b.dateTimeGMT || b.date);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  };

  live.sort(sortByDate);
  upcoming.sort((a, b) => {
    const dateA = new Date(a.dateTimeGMT || a.date);
    const dateB = new Date(b.dateTimeGMT || b.date);
    return dateA.getTime() - dateB.getTime(); // Soonest first
  });
  completed.sort(sortByDate);

  console.log(`[CricketAPI] Categorized: ${live.length} live, ${upcoming.length} upcoming, ${completed.length} completed`);

  return { live, upcoming, completed };
}

/**
 * Generate random credits for a player (7-10 range)
 */
export function generatePlayerCredits(): number {
  return Math.floor(Math.random() * 4) + 7; // 7, 8, 9, or 10
}
