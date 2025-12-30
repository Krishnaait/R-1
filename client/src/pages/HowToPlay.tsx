import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Users, 
  Trophy, 
  Zap, 
  Crown, 
  Star, 
  ArrowRight,
  CheckCircle,
  Gamepad2,
  Target,
  Clock,
  TrendingUp,
  Award,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Shield,
  HelpCircle,
  Play
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Select a Match",
    description: "Browse through upcoming cricket matches from various leagues including IPL, BBL, PSL, SA20, and international matches. Each match displays the teams, venue, and start time in IST.",
    details: [
      "View live, upcoming, and completed matches",
      "Check match details including venue and timing",
      "See available contests for each match",
      "Data refreshes automatically every 3 seconds"
    ]
  },
  {
    number: "02",
    icon: Trophy,
    title: "Create Your Dream Team",
    description: "Build your fantasy team of 11 players within a budget of 100 credits. Each player has a credit value based on their recent performance and form.",
    details: [
      "Select players from both teams",
      "Balance your team with batsmen, bowlers, all-rounders, and wicket-keepers",
      "View detailed player statistics before selecting",
      "Stay within the 100 credit budget"
    ]
  },
  {
    number: "03",
    icon: Crown,
    title: "Choose Captain & Vice-Captain",
    description: "This is the most crucial decision! Your Captain earns 2x points and Vice-Captain earns 1.5x points. Choose players you expect to perform exceptionally well.",
    details: [
      "Captain (C) earns double points (2x)",
      "Vice-Captain (VC) earns 1.5x points",
      "Both must be from your selected 11 players",
      "Strategic selection can significantly boost your score"
    ]
  },
  {
    number: "04",
    icon: Gamepad2,
    title: "Join Free Contests",
    description: "Enter any of our free contests with your created team. All contests on our platform are completely free to join - no entry fees, no hidden charges.",
    details: [
      "All contests are 100% free to join",
      "Multiple contest formats available",
      "Compete against other cricket fans",
      "Join multiple contests with the same team"
    ]
  },
  {
    number: "05",
    icon: Zap,
    title: "Track Live Scores",
    description: "Watch your fantasy points accumulate in real-time as the actual match progresses. Our live scoring system updates automatically with every ball bowled.",
    details: [
      "Real-time point calculations",
      "Live leaderboard updates",
      "Ball-by-ball score tracking",
      "Automatic data refresh every 3 seconds"
    ]
  },
  {
    number: "06",
    icon: Star,
    title: "Climb the Leaderboard",
    description: "Compete for the top positions on the leaderboard. The higher you rank, the more glory you achieve! Track your performance across multiple contests.",
    details: [
      "Real-time ranking updates",
      "View your position among all participants",
      "Track your historical performance",
      "Earn bragging rights with top finishes"
    ]
  },
];

const pointsSystem = {
  batting: [
    { action: "Run scored", t20: "+1", odi: "+1", test: "+1" },
    { action: "Boundary bonus (4s)", t20: "+1", odi: "+1", test: "+1" },
    { action: "Six bonus (6s)", t20: "+2", odi: "+2", test: "+2" },
    { action: "Half-century bonus (50 runs)", t20: "+8", odi: "+4", test: "+4" },
    { action: "Century bonus (100 runs)", t20: "+16", odi: "+8", test: "+8" },
    { action: "Duck (0 runs, out)", t20: "-2", odi: "-3", test: "-4" },
  ],
  bowling: [
    { action: "Wicket (excluding run out)", t20: "+25", odi: "+25", test: "+16" },
    { action: "Bonus for LBW/Bowled", t20: "+8", odi: "+8", test: "+8" },
    { action: "3 wicket haul", t20: "+4", odi: "+4", test: "+4" },
    { action: "4 wicket haul", t20: "+8", odi: "+8", test: "+8" },
    { action: "5 wicket haul", t20: "+16", odi: "+16", test: "+16" },
    { action: "Maiden over", t20: "+12", odi: "+4", test: "+2" },
  ],
  fielding: [
    { action: "Catch taken", t20: "+8", odi: "+8", test: "+8" },
    { action: "Stumping", t20: "+12", odi: "+12", test: "+12" },
    { action: "Run out (direct hit)", t20: "+12", odi: "+12", test: "+12" },
    { action: "Run out (thrower/catcher)", t20: "+6", odi: "+6", test: "+6" },
  ],
  economy: [
    { action: "Below 5 runs per over (min 2 overs)", t20: "+6", odi: "+3", test: "-" },
    { action: "Between 5-6 runs per over", t20: "+4", odi: "+2", test: "-" },
    { action: "Between 6-7 runs per over", t20: "+2", odi: "+1", test: "-" },
    { action: "Between 10-11 runs per over", t20: "-2", odi: "-1", test: "-" },
    { action: "Between 11-12 runs per over", t20: "-4", odi: "-2", test: "-" },
    { action: "Above 12 runs per over", t20: "-6", odi: "-3", test: "-" },
  ],
  strikeRate: [
    { action: "Above 170 (min 10 balls)", t20: "+6", odi: "+3", test: "-" },
    { action: "Between 150-170", t20: "+4", odi: "+2", test: "-" },
    { action: "Between 130-150", t20: "+2", odi: "+1", test: "-" },
    { action: "Between 60-70", t20: "-2", odi: "-1", test: "-" },
    { action: "Between 50-60", t20: "-4", odi: "-2", test: "-" },
    { action: "Below 50", t20: "-6", odi: "-3", test: "-" },
  ],
};

