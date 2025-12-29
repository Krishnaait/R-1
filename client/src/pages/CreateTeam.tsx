import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useParams, useLocation, Link } from "wouter";
import { 
  ArrowLeft, 
  Loader2, 
  Check, 
  Crown, 
  Star, 
  Users,
  AlertCircle
} from "lucide-react";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";
import { toast } from "sonner";
import type { Player } from "@shared/types";

const TOTAL_CREDITS = 100;
const TEAM_SIZE = 11;

interface SelectedPlayer extends Player {
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

export default function CreateTeam() {
  const { matchId } = useParams<{ matchId: string }>();
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  const [step, setStep] = useState<"select" | "captain" | "name">("select");
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [captainId, setCaptainId] = useState<string>("");
  const [viceCaptainId, setViceCaptainId] = useState<string>("");
  const [teamName, setTeamName] = useState("");
  
  const { data: squad, isLoading: squadLoading } = trpc.cricket.getSquad.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );
  
  const { data: match, isLoading: matchLoading } = trpc.cricket.getMatch.useQuery(
    { matchId: matchId || "" },
    { enabled: !!matchId }
  );

  const createTeamMutation = trpc.teams.create.useMutation({
    onSuccess: (data) => {
      toast.success("Team created successfully!");
      setLocation(`/match/${matchId}/contests`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create team");
    },
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [authLoading, isAuthenticated]);

  const allPlayers = useMemo(() => {
    if (!squad) return [];
    return squad.flatMap(team => 
      team.players.map(p => ({ ...p, team: team.teamName }))
    );
  }, [squad]);

  const usedCredits = useMemo(() => {
    return selectedPlayers.reduce((sum, p) => sum + (p.credits || 0), 0);
  }, [selectedPlayers]);

  const remainingCredits = TOTAL_CREDITS - usedCredits;

  const togglePlayer = (player: Player & { team?: string }) => {
    const isSelected = selectedPlayers.some(p => p.id === player.id);
    
    if (isSelected) {
      setSelectedPlayers(prev => prev.filter(p => p.id !== player.id));
    } else {
      if (selectedPlayers.length >= TEAM_SIZE) {
        toast.error("You can only select 11 players");
        return;
      }
      if ((player.credits || 0) > remainingCredits) {
        toast.error("Not enough credits remaining");
        return;
      }
      setSelectedPlayers(prev => [...prev, player]);
    }
  };

  const handleCaptainSelect = (playerId: string) => {
    if (viceCaptainId === playerId) {
      setViceCaptainId("");
    }
    setCaptainId(playerId);
  };

  const handleViceCaptainSelect = (playerId: string) => {
    if (captainId === playerId) {
      toast.error("Captain and Vice-Captain must be different");
      return;
    }
    setViceCaptainId(playerId);
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    
    createTeamMutation.mutate({
      matchId: matchId || "",
      name: teamName.trim(),
      captainId,
      viceCaptainId,
      players: selectedPlayers.map(p => ({
        playerId: p.id,
        playerName: p.name,
        playerRole: p.role,
        credits: p.credits || 8,
      })),
    });
  };

  if (authLoading || squadLoading || matchLoading) {
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
        <section className="bg-card/50 border-b border-border py-6">
          <div className="container">
            <Button asChild variant="ghost" size="sm" className="mb-4">
              <Link href="/matches">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Matches
              </Link>
            </Button>
            
            <h1 className="text-2xl font-bold mb-2">Create Your Team</h1>
            {match && (
              <p className="text-muted-foreground">
                {match.t1 || match.teams?.[0]} vs {match.t2 || match.teams?.[1]}
              </p>
            )}

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mt-6">
              {["Select Players", "Choose Captain", "Name Team"].map((label, index) => {
                const stepMap = ["select", "captain", "name"];
                const isActive = step === stepMap[index];
                const isCompleted = stepMap.indexOf(step) > index;
                
                return (
                  <div key={label} className="flex items-center">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                      isActive ? "bg-primary text-primary-foreground" :
                      isCompleted ? "bg-primary/20 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
                      <span className="hidden sm:inline">{label}</span>
                    </div>
                    {index < 2 && <div className="w-8 h-0.5 bg-border mx-2" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Credits Bar */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border py-3">
          <div className="container">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{selectedPlayers.length}/{TEAM_SIZE}</span>
                  <span className="text-muted-foreground text-sm">Players</span>
                </div>
                <div className="h-6 w-px bg-border" />
                <div>
                  <span className="font-semibold">{remainingCredits.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm"> Credits Left</span>
                </div>
              </div>
              <Progress value={(usedCredits / TOTAL_CREDITS) * 100} className="w-32 h-2" />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-6">
          <div className="container">
            {step === "select" && (
              <>
                {squad && squad.length > 0 ? (
                  <div className="space-y-8">
                    {squad.map((team) => (
                      <div key={team.teamName}>
                        <h3 className="text-lg font-semibold mb-4">{team.teamName}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {team.players.map((player) => {
                            const isSelected = selectedPlayers.some(p => p.id === player.id);
                            const canAfford = (player.credits || 0) <= remainingCredits;
                            
                            return (
                              <Card
                                key={player.id}
                                className={`cursor-pointer transition-all ${
                                  isSelected 
                                    ? "border-primary bg-primary/5" 
                                    : canAfford || isSelected
                                    ? "hover:border-primary/50"
                                    : "opacity-50"
                                }`}
                                onClick={() => togglePlayer({ ...player, team: team.teamName })}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <p className="font-medium">{player.name}</p>
                                      <p className="text-sm text-muted-foreground">{player.role || "Player"}</p>
                                    </div>
                                    <div className="text-right">
                                      <Badge variant={isSelected ? "default" : "secondary"}>
                                        {player.credits} Cr
                                      </Badge>
                                      {isSelected && (
                                        <Check className="h-5 w-5 text-primary mt-2 ml-auto" />
                                      )}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No squad data available for this match</p>
                  </Card>
                )}

                <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border py-4 mt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="container flex justify-end">
                    <Button
                      onClick={() => setStep("captain")}
                      disabled={selectedPlayers.length !== TEAM_SIZE}
                      className="gradient-brand"
                    >
                      Continue to Captain Selection
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === "captain" && (
              <>
                <div className="max-w-2xl mx-auto">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-yellow-500" />
                        Select Captain (2x Points)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedPlayers.map((player) => (
                          <Button
                            key={player.id}
                            variant={captainId === player.id ? "default" : "outline"}
                            className="justify-start h-auto py-3"
                            onClick={() => handleCaptainSelect(player.id)}
                          >
                            <div className="text-left">
                              <p className="font-medium">{player.name}</p>
                              <p className="text-xs opacity-70">{player.role}</p>
                            </div>
                            {captainId === player.id && (
                              <Crown className="h-4 w-4 ml-auto text-yellow-500" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-orange-500" />
                        Select Vice-Captain (1.5x Points)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedPlayers.map((player) => (
                          <Button
                            key={player.id}
                            variant={viceCaptainId === player.id ? "default" : "outline"}
                            className="justify-start h-auto py-3"
                            onClick={() => handleViceCaptainSelect(player.id)}
                            disabled={captainId === player.id}
                          >
                            <div className="text-left">
                              <p className="font-medium">{player.name}</p>
                              <p className="text-xs opacity-70">{player.role}</p>
                            </div>
                            {viceCaptainId === player.id && (
                              <Star className="h-4 w-4 ml-auto text-orange-500" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border py-4 mt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="container flex justify-between">
                    <Button variant="outline" onClick={() => setStep("select")}>
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep("name")}
                      disabled={!captainId || !viceCaptainId}
                      className="gradient-brand"
                    >
                      Continue to Name Team
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === "name" && (
              <>
                <div className="max-w-md mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Name Your Team</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Enter team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        maxLength={50}
                      />
                      
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-3">Team Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Players:</span>
                            <span>{selectedPlayers.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Credits Used:</span>
                            <span>{usedCredits.toFixed(1)}/100</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Captain:</span>
                            <span>{selectedPlayers.find(p => p.id === captainId)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Vice-Captain:</span>
                            <span>{selectedPlayers.find(p => p.id === viceCaptainId)?.name}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border py-4 mt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="container flex justify-between">
                    <Button variant="outline" onClick={() => setStep("captain")}>
                      Back
                    </Button>
                    <Button
                      onClick={handleCreateTeam}
                      disabled={!teamName.trim() || createTeamMutation.isPending}
                      className="gradient-brand"
                    >
                      {createTeamMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Team"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
