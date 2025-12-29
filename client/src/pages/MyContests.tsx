import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Trophy, ArrowLeft, Loader2, Target } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";

export default function MyContests() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  const { data: myEntries, isLoading } = trpc.contests.myEntries.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="badge-live">LIVE</Badge>;
      case "upcoming":
        return <Badge className="badge-upcoming">Upcoming</Badge>;
      case "completed":
        return <Badge className="badge-completed">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/50 border-b border-border py-8">
          <div className="container">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              My Contests
            </h1>
            <p className="text-muted-foreground mt-2">
              Track all your contest entries and performance
            </p>
          </div>
        </section>

        {/* Contests List */}
        <section className="py-8">
          <div className="container">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-24 animate-pulse bg-muted" />
                ))}
              </div>
            ) : myEntries && myEntries.length > 0 ? (
              <div className="space-y-4">
                {myEntries.map((entry) => (
                  <Card key={entry.id} className="card-hover">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{entry.contestName}</h3>
                            {getStatusBadge(entry.contestStatus)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Team: <span className="text-foreground">{entry.teamName}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Joined: {new Date(entry.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{entry.points}</p>
                            <p className="text-xs text-muted-foreground">Points</p>
                          </div>
                          
                          {entry.rankPosition && (
                            <div className="text-center">
                              <p className="text-2xl font-bold">#{entry.rankPosition}</p>
                              <p className="text-xs text-muted-foreground">Rank</p>
                            </div>
                          )}
                          
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/contest/${entry.contestId}/leaderboard`}>
                              View Leaderboard
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Contests Joined</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't joined any contests yet. Create a team and join exciting contests!
                </p>
                <Button asChild className="gradient-brand">
                  <Link href="/matches">Browse Matches</Link>
                </Button>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
