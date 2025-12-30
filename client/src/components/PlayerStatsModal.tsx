import { trpc } from "@/lib/trpc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User, Target, TrendingUp, Award, Zap } from "lucide-react";

interface PlayerStatsModalProps {
  playerId: string | null;
  playerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PlayerStatsModal({
  playerId,
  playerName,
  open,
  onOpenChange,
}: PlayerStatsModalProps) {
  const { data: stats, isLoading } = trpc.cricket.getPlayerStats.useQuery(
    { playerId: playerId || "", matchType: "t20" },
    { enabled: !!playerId && open }
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {playerName}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : stats ? (
          <div className="space-y-4">
            {/* Player Info */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{stats.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{stats.country}</span>
                  {stats.role && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {stats.role}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Tabs */}
            <Tabs defaultValue="batting" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="batting">Batting</TabsTrigger>
                <TabsTrigger value="bowling">Bowling</TabsTrigger>
              </TabsList>

              <TabsContent value="batting" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={<Target className="h-4 w-4" />}
                    label="Matches"
                    value={stats.batting.matches}
                  />
                  <StatCard
                    icon={<TrendingUp className="h-4 w-4" />}
                    label="Runs"
                    value={stats.batting.runs}
                    highlight
                  />
                  <StatCard
                    icon={<Zap className="h-4 w-4" />}
                    label="Average"
                    value={stats.batting.average.toFixed(2)}
                  />
                  <StatCard
                    icon={<Zap className="h-4 w-4" />}
                    label="Strike Rate"
                    value={stats.batting.strikeRate.toFixed(2)}
                  />
                  <StatCard
                    icon={<Award className="h-4 w-4" />}
                    label="50s / 100s"
                    value={`${stats.batting.fifties} / ${stats.batting.hundreds}`}
                  />
                  <StatCard
                    icon={<Award className="h-4 w-4" />}
                    label="Highest"
                    value={stats.batting.highestScore}
                    highlight
                  />
                </div>
              </TabsContent>

              <TabsContent value="bowling" className="space-y-3 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={<Target className="h-4 w-4" />}
                    label="Matches"
                    value={stats.bowling.matches}
                  />
                  <StatCard
                    icon={<TrendingUp className="h-4 w-4" />}
                    label="Wickets"
                    value={stats.bowling.wickets}
                    highlight
                  />
                  <StatCard
                    icon={<Zap className="h-4 w-4" />}
                    label="Average"
                    value={stats.bowling.average.toFixed(2)}
                  />
                  <StatCard
                    icon={<Zap className="h-4 w-4" />}
                    label="Economy"
                    value={stats.bowling.economy.toFixed(2)}
                  />
                  <StatCard
                    icon={<Award className="h-4 w-4" />}
                    label="Best Bowling"
                    value={stats.bowling.bestBowling}
                    highlight
                  />
                  <StatCard
                    icon={<Award className="h-4 w-4" />}
                    label="5 Wickets"
                    value={stats.bowling.fiveWickets}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Styles Info */}
            {(stats.battingStyle || stats.bowlingStyle) && (
              <div className="p-3 bg-muted/50 rounded-lg text-sm">
                {stats.battingStyle && (
                  <p>
                    <span className="text-muted-foreground">Batting Style:</span>{" "}
                    {stats.battingStyle}
                  </p>
                )}
                {stats.bowlingStyle && (
                  <p>
                    <span className="text-muted-foreground">Bowling Style:</span>{" "}
                    {stats.bowlingStyle}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Player statistics not available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className={`p-3 rounded-lg ${highlight ? "bg-primary/10" : "bg-muted/50"}`}>
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
        {icon}
        {label}
      </div>
      <p className={`font-semibold ${highlight ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}
