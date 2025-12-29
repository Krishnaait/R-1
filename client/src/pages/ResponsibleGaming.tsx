import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Heart, 
  Clock, 
  Wallet, 
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
    icon: Wallet,
    title: "Set Budget Limits",
    description: "Only play with money you can afford to lose. Never chase losses or borrow money to play.",
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
  "Spending more money than you can afford",
  "Playing to escape problems or relieve stress",
  "Lying to family or friends about your playing habits",
  "Neglecting work, studies, or relationships",
  "Feeling restless or irritable when not playing",
  "Chasing losses with bigger bets",
  "Borrowing money to play",
  "Feeling guilty about your playing habits",
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

        {/* Tips Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Tips for Responsible Gaming</h2>
            
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
              <Card className="bg-destructive/5 border-destructive/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                    <h2 className="text-2xl font-bold">Warning Signs</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    If you recognize any of these signs in yourself or someone you know, 
                    it may be time to seek help:
                  </p>
                  <ul className="space-y-3">
                    {warningSignsData.map((sign, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="h-2 w-2 rounded-full bg-destructive mt-2 shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Self-Exclusion Section */}
        <section className="py-16">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 prose prose-invert max-w-none">
                <h2>Self-Exclusion Options</h2>
                <p>
                  We offer several tools to help you manage your gaming activity:
                </p>

                <h3>Deposit Limits</h3>
                <p>
                  Set daily, weekly, or monthly deposit limits to control your spending. 
                  Once set, limits cannot be increased for 24 hours.
                </p>

                <h3>Time Limits</h3>
                <p>
                  Set session time limits to receive reminders when you've been playing 
                  for a specified duration.
                </p>

                <h3>Cooling-Off Period</h3>
                <p>
                  Take a break from the platform for 24 hours, 7 days, or 30 days. 
                  During this period, you won't be able to participate in paid contests.
                </p>

                <h3>Self-Exclusion</h3>
                <p>
                  For longer breaks, you can self-exclude for 6 months or 1 year. 
                  Contact our support team to activate self-exclusion.
                </p>

                <h3>Permanent Account Closure</h3>
                <p>
                  If you wish to permanently close your account, contact our support team. 
                  This action is irreversible.
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
              <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-8">
                If you or someone you know is struggling with gaming addiction, 
                please reach out to these resources:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Gamblers Anonymous India</h3>
                    <p className="text-sm text-muted-foreground">
                      Support groups and resources for problem gambling
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">iCall</h3>
                    <p className="text-sm text-muted-foreground">
                      Psychosocial helpline: 9152987821
                    </p>
                  </CardContent>
                </Card>
              </div>

              <p className="text-muted-foreground mb-6">
                You can also contact our support team for assistance:
              </p>
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
              {COMPANY_INFO.brandName} is committed to promoting responsible gaming. 
              We continuously work to implement features and policies that protect our users 
              and ensure a safe, enjoyable gaming environment for everyone.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
