import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { 
  Trophy, 
  Users, 
  Zap, 
  ArrowRight, 
  Star,
  Calendar,
  Target,
  Loader2
} from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: myTeams, isLoading: teamsLoading } = trpc.teams.myTeams.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  
  const { data: myEntries, isLoading: entriesLoading } = trpc.contests.myEntries.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  
  const { data: matchData, isLoading: matchesLoading } = trpc.cricket.getMatches.useQuery();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const activeContests = myEntries?.filter(e => e.contestStatus === "live").length || 0;
  const totalPoints = myEntries?.reduce((sum, e) => sum + parseFloat(e.points || "0"), 0) || 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  Welcome back, <span className="gradient-brand-text">{user?.name || "Player"}</span>!
                </h1>
                <p className="text-muted-foreground">
                  Here's your fantasy cricket overview
                </p>
              </div>
              <Button asChild className="gradient-brand">
                <Link href="/matches">
                  Create New Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{teamsLoading ? "-" : myTeams?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">My Teams</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{entriesLoading ? "-" : myEntries?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Contests Joined</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeContests}</p>
                    <p className="text-sm text-muted-foreground">Active Contests</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Star className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalPoints.toFixed(0)}</p>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Teams */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    My Recent Teams
                  </CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/my-teams">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {teamsLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : myTeams && myTeams.length > 0 ? (
                    <div className="space-y-3">
                      {myTeams.slice(0, 5).map((team) => (
                        <div
                          key={team.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div>
                            <p className="font-medium">{team.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Match: {team.matchId.substring(0, 20)}...
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{team.totalCreditsUsed} credits</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(team.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">No teams created yet</p>
                      <Button asChild>
                        <Link href="/matches">Create Your First Team</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* My Contests */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    My Contests
                  </CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/my-contests">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {entriesLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : myEntries && myEntries.length > 0 ? (
                    <div className="space-y-3">
                      {myEntries.slice(0, 5).map((entry) => (
                        <div
                          key={entry.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div>
                            <p className="font-medium">{entry.contestName}</p>
                            <p className="text-sm text-muted-foreground">
                              Team: {entry.teamName}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              entry.contestStatus === "live" 
                                ? "bg-destructive/20 text-destructive" 
                                : entry.contestStatus === "completed"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-primary/20 text-primary"
                            }`}>
                              {entry.contestStatus}
                            </span>
                            <p className="text-sm font-medium mt-1">{entry.points} pts</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">No contests joined yet</p>
                      <Button asChild>
                        <Link href="/matches">Join a Contest</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Matches */}
            <Card className="mt-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Matches
                </CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/matches">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {matchesLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : matchData?.upcoming && matchData.upcoming.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {matchData.upcoming.slice(0, 3).map((match) => (
                      <div
                        key={match.id}
                        className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <p className="font-medium text-sm mb-2 truncate">{match.name}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <span>{match.t1 || match.teams?.[0]}</span>
                          <span>vs</span>
                          <span>{match.t2 || match.teams?.[1]}</span>
                        </div>
                        <Button asChild size="sm" className="w-full">
                          <Link href={`/match/${match.id}/create-team`}>Create Team</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No upcoming matches at the moment
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
