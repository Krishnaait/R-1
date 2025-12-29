import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { Match } from "@shared/types";

interface MatchCardProps {
  match: Match;
  showActions?: boolean;
}

export default function MatchCard({ match, showActions = true }: MatchCardProps) {
  const getStatusBadge = () => {
    const status = match.ms || (match.matchEnded ? "result" : match.matchStarted ? "live" : "fixture");
    
    switch (status) {
      case "live":
        return <Badge className="badge-live">LIVE</Badge>;
      case "fixture":
        return <Badge className="badge-upcoming">Upcoming</Badge>;
      case "result":
        return <Badge className="badge-completed">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpcoming = match.ms === "fixture" || (!match.matchStarted && !match.matchEnded);

  return (
    <Card className="card-hover bg-card border-border overflow-hidden">
      <CardContent className="p-0">
        {/* Match Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground truncate max-w-[60%]">
            {match.series || match.name}
          </span>
          {getStatusBadge()}
        </div>

        {/* Teams */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Team 1 */}
            <div className="flex-1 text-center">
              <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {match.t1img ? (
                  <img
                    src={match.t1img}
                    alt={match.t1 || match.teams?.[0]}
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {(match.t1 || match.teams?.[0] || "T1").substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <p className="font-medium text-sm truncate">{match.t1 || match.teams?.[0]}</p>
              {match.t1s && (
                <p className="text-primary font-semibold text-lg">{match.t1s}</p>
              )}
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground font-medium">VS</span>
            </div>

            {/* Team 2 */}
            <div className="flex-1 text-center">
              <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {match.t2img ? (
                  <img
                    src={match.t2img}
                    alt={match.t2 || match.teams?.[1]}
                    className="h-10 w-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {(match.t2 || match.teams?.[1] || "T2").substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <p className="font-medium text-sm truncate">{match.t2 || match.teams?.[1]}</p>
              {match.t2s && (
                <p className="text-primary font-semibold text-lg">{match.t2s}</p>
              )}
            </div>
          </div>

          {/* Match Status/Result */}
          {match.status && (
            <p className="text-center text-xs text-muted-foreground mt-3 truncate">
              {match.status}
            </p>
          )}
        </div>

        {/* Match Info */}
        <div className="px-4 pb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(match.dateTimeGMT || match.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatTime(match.dateTimeGMT || match.date)}</span>
          </div>
          {match.venue && (
            <div className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{match.venue}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && isUpcoming && (
          <div className="px-4 pb-4 flex gap-2">
            <Button asChild className="flex-1 gradient-brand">
              <Link href={`/match/${match.id}/create-team`}>Create Team</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/match/${match.id}/contests`}>View Contests</Link>
            </Button>
          </div>
        )}

        {showActions && !isUpcoming && (
          <div className="px-4 pb-4">
            <Button asChild variant="outline" className="w-full">
              <Link href={`/match/${match.id}/live-score`}>View Details</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
