import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "wouter";
import { 
  ArrowLeft, 
  Loader2, 
  RefreshCw, 
  MapPin, 
  Calendar,
  Clock,
  Zap
} from "lucide-react";

export default function LiveScore() {
  const { matchId } = useParams<{ matchId: string }>();
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const { data: match, isLoading, refetch, isFetching } = trpc.cricket.getMatch.useQuery(
    { matchId: matchId || "" },
    { 
      enabled: !!matchId,
      refetchInterval: autoRefresh ? 3000 : false, // Auto-refresh every 3 seconds
    }
  );

  // IST offset in milliseconds (5 hours 30 minutes)
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

  const formatDate = (dateStr: string) => {
    const gmtDate = new Date(dateStr);
    const istDate = new Date(gmtDate.getTime() + IST_OFFSET_MS);
    return istDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const gmtDate = new Date(dateStr);
    const istDate = new Date(gmtDate.getTime() + IST_OFFSET_MS);
    return istDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " IST";
  };

  const getStatusBadge = () => {
    if (!match) return null;
    const status = match.ms || (match.matchEnded ? "result" : match.matchStarted ? "live" : "fixture");
    
    switch (status) {
      case "live":
        return <Badge className="badge-live text-lg px-4 py-1">LIVE</Badge>;
      case "fixture":
        return <Badge className="badge-upcoming text-lg px-4 py-1">Upcoming</Badge>;
      case "result":
        return <Badge className="badge-completed text-lg px-4 py-1">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Match not found</p>
            <Button asChild className="mt-4">
              <Link href="/matches">Back to Matches</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const isLive = match.ms === "live" || (match.matchStarted && !match.matchEnded);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/50 border-b border-border py-6">
          <div className="container">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/matches">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Matches
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Zap className="h-7 w-7 text-primary" />
                <h1 className="text-2xl font-bold">Live Score</h1>
                {getStatusBadge()}
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
                  Auto-refresh: {autoRefresh ? "ON" : "OFF"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Match Score Card */}
        <section className="py-8">
          <div className="container">
            <Card className="max-w-3xl mx-auto overflow-hidden">
              {/* Match Header */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-4">
                <p className="text-sm text-muted-foreground">{match.series || match.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{match.matchType?.toUpperCase()}</p>
              </div>

              <CardContent className="p-6">
                {/* Teams and Scores */}
                <div className="flex items-center justify-between gap-8 mb-8">
                  {/* Team 1 */}
                  <div className="flex-1 text-center">
                    <div className="h-20 w-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {match.t1img ? (
                        <img
                          src={match.t1img}
                          alt={match.t1 || match.teams?.[0]}
                          className="h-16 w-16 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-muted-foreground">
                          {(match.t1 || match.teams?.[0] || "T1").substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{match.t1 || match.teams?.[0]}</h3>
                    {match.t1s && (
                      <p className="text-3xl font-bold text-primary mt-2">{match.t1s}</p>
                    )}
                  </div>

                  {/* VS */}
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-lg font-bold text-muted-foreground">VS</span>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="flex-1 text-center">
                    <div className="h-20 w-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {match.t2img ? (
                        <img
                          src={match.t2img}
                          alt={match.t2 || match.teams?.[1]}
                          className="h-16 w-16 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-muted-foreground">
                          {(match.t2 || match.teams?.[1] || "T2").substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{match.t2 || match.teams?.[1]}</h3>
                    {match.t2s && (
                      <p className="text-3xl font-bold text-primary mt-2">{match.t2s}</p>
                    )}
                  </div>
                </div>

                {/* Match Status */}
                <div className="text-center p-4 bg-muted/50 rounded-lg mb-6">
                  <p className="text-lg">{match.status}</p>
                </div>

                {/* Match Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(match.dateTimeGMT || match.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(match.dateTimeGMT || match.date)}</span>
                  </div>
                  {match.venue && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{match.venue}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="max-w-3xl mx-auto mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              {!match.matchEnded && (
                <>
                  <Button asChild className="gradient-brand">
                    <Link href={`/match/${matchId}/create-team`}>Create Team</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/match/${matchId}/contests`}>View Contests</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
