/**
 * Cricket API Integration
 * Fetches live cricket data from CricAPI
 */

const CRIC_API_BASE = "https://api.cricapi.com/v1";

// Get API key from environment
function getApiKey(): string {
  const key = process.env.CRIC_API_KEY;
  if (!key) {
    console.warn("[CricketAPI] CRIC_API_KEY not set, using demo mode");
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
 * Fetch current matches from CricAPI
 */
export async function getMatches(): Promise<Match[]> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    // Return demo data when no API key
    return getDemoMatches();
  }

  try {
    const response = await fetch(`${CRIC_API_BASE}/cricScore?apikey=${apiKey}`);
    const data = await response.json();
    
    if (data.status !== "success") {
      console.error("[CricketAPI] Failed to fetch matches:", data);
      return getDemoMatches();
    }
    
    return data.data || [];
  } catch (error) {
    console.error("[CricketAPI] Error fetching matches:", error);
    return getDemoMatches();
  }
}

/**
 * Fetch match squad/players
 */
export async function getMatchSquad(matchId: string): Promise<SquadData[]> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return getDemoSquad();
  }

  try {
    const response = await fetch(`${CRIC_API_BASE}/match_squad?apikey=${apiKey}&id=${matchId}`);
    const data = await response.json();
    
    if (data.status !== "success") {
      console.error("[CricketAPI] Failed to fetch squad:", data);
      return getDemoSquad();
    }
    
    return data.data || [];
  } catch (error) {
    console.error("[CricketAPI] Error fetching squad:", error);
    return getDemoSquad();
  }
}

/**
 * Fetch match info/details
 */
export async function getMatchInfo(matchId: string): Promise<Match | null> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    const demoMatches = getDemoMatches();
    return demoMatches.find(m => m.id === matchId) || null;
  }

  try {
    const response = await fetch(`${CRIC_API_BASE}/match_info?apikey=${apiKey}&id=${matchId}`);
    const data = await response.json();
    
    if (data.status !== "success") {
      console.error("[CricketAPI] Failed to fetch match info:", data);
      return null;
    }
    
    return data.data || null;
  } catch (error) {
    console.error("[CricketAPI] Error fetching match info:", error);
    return null;
  }
}

/**
 * Demo data for development/testing
 */
function getDemoMatches(): Match[] {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return [
    {
      id: "demo-match-1",
      name: "India vs Australia, 1st T20I",
      matchType: "t20",
      status: "India won by 6 wickets",
      venue: "Sydney Cricket Ground",
      date: yesterday.toISOString().split('T')[0],
      dateTimeGMT: yesterday.toISOString(),
      teams: ["India", "Australia"],
      series_id: "demo-series-1",
      fantasyEnabled: true,
      bbbEnabled: true,
      hasSquad: true,
      matchStarted: true,
      matchEnded: true,
      t1: "India",
      t2: "Australia",
      t1img: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
      t2img: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
      t1s: "186/4 (20)",
      t2s: "182/7 (20)",
      ms: "result",
      series: "India tour of Australia 2025",
    },
    {
      id: "demo-match-2",
      name: "England vs South Africa, 2nd ODI",
      matchType: "odi",
      status: "Match in progress",
      venue: "Lord's Cricket Ground",
      date: now.toISOString().split('T')[0],
      dateTimeGMT: now.toISOString(),
      teams: ["England", "South Africa"],
      series_id: "demo-series-2",
      fantasyEnabled: true,
      bbbEnabled: true,
      hasSquad: true,
      matchStarted: true,
      matchEnded: false,
      t1: "England",
      t2: "South Africa",
      t1img: "https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg",
      t2img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg",
      t1s: "245/6 (42.3)",
      t2s: "",
      ms: "live",
      series: "South Africa tour of England 2025",
    },
    {
      id: "demo-match-3",
      name: "Pakistan vs New Zealand, 3rd Test",
      matchType: "test",
      status: "Match starts at 10:00 AM GMT",
      venue: "National Stadium, Karachi",
      date: tomorrow.toISOString().split('T')[0],
      dateTimeGMT: tomorrow.toISOString(),
      teams: ["Pakistan", "New Zealand"],
      series_id: "demo-series-3",
      fantasyEnabled: true,
      bbbEnabled: true,
      hasSquad: true,
      matchStarted: false,
      matchEnded: false,
      t1: "Pakistan",
      t2: "New Zealand",
      t1img: "https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg",
      t2img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg",
      t1s: "",
      t2s: "",
      ms: "fixture",
      series: "New Zealand tour of Pakistan 2025",
    },
    {
      id: "demo-match-4",
      name: "Mumbai Indians vs Chennai Super Kings, IPL",
      matchType: "t20",
      status: "Match starts at 7:30 PM IST",
      venue: "Wankhede Stadium, Mumbai",
      date: tomorrow.toISOString().split('T')[0],
      dateTimeGMT: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000).toISOString(),
      teams: ["Mumbai Indians", "Chennai Super Kings"],
      series_id: "demo-series-4",
      fantasyEnabled: true,
      bbbEnabled: true,
      hasSquad: true,
      matchStarted: false,
      matchEnded: false,
      t1: "Mumbai Indians",
      t2: "Chennai Super Kings",
      t1img: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Roundbig/MIroundbig.png",
      t2img: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Roundbig/CSKroundbig.png",
      t1s: "",
      t2s: "",
      ms: "fixture",
      series: "Indian Premier League 2025",
    },
    {
      id: "demo-match-5",
      name: "Royal Challengers vs Kolkata Knight Riders, IPL",
      matchType: "t20",
      status: "RCB won by 25 runs",
      venue: "M. Chinnaswamy Stadium, Bangalore",
      date: yesterday.toISOString().split('T')[0],
      dateTimeGMT: yesterday.toISOString(),
      teams: ["Royal Challengers Bangalore", "Kolkata Knight Riders"],
      series_id: "demo-series-4",
      fantasyEnabled: true,
      bbbEnabled: true,
      hasSquad: true,
      matchStarted: true,
      matchEnded: true,
      t1: "Royal Challengers Bangalore",
      t2: "Kolkata Knight Riders",
      t1img: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Roundbig/RCBroundbig.png",
      t2img: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Roundbig/KKRroundbig.png",
      t1s: "198/5 (20)",
      t2s: "173/8 (20)",
      ms: "result",
      series: "Indian Premier League 2025",
    },
  ];
}

