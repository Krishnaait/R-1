import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2, Zap, Clock, CheckCircle, RefreshCw, Info } from "lucide-react";
import { useSearch } from "wouter";
import { Button } from "@/components/ui/button";

export default function Matches() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialTab = params.get("tab") || "live";
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const { data: matchData, isLoading, error, refetch, isFetching } = trpc.cricket.getMatches.useQuery(
    undefined,
    {
      refetchInterval: 3000, // Refetch every 3 seconds for real-time updates
    }
  );

  const totalMatches = (matchData?.live?.length || 0) + (matchData?.upcoming?.length || 0) + (matchData?.completed?.length || 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/50 border-b border-border py-8">
          <div className="container">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Cricket Matches</h1>
                <p className="text-muted-foreground">
                  Select a match to create your fantasy team and join contests
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            {/* Info banner */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2">
              <Info className="h-4 w-4 shrink-0" />
              <span>All times are displayed in Indian Standard Time (IST). Data refreshes automatically every 3 seconds.</span>
            </div>
          </div>
        </section>

        {/* Matches Content */}
        <section className="py-8">
          <div className="container">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading matches from CricAPI...</p>
              </div>
            ) : error ? (
              <Card className="p-8 text-center">
                <p className="text-destructive mb-4">Failed to load matches. Please try again later.</p>
                <Button onClick={() => refetch()} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                  <TabsTrigger value="live" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Live
                    {matchData?.live && matchData.live.length > 0 && (
                      <span className="ml-1 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full animate-pulse">
                        {matchData.live.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Upcoming
                    {matchData?.upcoming && matchData.upcoming.length > 0 && (
                      <span className="ml-1 bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                        {matchData.upcoming.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Completed
                    {matchData?.completed && matchData.completed.length > 0 && (
                      <span className="ml-1 bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {matchData.completed.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>

                {/* Summary */}
                <div className="mb-6 text-sm text-muted-foreground">
                  Total {totalMatches} matches available • {matchData?.live?.length || 0} live • {matchData?.upcoming?.length || 0} upcoming • {matchData?.completed?.length || 0} completed
                </div>

                <TabsContent value="live">
                  {matchData?.live && matchData.live.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchData.live.map((match) => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center bg-card/50">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No Live Matches Right Now</h3>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        There are no cricket matches being played at this moment. 
                        Live matches will appear here automatically when they start.
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <Button variant="outline" onClick={() => setActiveTab("upcoming")}>
                          <Clock className="h-4 w-4 mr-2" />
                          View Upcoming
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("completed")}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          View Completed
                        </Button>
                      </div>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="upcoming">
                  {matchData?.upcoming && matchData.upcoming.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchData.upcoming.map((match) => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center bg-card/50">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No Upcoming Matches Scheduled</h3>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        There are no upcoming matches in the schedule right now. 
                        New matches will appear here as they get scheduled.
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <Button variant="outline" onClick={() => setActiveTab("live")}>
                          <Zap className="h-4 w-4 mr-2" />
                          View Live
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab("completed")}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          View Completed
                        </Button>
                      </div>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="completed">
                  {matchData?.completed && matchData.completed.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchData.completed.map((match) => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center bg-card/50">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No Completed Matches</h3>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        There are no completed matches to display at this time.
                      </p>
                      <Button variant="outline" onClick={() => setActiveTab("live")}>
                        <Zap className="h-4 w-4 mr-2" />
                        View Live Matches
                      </Button>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