const teamRules = [
  { rule: "Total Players", value: "Exactly 11 players" },
  { rule: "Maximum Credits", value: "100 credits" },
  { rule: "Players from one team", value: "Maximum 7 players" },
  { rule: "Wicket-keepers", value: "Minimum 1, Maximum 4" },
  { rule: "Batsmen", value: "Minimum 1, Maximum 6" },
  { rule: "All-rounders", value: "Minimum 1, Maximum 6" },
  { rule: "Bowlers", value: "Minimum 1, Maximum 6" },
  { rule: "Captain", value: "1 player (2x points)" },
  { rule: "Vice-Captain", value: "1 player (1.5x points)" },
];

const proTips = [
  {
    icon: Target,
    title: "Research Player Form",
    description: "Check recent performances, head-to-head records, and venue statistics before selecting players. Our platform provides detailed player stats to help you make informed decisions."
  },
  {
    icon: TrendingUp,
    title: "Consider Pitch Conditions",
    description: "Different pitches favor different types of players. Flat pitches are good for batsmen, while green tops help fast bowlers. Dry, turning tracks favor spinners."
  },
  {
    icon: Clock,
    title: "Check Playing XI",
    description: "Wait for the toss and playing XI announcement before finalizing your team. This ensures all your selected players are actually playing in the match."
  },
  {
    icon: Award,
    title: "Balance Risk and Safety",
    description: "Mix proven performers with differential picks. Having some unique players can help you climb the leaderboard when they perform well."
  },
  {
    icon: BarChart3,
    title: "Captain Selection is Key",
    description: "Your captain earns 2x points, so choose wisely. Pick a player who is in good form and has a favorable matchup. This single decision can make or break your contest."
  },
  {
    icon: Shield,
    title: "Diversify Your Teams",
    description: "If you're creating multiple teams, diversify your captain and vice-captain choices. This hedges your risk and increases your chances of having a winning team."
  },
];