function getDemoSquad(): SquadData[] {
  return [
    {
      teamName: "Team A",
      players: [
        { id: "p1", name: "Virat Kohli", role: "Batsman" },
        { id: "p2", name: "Rohit Sharma", role: "Batsman" },
        { id: "p3", name: "KL Rahul", role: "WK-Batsman" },
        { id: "p4", name: "Hardik Pandya", role: "All-Rounder" },
        { id: "p5", name: "Ravindra Jadeja", role: "All-Rounder" },
        { id: "p6", name: "Jasprit Bumrah", role: "Bowler" },
        { id: "p7", name: "Mohammed Shami", role: "Bowler" },
        { id: "p8", name: "Yuzvendra Chahal", role: "Bowler" },
        { id: "p9", name: "Shubman Gill", role: "Batsman" },
        { id: "p10", name: "Rishabh Pant", role: "WK-Batsman" },
        { id: "p11", name: "Axar Patel", role: "All-Rounder" },
      ],
    },
    {
      teamName: "Team B",
      players: [
        { id: "p12", name: "Steve Smith", role: "Batsman" },
        { id: "p13", name: "David Warner", role: "Batsman" },
        { id: "p14", name: "Glenn Maxwell", role: "All-Rounder" },
        { id: "p15", name: "Pat Cummins", role: "Bowler" },
        { id: "p16", name: "Mitchell Starc", role: "Bowler" },
        { id: "p17", name: "Josh Hazlewood", role: "Bowler" },
        { id: "p18", name: "Alex Carey", role: "WK-Batsman" },
        { id: "p19", name: "Marcus Stoinis", role: "All-Rounder" },
        { id: "p20", name: "Travis Head", role: "Batsman" },
        { id: "p21", name: "Marnus Labuschagne", role: "Batsman" },
        { id: "p22", name: "Adam Zampa", role: "Bowler" },
      ],
    },
  ];
}

/**
 * Categorize matches by status
 */
export function categorizeMatches(matches: Match[]) {
  const live: Match[] = [];
  const upcoming: Match[] = [];
  const completed: Match[] = [];

  for (const match of matches) {
    const status = match.ms || (match.matchEnded ? "result" : match.matchStarted ? "live" : "fixture");
    
    if (status === "live") {
      live.push(match);
    } else if (status === "fixture") {
      upcoming.push(match);
    } else {
      completed.push(match);
    }
  }

  return { live, upcoming, completed };
}

/**
 * Generate random credits for a player (7-10 range)
 */
export function generatePlayerCredits(): number {
  return Math.floor(Math.random() * 4) + 7; // 7, 8, 9, or 10
}
