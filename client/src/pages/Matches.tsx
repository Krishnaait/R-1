import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Loader2, Zap, Clock, CheckCircle } from "lucide-react";
import { useSearch } from "wouter";

export default function Matches() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialTab = params.get("tab") || "upcoming";
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const { data: matchData, isLoading, error } = trpc.cricket.getMatches.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/50 border-b border-border py-8">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Cricket Matches</h1>
            <p className="text-muted-foreground">
              Select a match to create your fantasy team and join contests
            </p>
          </div>
        </section>

        {/* Matches Content */}
        <section className="py-8">
          <div className="container">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <Card className="p-8 text-center">
                <p className="text-destructive">Failed to load matches. Please try again later.</p>
              </Card>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                  <TabsTrigger value="live" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Live
                    {matchData?.live && matchData.live.length > 0 && (
                      <span className="ml-1 bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">
                        {matchData.live.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="upcoming" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Completed
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="live">
                  {matchData?.live && matchData.live.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchData.live.map((match) => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center">
                      <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Live Matches</h3>
                      <p className="text-muted-foreground">
                        There are no live matches at the moment. Check back later!
                      </p>
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
                    <Card className="p-12 text-center">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Upcoming Matches</h3>
                      <p className="text-muted-foreground">
                        There are no upcoming matches scheduled. Check back later!
                      </p>
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
                    <Card className="p-12 text-center">
                      <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Completed Matches</h3>
                      <p className="text-muted-foreground">
                        There are no completed matches to display.
                      </p>
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
