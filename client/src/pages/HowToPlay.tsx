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
  Gamepad2
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const steps = [
  {
    number: "01",
    icon: Users,
    title: "Select a Match",
    description: "Browse through upcoming cricket matches and select the one you want to play. Each match has multiple free contests to join.",
  },
  {
    number: "02",
    icon: Trophy,
    title: "Create Your Team",
    description: "Build your dream team of 11 players within 100 credits. Choose wisely from batsmen, bowlers, all-rounders, and wicket-keepers.",
  },
  {
    number: "03",
    icon: Crown,
    title: "Choose Captain & Vice-Captain",
    description: "Select your Captain (2x points) and Vice-Captain (1.5x points). These picks can make or break your fantasy team's performance.",
  },
  {
    number: "04",
    icon: Gamepad2,
    title: "Join Free Contests",
    description: "Enter contests with your team - all contests are completely free! Compete against other players and test your cricket knowledge.",
  },
  {
    number: "05",
    icon: Zap,
    title: "Track Live Scores",
    description: "Watch your points accumulate in real-time as the match progresses. Our live scoring system updates automatically.",
  },
  {
    number: "06",
    icon: Star,
    title: "Earn Points & Climb Ranks",
    description: "Climb the leaderboard and earn bragging rights. The higher you rank, the more glory you achieve!",
  },
];

const pointsSystem = [
  { category: "Batting", points: [
    { action: "Run scored", value: "+1" },
    { action: "Boundary (4s)", value: "+1" },
    { action: "Six (6s)", value: "+2" },
    { action: "Half-century (50)", value: "+8" },
    { action: "Century (100)", value: "+16" },
    { action: "Duck (0 runs)", value: "-2" },
  ]},
  { category: "Bowling", points: [
    { action: "Wicket", value: "+25" },
    { action: "Maiden over", value: "+8" },
    { action: "3 wickets", value: "+4" },
    { action: "4 wickets", value: "+8" },
    { action: "5 wickets", value: "+16" },
  ]},
  { category: "Fielding", points: [
    { action: "Catch", value: "+8" },
    { action: "Stumping", value: "+12" },
    { action: "Run out (direct)", value: "+12" },
    { action: "Run out (indirect)", value: "+6" },
  ]},
];

export default function HowToPlay() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How to Play <span className="gradient-brand-text">Fantasy Cricket</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to create winning teams, join free contests, and climb the leaderboard on {COMPANY_INFO.brandName}
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Getting Started</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step) => (
                <Card key={step.number} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm text-primary font-semibold">Step {step.number}</span>
                        <h3 className="text-lg font-semibold mt-1 mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Rules Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Team Creation Rules</h2>
            
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {[
                      "Select exactly 11 players for your team",
                      "Total credits cannot exceed 100",
                      "Each player has a credit value based on their performance",
                      "Choose 1 Captain (2x points) and 1 Vice-Captain (1.5x points)",
                      "You can create multiple teams for the same match",
                      "Teams can be edited until the match starts",
                    ].map((rule, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Points System Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Points System</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pointsSystem.map((category) => (
                <Card key={category.category}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-center gradient-brand-text">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.points.map((point, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{point.action}</span>
                          <span className={`font-semibold ${
                            point.value.startsWith("+") ? "text-green-500" : "text-red-500"
                          }`}>
                            {point.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Playing?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Put your cricket knowledge to the test - it's completely free!
            </p>
            <Button asChild size="lg" className="gradient-brand">
              <Link href="/matches">
                Browse Matches
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
