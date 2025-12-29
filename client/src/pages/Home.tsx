import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MatchCard from "@/components/MatchCard";
import { 
  Trophy, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight, 
  Star,
  TrendingUp,
  Clock
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const features = [
  {
    icon: Users,
    title: "Build Your Dream Team",
    description: "Select 11 players within 100 credits. Choose your captain (2x) and vice-captain (1.5x) wisely.",
    image: "/images/feature-team.png",
  },
  {
    icon: Trophy,
    title: "Compete in Contests",
    description: "Join exciting contests with different entry fees and prize pools. From free practice to mega contests.",
    image: "/images/feature-contest.png",
  },
  {
    icon: Zap,
    title: "Live Score Updates",
    description: "Track your team's performance in real-time with live scores and automatic point calculations.",
    image: "/images/feature-live.png",
  },
];

const stats = [
  { value: "10L+", label: "Active Users" },
  { value: "500+", label: "Daily Contests" },
  { value: "₹10Cr+", label: "Prizes Won" },
  { value: "100%", label: "Secure" },
];

export default function Home() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { data: matchData, isLoading: matchesLoading } = trpc.cricket.getMatches.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          
          <div className="container relative py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">India's Trusted Fantasy Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                <span className="gradient-brand-text">Fantasy Cricket</span>
                <br />
                <span className="text-foreground">Reimagined</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Build your dream cricket team, compete with millions of players, 
                and win exciting prizes. Experience the thrill of every ball!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {authLoading ? (
                  <div className="h-12 w-40 bg-muted animate-pulse rounded-lg" />
                ) : isAuthenticated ? (
                  <>
                    <Button asChild size="lg" className="gradient-brand text-lg px-8">
                      <Link href="/matches">
                        View Matches
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-lg px-8">
                      <Link href="/dashboard">My Dashboard</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild size="lg" className="gradient-brand text-lg px-8">
                      <a href={getLoginUrl()}>
                        Start Playing Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-lg px-8">
                      <Link href="/how-to-play">How to Play</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <Card key={stat.label} className="bg-card/50 backdrop-blur border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl md:text-3xl font-bold gradient-brand-text">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Live Matches Section */}
        {matchData?.live && matchData.live.length > 0 && (
          <section className="py-16 bg-destructive/5">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-destructive rounded-full animate-pulse" />
                  <h2 className="text-2xl md:text-3xl font-bold">Live Matches</h2>
                </div>
                <Button asChild variant="ghost">
                  <Link href="/matches?tab=live">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchData.live.slice(0, 3).map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Matches Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">Upcoming Matches</h2>
              </div>
              <Button asChild variant="ghost">
                <Link href="/matches?tab=upcoming">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {matchesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-64 animate-pulse bg-muted" />
                ))}
              </div>
            ) : matchData?.upcoming && matchData.upcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchData.upcoming.slice(0, 6).map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No upcoming matches at the moment.</p>
              </Card>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="gradient-brand-text">{COMPANY_INFO.brandName}</span>?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience fantasy cricket like never before with our cutting-edge platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="card-hover overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started in just 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "01", title: "Select a Match", desc: "Choose from upcoming cricket matches" },
                { step: "02", title: "Create Your Team", desc: "Pick 11 players within 100 credits" },
                { step: "03", title: "Join Contests", desc: "Compete and win exciting prizes" },
              ].map((item, index) => (
                <div key={item.step} className="text-center relative">
                  <div className="h-20 w-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              {!isAuthenticated && (
                <Button asChild size="lg" className="gradient-brand">
                  <a href={getLoginUrl()}>
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Play with <span className="gradient-brand-text">Confidence</span>
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your security is our top priority. We use industry-leading encryption 
                    and follow strict fair play guidelines to ensure a safe gaming experience.
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Shield, text: "100% Secure Transactions" },
                      { icon: TrendingUp, text: "Instant Withdrawals" },
                      { icon: Users, text: "24/7 Customer Support" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 flex items-center justify-center">
                    <img
                      src="/logo-full.png"
                      alt={COMPANY_INFO.brandName}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-brand opacity-10" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Winning?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join millions of cricket fans and start your fantasy journey today!
              </p>
              {!isAuthenticated && (
                <Button asChild size="lg" className="gradient-brand text-lg px-12">
                  <a href={getLoginUrl()}>
                    Play Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
