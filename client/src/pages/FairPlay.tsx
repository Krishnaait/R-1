import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Users,
  Bot,
  UserX,
  Eye,
  Scale,
  Mail,
  ArrowRight,
  Ban,
  Flag,
  Award,
  Handshake
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const lastUpdated = "December 30, 2025";

const tableOfContents = [
  { id: "commitment", title: "1. Our Commitment" },
  { id: "principles", title: "2. Fair Play Principles" },
  { id: "prohibited", title: "3. Prohibited Activities" },
  { id: "detection", title: "4. Detection & Monitoring" },
  { id: "consequences", title: "5. Consequences of Violations" },
  { id: "reporting", title: "6. Reporting Violations" },
  { id: "appeals", title: "7. Appeals Process" },
  { id: "contact", title: "8. Contact Us" },
];

export default function FairPlay() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
          <div className="container relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Fair Competition
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fair Play <span className="gradient-brand-text">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At {COMPANY_INFO.brandName}, we are committed to providing a fair, transparent, and enjoyable 
              fantasy cricket experience for all users. Our Fair Play Policy ensures that every player 
              competes on a level playing field.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-12 bg-card/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Scale, title: "Equal Opportunity", description: "Every user has the same chance to succeed" },
                { icon: Eye, title: "Transparency", description: "Clear rules and open communication" },
                { icon: Shield, title: "Integrity", description: "Zero tolerance for cheating or fraud" },
                { icon: Handshake, title: "Respect", description: "Treat all users with dignity" },
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* Table of Contents Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Table of Contents
                      </h3>
                      <nav className="space-y-2">
                        {tableOfContents.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          >
                            {item.title}
                          </a>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Fair Play Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-8 lg:p-12">
                    {/* Section 1: Our Commitment */}
                    <section id="commitment" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                        Our Commitment to Fair Play
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {COMPANY_INFO.brandName} is built on the foundation of fair competition. We believe that 
                          fantasy cricket should be a game of skill where success is determined by your knowledge 
                          of cricket, strategic thinking, and analytical abilities - not by unfair advantages or 
                          manipulation.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Our Fair Play Policy is designed to protect the integrity of our platform and ensure that 
                          all users can enjoy a genuine, competitive experience. We invest significant resources in 
                          monitoring, detection, and enforcement to maintain a level playing field.
                        </p>
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <Award className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold mb-2">Our Promise</p>
                              <p className="text-muted-foreground">
                                We promise to treat all users fairly, investigate all reports thoroughly, and take 
                                appropriate action against any violations. Fair play is not just a policy - it's 
                                the core of who we are.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 2: Fair Play Principles */}
                    <section id="principles" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                        Fair Play Principles
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          All users of {COMPANY_INFO.brandName} are expected to adhere to the following principles:
                        </p>
                        
                        <h3 className="text-lg font-semibold mb-3 mt-6">2.1 One Account Per User</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Each individual is permitted to create and maintain only one account on our platform. 
                          Multiple accounts give users an unfair advantage and undermine the competitive integrity 
                          of our contests. All accounts must be registered with accurate personal information.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 mt-6">2.2 Independent Decision Making</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          All team selections and contest entries must be made independently. Users should not 
                          coordinate with others to manipulate outcomes, share insider information, or engage in 
                          any form of collusion. Your success should be based on your own skills and analysis.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 mt-6">2.3 Honest Participation</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Users must participate honestly and in good faith. This means not exploiting bugs or 
                          vulnerabilities, not using unauthorized tools or software, and not engaging in any 
                          deceptive practices.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 mt-6">2.4 Respectful Conduct</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          All users must treat others with respect. Harassment, abuse, hate speech, or any form 
                          of discriminatory behavior is strictly prohibited. We are building a community of cricket 
                          enthusiasts, and mutual respect is essential.
                        </p>
                      </div>
                    </section>

                    {/* Section 3: Prohibited Activities */}
                    <section id="prohibited" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                        Prohibited Activities
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          The following activities are strictly prohibited on {COMPANY_INFO.brandName}:
                        </p>
                        
                        <div className="space-y-6">
                          {/* Multiple Accounts */}
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                                <UserX className="h-5 w-5 text-red-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  Multiple Accounts
                                  <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded">Severe</span>
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  Creating, maintaining, or using multiple accounts. This includes accounts created 
                                  using different email addresses, phone numbers, or identities. Family members or 
                                  friends sharing devices must each have their own single account.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Automated Tools */}
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                                <Bot className="h-5 w-5 text-red-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  Automated Tools & Bots
                                  <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded">Severe</span>
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  Using automated software, scripts, bots, or any other tools to interact with the 
                                  platform, create teams, or enter contests. This includes browser extensions, 
                                  auto-clickers, or any software that automates user actions.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Collusion */}
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
                                <Users className="h-5 w-5 text-red-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  Collusion
                                  <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded">Severe</span>
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  Coordinating with other users to manipulate contest outcomes, sharing team 
                                  information before deadlines, or working together to gain unfair advantages. 
                                  This includes "syndicate" play where groups coordinate entries.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Bug Exploitation */}
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  Bug Exploitation
                                  <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Moderate</span>
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  Exploiting bugs, glitches, or vulnerabilities in the platform for personal gain. 
                                  If you discover a bug, please report it to our support team immediately. 
                                  Responsible disclosure is appreciated and may be rewarded.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Harassment */}
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                              <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                                <Ban className="h-5 w-5 text-yellow-500" />
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                  Harassment & Abuse
                                  <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">Moderate</span>
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                  Harassing, threatening, or abusing other users. This includes hate speech, 
                                  discriminatory language, personal attacks, or any behavior that creates a 
                                  hostile environment for others.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 4: Detection & Monitoring */}
                    <section id="detection" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                        Detection & Monitoring
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We employ sophisticated systems to detect and prevent fair play violations:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Account Analysis:</strong> We analyze account patterns, device fingerprints, and behavioral data to detect multiple accounts</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Team Pattern Detection:</strong> Our algorithms identify suspicious team patterns that may indicate collusion or automated entries</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Behavioral Monitoring:</strong> We monitor user behavior for signs of bot activity or automated interactions</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Community Reports:</strong> We investigate all reports from users about suspicious activity</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Our detection systems are continuously improved to stay ahead of new forms of abuse. 
                          We take a proactive approach to maintaining platform integrity.
                        </p>
                      </div>
                    </section>

                    {/* Section 5: Consequences of Violations */}
                    <section id="consequences" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
                        Consequences of Violations
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Violations of our Fair Play Policy will result in appropriate consequences based on 
                          the severity and nature of the violation:
                        </p>
                        
                        <div className="overflow-x-auto mb-6">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-semibold">Violation Level</th>
                                <th className="text-left py-3 px-4 font-semibold">Examples</th>
                                <th className="text-left py-3 px-4 font-semibold">Consequences</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-border">
                                <td className="py-3 px-4">
                                  <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-sm">Minor</span>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  First-time minor rule violations, unintentional infractions
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  Warning and notification
                                </td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="py-3 px-4">
                                  <span className="bg-orange-500/20 text-orange-500 px-2 py-1 rounded text-sm">Moderate</span>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  Repeated minor violations, bug exploitation, harassment
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  Temporary suspension (7-30 days)
                                </td>
                              </tr>
                              <tr className="border-b border-border">
                                <td className="py-3 px-4">
                                  <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-sm">Severe</span>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  Multiple accounts, bot usage, collusion
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  Permanent account ban
                                </td>
                              </tr>
                              <tr>
                                <td className="py-3 px-4">
                                  <span className="bg-red-700/20 text-red-400 px-2 py-1 rounded text-sm">Critical</span>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  Fraud, illegal activity, repeated severe violations
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-sm">
                                  Permanent ban + legal action if applicable
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          We reserve the right to take any action we deem appropriate, including actions not 
                          listed above, to maintain the integrity of our platform.
                        </p>
                      </div>
                    </section>

                    {/* Section 6: Reporting Violations */}
                    <section id="reporting" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
                        Reporting Violations
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We encourage all users to report suspected fair play violations. Your reports help us 
                          maintain a fair environment for everyone.
                        </p>
                        
                        <h3 className="text-lg font-semibold mb-3 mt-6">How to Report</h3>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Flag className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Email us at <strong>fairplay@{COMPANY_INFO.domain}</strong> with details of the suspected violation</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Flag className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Include the username(s) involved, contest ID (if applicable), and description of the suspicious activity</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Flag className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Provide any screenshots or evidence that support your report</span>
                            </li>
                          </ul>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 mt-6">What Happens After You Report</h3>
                        <div className="bg-muted/30 rounded-lg p-6">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">All reports are reviewed by our Fair Play team within 24-48 hours</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">We investigate thoroughly using our detection systems and manual review</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Appropriate action is taken if a violation is confirmed</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Your identity as a reporter is kept confidential</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 7: Appeals Process */}
                    <section id="appeals" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">7</span>
                        Appeals Process
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          If you believe your account has been unfairly penalized, you have the right to appeal:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ol className="space-y-3 list-decimal list-inside">
                            <li className="text-muted-foreground">
                              <strong>Submit an Appeal:</strong> Email appeals@{COMPANY_INFO.domain} within 14 days of receiving the penalty notification
                            </li>
                            <li className="text-muted-foreground">
                              <strong>Provide Information:</strong> Include your username, the penalty you received, and a detailed explanation of why you believe the decision was incorrect
                            </li>
                            <li className="text-muted-foreground">
                              <strong>Review Process:</strong> Our appeals team will review your case independently within 7 business days
                            </li>
                            <li className="text-muted-foreground">
                              <strong>Final Decision:</strong> You will receive a written response with our final decision
                            </li>
                          </ol>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Please note that the appeals process is for genuine cases where you believe an error has 
                          been made. Frivolous appeals may not receive a response.
                        </p>
                      </div>
                    </section>

                    {/* Section 8: Contact Us */}
                    <section id="contact" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">8</span>
                        Contact Us
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          If you have any questions about our Fair Play Policy, please contact us:
                        </p>
                        <Card className="bg-muted/30">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">Fair Play Team</p>
                                  <p className="text-sm text-muted-foreground">{COMPANY_INFO.companyName}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Report Violations:</p>
                                  <a href={`mailto:fairplay@${COMPANY_INFO.domain}`} className="text-primary hover:underline">
                                    fairplay@{COMPANY_INFO.domain}
                                  </a>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Appeals:</p>
                                  <a href={`mailto:appeals@${COMPANY_INFO.domain}`} className="text-primary hover:underline">
                                    appeals@{COMPANY_INFO.domain}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </section>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Related Policies</h2>
              <p className="text-muted-foreground">
                Review our other policies to understand how we operate
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/terms">Terms & Conditions</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/responsible-gaming">Responsible Gaming</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Play Fair, Play Smart</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of cricket fans who compete fairly and enjoy the game. 
              Let your cricket knowledge be your only advantage.
            </p>
            <Button asChild className="gradient-brand">
              <Link href="/matches">
                Start Playing
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
