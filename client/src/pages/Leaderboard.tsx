import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams, Link } from "wouter";
import { 
  ArrowLeft, 
  Loader2, 
  Trophy, 
  Medal,
  Crown
} from "lucide-react";

export default function Leaderboard() {
  const { contestId } = useParams<{ contestId: string }>();
  const { user } = useAuth();
  
  const { data: leaderboard, isLoading, refetch, isFetching } = trpc.contests.leaderboard.useQuery(
    { contestId: parseInt(contestId || "0") },
    { 
      enabled: !!contestId,
      refetchInterval: 3000, // Auto-refresh every 3 seconds
    }
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case 2:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
      case 3:
        return "bg-amber-600/20 text-amber-600 border-amber-600/30";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/50 border-b border-border py-8">
          <div className="container">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/matches">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Matches
              </Link>
            </Button>
            
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Trophy className="h-7 w-7 text-primary" />
              Contest Leaderboard
            </h1>
            {leaderboard && leaderboard.length > 0 && (
              <p className="text-muted-foreground mt-2">
                {leaderboard.length} participants
              </p>
            )}
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="py-8">
          <div className="container">
            {leaderboard && leaderboard.length > 0 ? (
              <>
                {/* Top 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {leaderboard.slice(0, 3).map((entry, index) => (
                    <Card 
                      key={entry.entryId} 
                      className={`${getRankBadge(index + 1)} ${
                        entry.userName === user?.name ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="mb-3">{getRankIcon(index + 1)}</div>
                        <h3 className="font-semibold text-lg mb-1">{entry.userName}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{entry.teamName}</p>
                        <p className="text-3xl font-bold text-primary">{entry.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Full Leaderboard Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Rank</TableHead>
                          <TableHead>Player</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaderboard.map((entry, index) => (
                          <TableRow 
                            key={entry.entryId}
                            className={entry.userName === user?.name ? "bg-primary/5" : ""}
                          >
                            <TableCell>
                              <div className="flex items-center justify-center w-8 h-8">
                                {getRankIcon(index + 1)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{entry.userName}</span>
                                {entry.userName === user?.name && (
                                  <Badge variant="secondary" className="text-xs">You</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {entry.teamName}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {entry.points}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="p-12 text-center">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Entries Yet</h3>
                <p className="text-muted-foreground">
                  No one has joined this contest yet. Be the first!
                </p>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
