import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Heart, 
  Clock, 
  Gamepad2, 
  AlertCircle,
  Phone,
  Shield,
  Users
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const tips = [
  {
    icon: Clock,
    title: "Set Time Limits",
    description: "Decide how much time you want to spend playing and stick to it. Take regular breaks.",
  },
  {
    icon: Gamepad2,
    title: "Play Responsibly",
    description: "Remember that fantasy sports is a game of skill. Play for fun and entertainment.",
  },
  {
    icon: Heart,
    title: "Play for Fun",
    description: "Fantasy sports should be entertaining. If it stops being fun, it's time to take a break.",
  },
  {
    icon: Users,
    title: "Balance Life",
    description: "Don't let fantasy sports interfere with your work, relationships, or other responsibilities.",
  },
];

const warningSignsData = [
  "Spending more time than intended on the platform",
  "Playing to escape problems or relieve stress",
  "Neglecting work, studies, or relationships",
  "Feeling restless or irritable when not playing",
  "Constantly checking scores and standings",
  "Feeling frustrated when your team doesn't perform well",
  "Difficulty sleeping due to thinking about fantasy sports",
  "Prioritizing fantasy sports over important activities",
];

export default function ResponsibleGaming() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Responsible <span className="gradient-brand-text">Gaming</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At {COMPANY_INFO.brandName}, we believe in promoting responsible gaming practices. 
              Your well-being is our priority.
            </p>
          </div>
        </section>

        {/* Free to Play Notice */}
        <section className="py-8 bg-primary/5">
          <div className="container">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Gamepad2 className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">100% Free to Play</h3>
                <p className="text-muted-foreground">
                  {COMPANY_INFO.brandName} is a completely free-to-play fantasy sports platform. 
                  No real money is involved in any contests. Play for fun, compete for glory!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Tips for Healthy Gaming</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip) => (
                <Card key={tip.title} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <tip.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="bg-amber-500/5 border-amber-500/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="h-8 w-8 text-amber-500" />
                    <h2 className="text-2xl font-bold">Signs You May Need a Break</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Even with free-to-play games, it's important to maintain a healthy balance. 
                    Consider taking a break if you notice:
                  </p>
                  <ul className="space-y-3">
                    {warningSignsData.map((sign, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Healthy Gaming Section */}
        <section className="py-16">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 prose prose-invert max-w-none">
                <h2>Healthy Gaming Practices</h2>
                <p>
                  We encourage all our users to maintain healthy gaming habits:
                </p>

                <h3>Set Time Limits</h3>
                <p>
                  Decide in advance how much time you want to spend on the platform each day. 
                  Use phone timers or app limits to help you stick to your goals.
                </p>

                <h3>Take Regular Breaks</h3>
                <p>
                  Step away from the screen regularly. Use the 20-20-20 rule: every 20 minutes, 
                  look at something 20 feet away for 20 seconds.
                </p>

                <h3>Maintain Balance</h3>
                <p>
                  Fantasy sports should complement your life, not dominate it. Make sure you're 
                  still engaging in other hobbies, spending time with loved ones, and meeting 
                  your responsibilities.
                </p>

                <h3>Play for Fun</h3>
                <p>
                  Remember that the primary purpose of fantasy sports is entertainment. 
                  Winning is exciting, but the real joy comes from the game itself.
                </p>

                <h3>Account Management</h3>
                <p>
                  If you feel you need a break, you can temporarily deactivate your account 
                  by contacting our support team. We're here to help.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Help Resources Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Need Support?</h2>
              <p className="text-muted-foreground mb-8">
                If you have any concerns about your gaming habits or need assistance, 
                please don't hesitate to reach out:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Our Support Team</h3>
                    <p className="text-sm text-muted-foreground">
                      Available 24/7 to help with any concerns
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">iCall Helpline</h3>
                    <p className="text-sm text-muted-foreground">
                      Psychosocial support: 9152987821
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Button asChild className="gradient-brand">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {COMPANY_INFO.brandName} is committed to providing a fun, safe, and healthy 
              gaming environment. As a free-to-play platform, we focus on the joy of cricket 
              and friendly competition, not financial stakes.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
