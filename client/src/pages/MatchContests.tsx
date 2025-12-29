import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, Link } from "wouter";
import { 
  ArrowLeft, 
  Loader2, 
  Trophy, 
  Users, 
  Coins,
  Plus,
  AlertCircle
} from "lucide-react";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

export default function MatchContests() {
  const { matchId } = useParams<{ matchId: string }>();
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  
  const { data: contests, isLoading: contestsLoading, refetch } = trpc.contests.getByMatch.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );
  
  const { data: match, isLoading: matchLoading } = trpc.cricket.getMatch.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );
  
  const { data: myTeams, isLoading: teamsLoading } = trpc.teams.getByMatch.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId && isAuthenticated }
  );

  const seedContestsMutation = trpc.contests.seed.useMutation({
    onSuccess: () => {
      toast.success("Contests created successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create contests");
    },
  });

  const joinContestMutation = trpc.contests.join.useMutation({
    onSuccess: () => {
      toast.success("Successfully joined the contest!");
      setJoinDialogOpen(false);
      setSelectedTeam("");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to join contest");
    },
  });

  const handleJoinClick = (contestId: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    
    if (!myTeams || myTeams.length === 0) {
      toast.error("Please create a team first");
      return;
    }
    
    setSelectedContest(contestId);
    setJoinDialogOpen(true);
  };

  const handleJoinConfirm = () => {
    if (!selectedContest || !selectedTeam) {
      toast.error("Please select a team");
      return;
    }
    
    joinContestMutation.mutate({
      contestId: selectedContest,
      teamId: parseInt(selectedTeam),
    });
  };

  const handleSeedContests = () => {
    if (!matchId) return;
    seedContestsMutation.mutate({ matchId });
  };

  if (contestsLoading || matchLoading) {
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
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Trophy className="h-7 w-7 text-primary" />
                  Contests
                </h1>
                {match && (
                  <p className="text-muted-foreground mt-1">
                    {match.t1 || match.teams?.[0]} vs {match.t2 || match.teams?.[1]}
                  </p>
                )}
              </div>
              
              <div className="flex gap-3">
                {isAuthenticated && (
                  <Button asChild variant="outline">
                    <Link href={`/match/${matchId}/create-team`}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Team
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contests List */}
        <section className="py-8">
          <div className="container">
            {contests && contests.length > 0 ? (
              <div className="space-y-4">
                {contests.map((contest) => {
                  const fillPercentage = (contest.currentEntries / contest.maxEntries) * 100;
                  const spotsLeft = contest.maxEntries - contest.currentEntries;
                  
                  return (
                    <Card key={contest.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{contest.name}</h3>
                              <Badge variant={
                                contest.status === "live" ? "destructive" :
                                contest.status === "completed" ? "secondary" :
                                "default"
                              }>
                                {contest.status}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4 text-yellow-500" />
                                <span className="text-muted-foreground">Prize Pool:</span>
                                <span className="font-semibold">₹{contest.prizePool.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Coins className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Entry:</span>
                                <span className="font-semibold">
                                  {contest.entryFee === 0 ? "FREE" : `₹${contest.entryFee}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-accent" />
                                <span className="text-muted-foreground">Spots:</span>
                                <span className="font-semibold">{spotsLeft} left</span>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>{contest.currentEntries} joined</span>
                                <span>{contest.maxEntries} spots</span>
                              </div>
                              <Progress value={fillPercentage} className="h-2" />
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/contest/${contest.id}/leaderboard`}>
                                Leaderboard
                              </Link>
                            </Button>
                            {contest.status === "upcoming" && spotsLeft > 0 && (
                              <Button
                                size="sm"
                                className="gradient-brand"
                                onClick={() => handleJoinClick(contest.id)}
                              >
                                Join Contest
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Contests Available</h3>
                <p className="text-muted-foreground mb-6">
                  There are no contests for this match yet.
                </p>
                {isAuthenticated && (
                  <Button 
                    onClick={handleSeedContests}
                    disabled={seedContestsMutation.isPending}
                    className="gradient-brand"
                  >
                    {seedContestsMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Sample Contests"
                    )}
                  </Button>
                )}
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Join Contest Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join Contest</DialogTitle>
            <DialogDescription>
              Select a team to join this contest
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {teamsLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : myTeams && myTeams.length > 0 ? (
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {myTeams.map((team) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name} ({team.totalCreditsUsed} credits)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">
                  You don't have any teams for this match
                </p>
                <Button asChild>
                  <Link href={`/match/${matchId}/create-team`}>Create Team</Link>
                </Button>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleJoinConfirm}
              disabled={!selectedTeam || joinContestMutation.isPending}
              className="gradient-brand"
            >
              {joinContestMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Contest"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
