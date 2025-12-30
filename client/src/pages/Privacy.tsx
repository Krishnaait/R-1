import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  UserCheck,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Globe,
  Server
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const lastUpdated = "December 30, 2025";

const tableOfContents = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-collected", title: "2. Information We Collect" },
  { id: "how-we-use", title: "3. How We Use Your Information" },
  { id: "information-sharing", title: "4. Information Sharing" },
  { id: "data-security", title: "5. Data Security" },
  { id: "cookies", title: "6. Cookies & Tracking" },
  { id: "your-rights", title: "7. Your Rights" },
  { id: "data-retention", title: "8. Data Retention" },
  { id: "children", title: "9. Children's Privacy" },
  { id: "international", title: "10. International Transfers" },
  { id: "changes", title: "11. Changes to This Policy" },
  { id: "contact", title: "12. Contact Us" },
];

export default function Privacy() {
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
              Your Privacy Matters
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy <span className="gradient-brand-text">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At {COMPANY_INFO.brandName}, we are committed to protecting your privacy and ensuring 
              the security of your personal information. This policy explains how we collect, use, 
              and safeguard your data.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Privacy Highlights */}
        <section className="py-12 bg-card/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Lock, title: "No Financial Data", description: "We don't collect payment or banking information" },
                { icon: Eye, title: "Transparent", description: "Clear explanation of all data practices" },
                { icon: UserCheck, title: "Your Control", description: "You can access, modify, or delete your data" },
                { icon: Shield, title: "Secure", description: "Industry-standard security measures" },
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

              {/* Privacy Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-8 lg:p-12">
                    {/* Section 1: Introduction */}
                    <section id="introduction" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                        Introduction
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {COMPANY_INFO.companyName} ("Company", "we", "us", or "our") operates {COMPANY_INFO.brandName}, 
                          a free-to-play fantasy cricket platform. This Privacy Policy explains how we collect, use, disclose, 
                          and safeguard your information when you visit our website and use our services.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We understand the importance of privacy and are committed to being transparent about our data practices. 
                          As a free-to-play platform, we do not collect any financial or payment information from our users.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          By using our Platform, you consent to the data practices described in this Privacy Policy. If you do 
                          not agree with the terms of this Privacy Policy, please do not access or use the Platform.
                        </p>
                      </div>
                    </section>

                    {/* Section 2: Information We Collect */}
                    <section id="information-collected" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                        Information We Collect
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          When you create an account or use our Platform, you may provide us with:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Account Information:</strong> Name, email address, username, and profile picture</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Profile Information:</strong> Optional details you add to your profile</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Communications:</strong> Messages you send to us through contact forms or support</span>
                            </li>
                          </ul>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 mt-6">2.2 Information Collected Automatically</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          When you access our Platform, we automatically collect certain information:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Database className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Device Information:</strong> Device type, operating system, browser type, and version</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Database className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Usage Data:</strong> Pages visited, time spent, features used, and click patterns</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Database className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Log Data:</strong> IP address, access times, and referring URLs</span>
                            </li>
                          </ul>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 mt-6">2.3 Information We Do NOT Collect</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          As a free-to-play platform, we do NOT collect:
                        </p>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Credit card or debit card numbers</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Bank account information</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">UPI IDs or payment wallet details</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Any financial or payment information</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 3: How We Use Your Information */}
                    <section id="how-we-use" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                        How We Use Your Information
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We use the information we collect for the following purposes:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Provide Services:</strong> To create and manage your account, enable participation in contests, and display leaderboards</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Improve Platform:</strong> To analyze usage patterns and improve our features and user experience</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Communication:</strong> To send service-related announcements, updates, and respond to inquiries</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Security:</strong> To detect and prevent fraud, abuse, and security threats</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 4: Information Sharing */}
                    <section id="information-sharing" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                        Information Sharing
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We do not sell, trade, or rent your personal information to third parties. We may share your 
                          information only in the following limited circumstances:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Share2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our Platform (hosting, analytics)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Share2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Legal Requirements:</strong> When required by law, court order, or government request</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Share2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Protection:</strong> To protect the rights, property, or safety of our users or others</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Share2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Your username and contest rankings may be publicly visible on leaderboards. You can choose to 
                          use a pseudonym as your username if you prefer not to display your real name.
                        </p>
                      </div>
                    </section>

                    {/* Section 5: Data Security */}
                    <section id="data-security" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
                        Data Security
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We implement industry-standard security measures to protect your personal information:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using SSL/TLS</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Secure Storage:</strong> Personal data is stored in secure databases with restricted access</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Access Controls:</strong> Only authorized personnel have access to personal information</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Regular Audits:</strong> We regularly review and update our security practices</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          While we strive to protect your personal information, no method of transmission over the Internet 
                          or electronic storage is 100% secure. We cannot guarantee absolute security.
                        </p>
                      </div>
                    </section>

                    {/* Section 6: Cookies & Tracking */}
                    <section id="cookies" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
                        Cookies & Tracking Technologies
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We use cookies and similar tracking technologies to enhance your experience on our Platform:
                        </p>
                        
                        <h3 className="text-lg font-semibold mb-3 mt-6">Types of Cookies We Use</h3>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Cookie className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Essential Cookies:</strong> Required for the Platform to function properly (authentication, security)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Cookie className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Functional Cookies:</strong> Remember your preferences and settings</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Cookie className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Analytics Cookies:</strong> Help us understand how users interact with our Platform</span>
                            </li>
                          </ul>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          You can control cookies through your browser settings. However, disabling certain cookies may 
                          affect the functionality of our Platform.
                        </p>
                      </div>
                    </section>

                    {/* Section 7: Your Rights */}
                    <section id="your-rights" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">7</span>
                        Your Rights
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          You have the following rights regarding your personal information:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Access:</strong> Request a copy of the personal information we hold about you</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Portability:</strong> Request your data in a structured, machine-readable format</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <UserCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          To exercise any of these rights, please contact us at privacy@{COMPANY_INFO.domain}. We will 
                          respond to your request within 30 days.
                        </p>
                      </div>
                    </section>

                    {/* Section 8: Data Retention */}
                    <section id="data-retention" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">8</span>
                        Data Retention
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We retain your personal information for as long as necessary to provide our services and fulfill 
                          the purposes outlined in this Privacy Policy:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <Server className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Active Accounts:</strong> Data is retained while your account is active</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Server className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Deleted Accounts:</strong> Data is deleted within 90 days of account deletion request</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <Server className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground"><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 9: Children's Privacy */}
                    <section id="children" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">9</span>
                        Children's Privacy
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Our Platform is not intended for children under 18 years of age. We do not knowingly collect 
                          personal information from children under 18.
                        </p>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                            <p className="text-muted-foreground">
                              If you are a parent or guardian and believe your child has provided us with personal information, 
                              please contact us immediately at privacy@{COMPANY_INFO.domain}. We will take steps to delete 
                              such information from our systems.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 10: International Transfers */}
                    <section id="international" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">10</span>
                        International Data Transfers
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Your information may be transferred to and processed in countries other than your country of 
                          residence. These countries may have different data protection laws.
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-muted-foreground">
                              When we transfer your data internationally, we ensure appropriate safeguards are in place 
                              to protect your information in accordance with this Privacy Policy and applicable laws.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 11: Changes to This Policy */}
                    <section id="changes" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">11</span>
                        Changes to This Policy
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We may update this Privacy Policy from time to time to reflect changes in our practices or 
                          applicable laws. We will notify you of any material changes by:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Posting the updated policy on our Platform</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Updating the "Last Updated" date at the top of this policy</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">Sending email notification for significant changes</span>
                            </li>
                          </ul>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Your continued use of the Platform after any changes indicates your acceptance of the updated 
                          Privacy Policy.
                        </p>
                      </div>
                    </section>

                    {/* Section 12: Contact Us */}
                    <section id="contact" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">12</span>
                        Contact Us
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
                          practices, please contact us:
                        </p>
                        <Card className="bg-muted/30">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">Data Protection Officer</p>
                                  <p className="text-sm text-muted-foreground">{COMPANY_INFO.companyName}</p>
                                  <p className="text-sm text-muted-foreground">{COMPANY_INFO.address}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href={`mailto:privacy@${COMPANY_INFO.domain}`} className="text-primary hover:underline">
                                  privacy@{COMPANY_INFO.domain}
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
                <Link href="/terms">Terms & Conditions</Link>
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
            <h2 className="text-2xl font-bold mb-4">Have Privacy Concerns?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We take your privacy seriously. If you have any questions or concerns, please reach out to us.
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
