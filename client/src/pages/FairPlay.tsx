import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Lock
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const fairPlayRules = [
  {
    icon: CheckCircle,
    title: "One Account Per User",
    description: "Each user is allowed only one account. Multiple accounts will result in permanent ban and forfeiture of winnings.",
    color: "text-green-500",
  },
  {
    icon: XCircle,
    title: "No Collusion",
    description: "Coordinating with other users to gain unfair advantage is strictly prohibited and will result in account termination.",
    color: "text-red-500",
  },
  {
    icon: Lock,
    title: "No Automated Systems",
    description: "Using bots, scripts, or any automated systems to create teams or join contests is not allowed.",
    color: "text-yellow-500",
  },
  {
    icon: Eye,
    title: "No Insider Information",
    description: "Using non-public information about team selections, player injuries, or match conditions is prohibited.",
    color: "text-blue-500",
  },
];

export default function FairPlay() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fair Play <span className="gradient-brand-text">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At {COMPANY_INFO.brandName}, we are committed to ensuring a fair and enjoyable 
              experience for all our users. Our Fair Play Policy outlines the rules and guidelines 
              that maintain the integrity of our platform.
            </p>
          </div>
        </section>

        {/* Key Rules Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Fair Play Rules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {fairPlayRules.map((rule) => (
                <Card key={rule.title} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0`}>
                        <rule.icon className={`h-6 w-6 ${rule.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{rule.title}</h3>
                        <p className="text-muted-foreground text-sm">{rule.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Policy Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 prose prose-invert max-w-none">
                <h2>Our Commitment to Fair Play</h2>
                <p>
                  {COMPANY_INFO.brandName} is dedicated to providing a platform where skill and 
                  cricket knowledge determine success. We employ advanced systems and manual reviews 
                  to detect and prevent unfair practices.
                </p>

                <h2>Prohibited Activities</h2>
                <p>The following activities are strictly prohibited:</p>
                <ul>
                  <li><strong>Multiple Accounts:</strong> Creating or operating more than one account per person</li>
                  <li><strong>Account Sharing:</strong> Sharing account credentials with others or allowing others to use your account</li>
                  <li><strong>Collusion:</strong> Coordinating with other users to manipulate contest outcomes</li>
                  <li><strong>Automation:</strong> Using bots, scripts, or automated tools to gain unfair advantage</li>
                  <li><strong>Insider Trading:</strong> Using non-public information about players or matches</li>
                  <li><strong>Match Fixing:</strong> Any involvement in or knowledge of match-fixing activities</li>
                  <li><strong>Abuse of Promotions:</strong> Creating fake accounts or using fraudulent methods to claim bonuses</li>
                </ul>

                <h2>Detection and Monitoring</h2>
                <p>
                  We use sophisticated algorithms and manual review processes to detect suspicious activities:
                </p>
                <ul>
                  <li>IP address and device fingerprinting</li>
                  <li>Pattern analysis of team selections and contest entries</li>
                  <li>Behavioral analysis and anomaly detection</li>
                  <li>Community reporting and investigation</li>
                </ul>

                <h2>Consequences of Violations</h2>
                <p>
                  Violations of our Fair Play Policy may result in:
                </p>
                <ul>
                  <li>Warning and temporary account suspension</li>
                  <li>Forfeiture of winnings and bonus amounts</li>
                  <li>Permanent account termination</li>
                  <li>Legal action in severe cases</li>
                </ul>

                <h2>Reporting Violations</h2>
                <p>
                  If you suspect any user of violating our Fair Play Policy, please report it to us 
                  at fairplay@{COMPANY_INFO.domain}. All reports are investigated confidentially.
                </p>

                <h2>Appeals Process</h2>
                <p>
                  If you believe your account was wrongly flagged or suspended, you may submit an 
                  appeal to appeals@{COMPANY_INFO.domain}. Our team will review your case within 
                  7 business days.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Warning Section */}
        <section className="py-16">
          <div className="container">
            <Card className="max-w-3xl mx-auto bg-destructive/10 border-destructive/30">
              <CardContent className="p-6 flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Important Notice</h3>
                  <p className="text-muted-foreground">
                    Any attempt to circumvent our fair play measures will be dealt with strictly. 
                    We reserve the right to take any action we deem necessary to protect the integrity 
                    of our platform and the interests of our honest users.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
