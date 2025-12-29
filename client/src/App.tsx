import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Dashboard from "./pages/Dashboard";
import MyTeams from "./pages/MyTeams";
import MyContests from "./pages/MyContests";
import CreateTeam from "./pages/CreateTeam";
import MatchContests from "./pages/MatchContests";
import LiveScore from "./pages/LiveScore";
import Leaderboard from "./pages/Leaderboard";

// Informational Pages
import HowToPlay from "./pages/HowToPlay";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FairPlay from "./pages/FairPlay";
import ResponsibleGaming from "./pages/ResponsibleGaming";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Home} />
      <Route path="/matches" component={Matches} />
      
      {/* Match Pages */}
      <Route path="/match/:matchId/create-team" component={CreateTeam} />
      <Route path="/match/:matchId/contests" component={MatchContests} />
      <Route path="/match/:matchId/live-score" component={LiveScore} />
      <Route path="/contest/:contestId/leaderboard" component={Leaderboard} />
      
      {/* Dashboard Pages (Protected) */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/my-teams" component={MyTeams} />
      <Route path="/dashboard/contests" component={MyContests} />
      
      {/* Informational Pages */}
      <Route path="/how-to-play" component={HowToPlay} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={FAQ} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/fair-play" component={FairPlay} />
      <Route path="/responsible-gaming" component={ResponsibleGaming} />
      
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