export default function HowToPlay() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
          <div className="container relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Play className="h-4 w-4" />
              Complete Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How to Play <span className="gradient-brand-text">Fantasy Cricket</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Master the art of fantasy cricket with our comprehensive guide. Learn how to create 
              winning teams, understand the points system, and climb the leaderboard on {COMPANY_INFO.brandName}.
            </p>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Quick Overview</h2>
                  <p className="text-muted-foreground text-center leading-relaxed mb-8">
                    Fantasy cricket is a game where you create a virtual team of real cricket players and 
                    earn points based on their actual performance in real matches. The better your players 
                    perform, the more points you score. Compete against other fans and prove your cricket knowledge!
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Users, label: "Select 11 Players" },
                      { icon: Crown, label: "Pick C & VC" },
                      { icon: Gamepad2, label: "Join Contests" },
                      { icon: Trophy, label: "Win Glory" },
                    ].map((item, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                        <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Steps Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step Guide</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these steps to start your fantasy cricket journey
              </p>
            </div>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <Card key={step.number} className="card-hover overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Step Number */}
                      <div className="bg-primary/10 p-6 md:p-8 flex items-center justify-center md:w-48">
                        <div className="text-center">
                          <span className="text-4xl md:text-5xl font-bold gradient-brand-text">{step.number}</span>
                          <step.icon className="h-8 w-8 text-primary mx-auto mt-2" />
                        </div>
                      </div>
                      
                      {/* Step Content */}
                      <div className="p-6 md:p-8 flex-1">
                        <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Creation Rules */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Team Creation Rules</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these rules when building your fantasy team
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Rule</th>
                          <th className="text-right py-3 px-4 font-semibold">Requirement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamRules.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="py-3 px-4 text-muted-foreground">{item.rule}</td>
                            <td className="py-3 px-4 text-right font-medium">{item.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Points System Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Points System</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understand how points are calculated for different actions across formats
              </p>
            </div>
            
            {/* Batting Points */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-brand-text">Batting Points</h3>
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Action</th>
                          <th className="text-center py-3 px-4 font-semibold">T20</th>
                          <th className="text-center py-3 px-4 font-semibold">ODI</th>
                          <th className="text-center py-3 px-4 font-semibold">Test</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointsSystem.batting.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="py-3 px-4 text-muted-foreground">{item.action}</td>
                            <td className={`py-3 px-4 text-center font-semibold ${item.t20.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{item.t20}</td>
                            <td className={`py-3 px-4 text-center font-semibold ${item.odi.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{item.odi}</td>
                            <td className={`py-3 px-4 text-center font-semibold ${item.test.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{item.test}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bowling Points */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-brand-text">Bowling Points</h3>
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Action</th>
                          <th className="text-center py-3 px-4 font-semibold">T20</th>
                          <th className="text-center py-3 px-4 font-semibold">ODI</th>
                          <th className="text-center py-3 px-4 font-semibold">Test</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointsSystem.bowling.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="py-3 px-4 text-muted-foreground">{item.action}</td>
                            <td className="py-3 px-4 text-center font-semibold text-green-500">{item.t20}</td>
                            <td className="py-3 px-4 text-center font-semibold text-green-500">{item.odi}</td>
                            <td className="py-3 px-4 text-center font-semibold text-green-500">{item.test}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Fielding Points */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-brand-text">Fielding Points</h3>
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Action</th>
                          <th className="text-center py-3 px-4 font-semibold">T20</th>
                          <th className="text-center py-3 px-4 font-semibold">ODI</th>
                          <th className="text-center py-3 px-4 font-semibold">Test</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointsSystem.fielding.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="py-3 px-4 text-muted-foreground">{item.action}</td>
                            <td className="py-3 px-4 text-center font-semibold text-green-500">{item.t20}</td>
                            <td className="py-3 px-4 text-center font-semibold text-green-500">{item.odi}</td>
                            <td className="py-3 px-4 text-center font-semibold text-green-500">{item.test}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Economy Rate Bonus/Penalty */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-brand-text">Economy Rate Bonus/Penalty (Bowlers)</h3>
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Economy Rate</th>
                          <th className="text-center py-3 px-4 font-semibold">T20</th>
                          <th className="text-center py-3 px-4 font-semibold">ODI</th>
                          <th className="text-center py-3 px-4 font-semibold">Test</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointsSystem.economy.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="py-3 px-4 text-muted-foreground">{item.action}</td>
                            <td className={`py-3 px-4 text-center font-semibold ${item.t20.startsWith("+") ? "text-green-500" : item.t20.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}>{item.t20}</td>
                            <td className={`py-3 px-4 text-center font-semibold ${item.odi.startsWith("+") ? "text-green-500" : item.odi.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}>{item.odi}</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">{item.test}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Strike Rate Bonus/Penalty */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center gradient-brand-text">Strike Rate Bonus/Penalty (Batsmen)</h3>
              <Card className="max-w-4xl mx-auto">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Strike Rate</th>
                          <th className="text-center py-3 px-4 font-semibold">T20</th>
                          <th className="text-center py-3 px-4 font-semibold">ODI</th>
                          <th className="text-center py-3 px-4 font-semibold">Test</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pointsSystem.strikeRate.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                            <td className="py-3 px-4 text-muted-foreground">{item.action}</td>
                            <td className={`py-3 px-4 text-center font-semibold ${item.t20.startsWith("+") ? "text-green-500" : item.t20.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}>{item.t20}</td>
                            <td className={`py-3 px-4 text-center font-semibold ${item.odi.startsWith("+") ? "text-green-500" : item.odi.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}>{item.odi}</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">{item.test}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pro Tips Section */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Pro Tips for Winning</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Expert strategies to help you build winning fantasy teams
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {proTips.map((tip, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <tip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-8 w-8 text-primary shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-4">Important Notes</h3>
                      <ul className="space-y-3">
                        {[
                          "Teams can be edited until the match starts (toss time)",
                          "Once the match begins, your team is locked and cannot be changed",
                          "Points are calculated based on the official match statistics",
                          "In case of abandoned or cancelled matches, contests may be cancelled",
                          "All contests on our platform are completely free - no entry fees",
                          "Multiple teams can be created for the same match",
                        ].map((note, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Check out our FAQ section for more detailed answers to common questions
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/faq">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  View FAQ
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Playing?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Put your cricket knowledge to the test - it's completely free! Browse upcoming matches and create your first fantasy team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-brand">
                <Link href="/matches">
                  Browse Matches
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/faq">
                  Read FAQ
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
