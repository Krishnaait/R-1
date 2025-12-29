import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, ArrowLeft, Loader2, Target, Crown, Star } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";

export default function MyTeams() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  const { data: myTeams, isLoading } = trpc.teams.myTeams.useQuery(
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
              <Users className="h-8 w-8 text-primary" />
              My Teams
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage all your fantasy cricket teams
            </p>
          </div>
        </section>

        {/* Teams List */}
        <section className="py-8">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-48 animate-pulse bg-muted" />
                ))}
              </div>
            ) : myTeams && myTeams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myTeams.map((team) => (
                  <Card key={team.id} className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span className="truncate">{team.name}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          #{team.id}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Match ID:</span>
                          <span className="font-mono text-xs truncate max-w-[150px]">
                            {team.matchId}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Credits Used:</span>
                          <span className="font-semibold">{team.totalCreditsUsed}/100</span>
                        </div>

                        <div className="flex items-center gap-4 pt-2 border-t border-border">
                          <div className="flex items-center gap-1 text-sm">
                            <Crown className="h-4 w-4 text-yellow-500" />
                            <span className="text-muted-foreground">C:</span>
                            <span className="font-mono text-xs truncate max-w-[60px]">
                              {team.captainId.substring(0, 8)}...
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-orange-500" />
                            <span className="text-muted-foreground">VC:</span>
                            <span className="font-mono text-xs truncate max-w-[60px]">
                              {team.viceCaptainId.substring(0, 8)}...
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Created: {new Date(team.createdAt).toLocaleDateString()}
                        </div>

                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href={`/match/${team.matchId}/contests`}>
                            Join Contest
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Teams Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't created any fantasy teams yet. Start by selecting a match!
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
