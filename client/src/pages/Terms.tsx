import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  FileText, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Mail,
  ArrowRight
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const lastUpdated = "December 30, 2025";

const tableOfContents = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "account", title: "3. Account Registration" },
  { id: "platform-usage", title: "4. Platform Usage" },
  { id: "fantasy-contests", title: "5. Fantasy Contests" },
  { id: "user-conduct", title: "6. User Conduct" },
  { id: "intellectual-property", title: "7. Intellectual Property" },
  { id: "disclaimers", title: "8. Disclaimers" },
  { id: "limitation", title: "9. Limitation of Liability" },
  { id: "termination", title: "10. Termination" },
  { id: "modifications", title: "11. Modifications to Terms" },
  { id: "governing-law", title: "12. Governing Law" },
  { id: "contact", title: "13. Contact Information" },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
          <div className="container relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <FileText className="h-4 w-4" />
              Legal Document
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms & <span className="gradient-brand-text">Conditions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Please read these terms and conditions carefully before using {COMPANY_INFO.brandName}. 
              By accessing or using our platform, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: {lastUpdated}
            </p>
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
                        <FileText className="h-5 w-5 text-primary" />
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

              {/* Terms Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-8 lg:p-12">
                    {/* Introduction */}
                    <div className="mb-12">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Welcome to {COMPANY_INFO.brandName}, a fantasy cricket platform operated by {COMPANY_INFO.companyName} 
                        ("Company", "we", "us", or "our"). These Terms and Conditions ("Terms") govern your access to and use 
                        of our website, mobile applications, and services (collectively, the "Platform").
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        {COMPANY_INFO.brandName} is a free-to-play fantasy sports platform. No real money is involved in 
                        playing contests on our platform. Users compete for points, rankings, and recognition only.
                      </p>
                    </div>

                    {/* Section 1: Acceptance of Terms */}
                    <section id="acceptance" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                        Acceptance of Terms
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be 
                          bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not access 
                          or use the Platform.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          These Terms constitute a legally binding agreement between you and {COMPANY_INFO.companyName}. Your 
                          continued use of the Platform following any modifications to these Terms constitutes your acceptance 
                          of such modifications.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time without 
                          prior notice. We shall not be liable to you or any third party for any modification, suspension, or 
                          discontinuation of the Platform.
                        </p>
                      </div>
                    </section>

                    {/* Section 2: Eligibility */}
                    <section id="eligibility" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                        Eligibility
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          To use the Platform, you must meet the following eligibility requirements:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">You must be at least 18 years of age</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">You must be a resident of India or a jurisdiction where fantasy sports are legal</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">You must have the legal capacity to enter into a binding agreement</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">You must not be prohibited from using the Platform under applicable laws</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          By using the Platform, you represent and warrant that you meet all eligibility requirements. We reserve 
                          the right to verify your eligibility at any time and to suspend or terminate your account if we determine 
                          that you do not meet these requirements.
                        </p>
                      </div>
                    </section>

                    {/* Section 3: Account Registration */}
                    <section id="account" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                        Account Registration
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          To access certain features of the Platform, you must create an account. When creating an account, you agree to:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Provide accurate, current, and complete information during registration</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Maintain and promptly update your account information</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Maintain the security and confidentiality of your login credentials</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Accept responsibility for all activities under your account</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Notify us immediately of any unauthorized use of your account</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Each user is permitted to maintain only one account. Creating multiple accounts is a violation of these 
                          Terms and may result in the suspension or termination of all associated accounts.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          We reserve the right to refuse registration, suspend, or terminate any account at our sole discretion, 
                          without prior notice or liability.
                        </p>
                      </div>
                    </section>

                    {/* Section 4: Platform Usage */}
                    <section id="platform-usage" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                        Platform Usage
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {COMPANY_INFO.brandName} is a free-to-play fantasy cricket platform. The Platform allows users to:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Create virtual fantasy cricket teams</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Participate in free fantasy contests</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Track live match scores and fantasy points</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Compete on leaderboards for rankings</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Access player statistics and match information</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          The Platform is provided for entertainment and recreational purposes only. No real money, prizes, or 
                          monetary rewards are involved in any contests on our platform. Users compete solely for points, rankings, 
                          and personal satisfaction.
                        </p>
                      </div>
                    </section>

                    {/* Section 5: Fantasy Contests */}
                    <section id="fantasy-contests" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
                        Fantasy Contests
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Fantasy contests on {COMPANY_INFO.brandName} are governed by the following rules:
                        </p>
                        
                        <h3 className="text-lg font-semibold mb-3 mt-6">5.1 Contest Rules</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          All contests are free to enter. Users create fantasy teams by selecting real cricket players within a 
                          credit budget. Points are awarded based on the actual performance of selected players in real matches. 
                          Specific rules for each contest type are displayed on the contest page.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 mt-6">5.2 Team Deadlines</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Teams must be created and finalized before the match deadline (typically the scheduled start time of the match). 
                          Once the deadline passes, teams are locked and cannot be modified. Late entries will not be accepted.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 mt-6">5.3 Points Calculation</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Fantasy points are calculated based on the official match statistics. Our points system is published on 
                          the "How to Play" page. We reserve the right to modify the points system with prior notice to users.
                        </p>

                        <h3 className="text-lg font-semibold mb-3 mt-6">5.4 Match Cancellations</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          In the event of match abandonment, cancellation, or significant interruption, contests may be cancelled 
                          or completed based on the points accumulated until that point. The decision regarding contest completion 
                          or cancellation shall be at our sole discretion.
                        </p>
                      </div>
                    </section>

                    {/* Section 6: User Conduct */}
                    <section id="user-conduct" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
                        User Conduct
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          When using the Platform, you agree NOT to:
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Create or maintain multiple accounts</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Use automated tools, bots, or scripts to interact with the Platform</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Collude with other users to manipulate contest outcomes</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Engage in any form of cheating, fraud, or manipulation</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Attempt to gain unauthorized access to the Platform or other users' accounts</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Harass, abuse, or harm other users</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Post or transmit any unlawful, harmful, or objectionable content</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Violate any applicable laws or regulations</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Violation of these conduct rules may result in immediate account suspension or termination, without prior 
                          notice or liability. We reserve the right to investigate and take appropriate action against any user who 
                          violates these rules.
                        </p>
                      </div>
                    </section>

                    {/* Section 7: Intellectual Property */}
                    <section id="intellectual-property" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">7</span>
                        Intellectual Property
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          All content on the Platform, including but not limited to text, graphics, logos, images, software, and 
                          the overall design and layout, is the property of {COMPANY_INFO.companyName} or its licensors and is 
                          protected by intellectual property laws.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          You are granted a limited, non-exclusive, non-transferable license to access and use the Platform for 
                          personal, non-commercial purposes only. This license does not include any resale or commercial use of 
                          the Platform or its contents, any collection or use of product listings, descriptions, or prices, any 
                          derivative use of the Platform or its contents, or any downloading or copying of account information.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Cricket player names, team names, and related trademarks are the property of their respective owners and 
                          are used on the Platform for informational purposes only.
                        </p>
                      </div>
                    </section>

                    {/* Section 8: Disclaimers */}
                    <section id="disclaimers" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">8</span>
                        Disclaimers
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER 
                          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
                          PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We do not warrant that the Platform will be uninterrupted, timely, secure, or error-free, that the 
                          results obtained from using the Platform will be accurate or reliable, or that any errors in the 
                          Platform will be corrected.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Match data and player statistics are sourced from third-party providers. While we strive for accuracy, 
                          we cannot guarantee the completeness or accuracy of such data.
                        </p>
                      </div>
                    </section>

                    {/* Section 9: Limitation of Liability */}
                    <section id="limitation" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">9</span>
                        Limitation of Liability
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, {COMPANY_INFO.companyName.toUpperCase()} AND ITS 
                          OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                          CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, 
                          OR OTHER INTANGIBLE LOSSES.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Since {COMPANY_INFO.brandName} is a free-to-play platform with no monetary transactions, our total 
                          liability to you for any claims arising from your use of the Platform shall not exceed the amount you 
                          have paid to us, which is zero (₹0).
                        </p>
                      </div>
                    </section>

                    {/* Section 10: Termination */}
                    <section id="termination" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">10</span>
                        Termination
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We may terminate or suspend your account and access to the Platform immediately, without prior notice or 
                          liability, for any reason, including but not limited to breach of these Terms, violation of our Fair Play 
                          Policy, fraudulent or illegal activity, or request by law enforcement or government agencies.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          You may terminate your account at any time by contacting our support team. Upon termination, your right 
                          to use the Platform will immediately cease, and all data associated with your account may be deleted.
                        </p>
                      </div>
                    </section>

                    {/* Section 11: Modifications to Terms */}
                    <section id="modifications" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">11</span>
                        Modifications to Terms
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We reserve the right to modify these Terms at any time. We will notify users of any material changes by 
                          posting the updated Terms on the Platform and updating the "Last Updated" date. Your continued use of 
                          the Platform after such modifications constitutes your acceptance of the updated Terms.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          We encourage you to review these Terms periodically to stay informed about our terms and conditions.
                        </p>
                      </div>
                    </section>

                    {/* Section 12: Governing Law */}
                    <section id="governing-law" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">12</span>
                        Governing Law
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          These Terms shall be governed by and construed in accordance with the laws of India, without regard to 
                          its conflict of law provisions. Any disputes arising from or relating to these Terms or your use of the 
                          Platform shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall 
                          continue in full force and effect.
                        </p>
                      </div>
                    </section>

                    {/* Section 13: Contact Information */}
                    <section id="contact" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">13</span>
                        Contact Information
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          If you have any questions about these Terms, please contact us:
                        </p>
                        <Card className="bg-muted/30">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">{COMPANY_INFO.companyName}</p>
                                  <p className="text-sm text-muted-foreground">{COMPANY_INFO.address}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href={`mailto:legal@${COMPANY_INFO.domain}`} className="text-primary hover:underline">
                                  legal@{COMPANY_INFO.domain}
                                </a>
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
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/fair-play">Fair Play Policy</Link>
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
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              If you have any questions about our Terms & Conditions, please don't hesitate to contact us.
            </p>
            <Button asChild className="gradient-brand">
              <Link href="/contact">
                Contact Us
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
