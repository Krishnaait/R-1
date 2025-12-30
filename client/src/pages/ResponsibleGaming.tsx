import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Shield, 
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Brain,
  Phone,
  Mail,
  ArrowRight,
  Timer,
  Target,
  Lightbulb,
  HandHeart,
  Scale,
  BookOpen
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const lastUpdated = "December 30, 2025";

const tableOfContents = [
  { id: "commitment", title: "1. Our Commitment" },
  { id: "understanding", title: "2. Understanding Fantasy Sports" },
  { id: "healthy-play", title: "3. Healthy Play Guidelines" },
  { id: "time-management", title: "4. Time Management" },
  { id: "warning-signs", title: "5. Warning Signs" },
  { id: "self-assessment", title: "6. Self-Assessment" },
  { id: "tools", title: "7. Tools & Controls" },
  { id: "support", title: "8. Getting Support" },
  { id: "resources", title: "9. Resources" },
  { id: "contact", title: "10. Contact Us" },
];

const selfAssessmentQuestions = [
  "Do you spend more time on fantasy sports than you originally planned?",
  "Do you feel restless or irritable when not playing fantasy sports?",
  "Have you neglected work, studies, or relationships due to fantasy sports?",
  "Do you find yourself constantly checking scores and stats?",
  "Have friends or family expressed concern about your fantasy sports habits?",
  "Do you feel the need to play in more contests to feel satisfied?",
  "Do you continue playing even when it's no longer enjoyable?",
  "Have you tried to cut back on playing but found it difficult?",
];

export default function ResponsibleGaming() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
          <div className="container relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Your Well-being Matters
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Responsible <span className="gradient-brand-text">Gaming</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At {COMPANY_INFO.brandName}, we believe fantasy cricket should be fun, entertaining, and 
              a positive part of your life. We are committed to promoting responsible gaming practices 
              and providing resources to help you maintain a healthy balance.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Key Principles */}
        <section className="py-12 bg-card/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Heart, title: "Well-being First", description: "Your mental health is our priority" },
                { icon: Clock, title: "Time Awareness", description: "Play within healthy time limits" },
                { icon: Scale, title: "Balance", description: "Fantasy sports as entertainment, not obsession" },
                { icon: HandHeart, title: "Support", description: "Help is always available when needed" },
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

              {/* Responsible Gaming Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-8 lg:p-12">
                    {/* Section 1: Our Commitment */}
                    <section id="commitment" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                        Our Commitment to Responsible Gaming
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {COMPANY_INFO.brandName} is committed to ensuring that fantasy cricket remains a fun, 
                          entertaining, and positive experience for all our users. We recognize that while the 
                          vast majority of our users enjoy fantasy sports responsibly, some individuals may 
                          develop unhealthy patterns of play.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          As a free-to-play platform, we eliminate the financial risks associated with real-money 
                          gaming. However, we understand that excessive time spent on any activity can impact 
                          your well-being, relationships, and daily responsibilities.
                        </p>
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <Heart className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold mb-2">Our Promise</p>
                              <p className="text-muted-foreground">
                                We are dedicated to providing tools, resources, and support to help you maintain 
                                a healthy relationship with fantasy sports. Your well-being is more important 
                                than any contest or leaderboard ranking.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 2: Understanding Fantasy Sports */}
                    <section id="understanding" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                        Understanding Fantasy Sports
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Fantasy sports are games of skill where participants create virtual teams of real 
                          players and earn points based on those players' actual performance in real matches. 
                          It's important to understand the nature of fantasy sports:
                        </p>
                        
                        <h3 className="text-lg font-semibold mb-3 mt-6">What Fantasy Sports Are</h3>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-4">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">A skill-based game that rewards cricket knowledge and strategic thinking</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">A form of entertainment that enhances your cricket viewing experience</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">A way to connect with other cricket fans and compete in a friendly environment</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">On our platform: completely free to play with no financial risk</span>
                            </li>
                          </ul>
                        </div>

                        <h3 className="text-lg font-semibold mb-3 mt-6">What Fantasy Sports Should NOT Be</h3>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                          <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">A replacement for real-life social interactions and relationships</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">An activity that interferes with work, studies, or responsibilities</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">A source of stress, anxiety, or negative emotions</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">An obsession that dominates your thoughts and time</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 3: Healthy Play Guidelines */}
                    <section id="healthy-play" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                        Healthy Play Guidelines
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Follow these guidelines to ensure fantasy sports remain a positive part of your life:
                        </p>
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Target className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">Set Clear Boundaries</p>
                                <p className="text-muted-foreground text-sm">Decide in advance how much time you'll spend on fantasy sports each day/week and stick to it.</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Scale className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">Maintain Balance</p>
                                <p className="text-muted-foreground text-sm">Ensure fantasy sports don't interfere with work, studies, family time, or other important activities.</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Lightbulb className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">Play for Fun</p>
                                <p className="text-muted-foreground text-sm">Remember that fantasy sports are meant to be enjoyable. If you're not having fun, take a break.</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">Stay Social</p>
                                <p className="text-muted-foreground text-sm">Use fantasy sports as a way to connect with friends, not isolate yourself from them.</p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <Brain className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold">Be Self-Aware</p>
                                <p className="text-muted-foreground text-sm">Regularly check in with yourself about your gaming habits and how they make you feel.</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 4: Time Management */}
                    <section id="time-management" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">4</span>
                        Time Management
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Effective time management is crucial for maintaining a healthy relationship with 
                          fantasy sports. Here are some practical tips:
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <Timer className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold">Set Time Limits</h4>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Allocate specific time slots for fantasy sports and use timers or alarms to 
                                remind yourself when time is up.
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <Clock className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold">Schedule Breaks</h4>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Take regular breaks from the platform. Consider having fantasy-free days 
                                each week.
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <Target className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold">Prioritize Tasks</h4>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Complete important tasks and responsibilities before engaging with 
                                fantasy sports.
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="bg-muted/30">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                <h4 className="font-semibold">Track Your Time</h4>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Keep a log of how much time you spend on fantasy sports to stay aware 
                                of your habits.
                              </p>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                            <p className="text-muted-foreground">
                              <strong>Recommended Limit:</strong> We suggest spending no more than 1-2 hours 
                              per day on fantasy sports activities, including research, team creation, and 
                              following live matches.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 5: Warning Signs */}
                    <section id="warning-signs" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">5</span>
                        Warning Signs
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Be aware of these warning signs that may indicate your fantasy sports habits 
                          are becoming unhealthy:
                        </p>
                        
                        <div className="space-y-4">
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              Time-Related Warning Signs
                            </h4>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                              <li>• Spending more time than planned on fantasy sports</li>
                              <li>• Losing track of time while playing</li>
                              <li>• Staying up late or waking up early to check scores</li>
                              <li>• Neglecting sleep or meals due to fantasy sports</li>
                            </ul>
                          </div>

                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              Behavioral Warning Signs
                            </h4>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                              <li>• Feeling restless or irritable when not playing</li>
                              <li>• Hiding your fantasy sports activity from others</li>
                              <li>• Lying about how much time you spend playing</li>
                              <li>• Feeling the need to play more to feel satisfied</li>
                            </ul>
                          </div>

                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-red-500" />
                              Impact Warning Signs
                            </h4>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                              <li>• Neglecting work, studies, or responsibilities</li>
                              <li>• Relationships suffering due to fantasy sports</li>
                              <li>• Declining performance at work or school</li>
                              <li>• Physical health issues from sedentary behavior</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 6: Self-Assessment */}
                    <section id="self-assessment" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">6</span>
                        Self-Assessment
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          Take a moment to honestly answer these questions. If you answer "yes" to 
                          three or more, consider taking a break and seeking support:
                        </p>
                        
                        <Card className="bg-muted/30">
                          <CardContent className="p-6">
                            <ol className="space-y-4">
                              {selfAssessmentQuestions.map((question, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <span className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium shrink-0">
                                    {index + 1}
                                  </span>
                                  <span className="text-muted-foreground">{question}</span>
                                </li>
                              ))}
                            </ol>
                          </CardContent>
                        </Card>

                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-6">
                          <div className="flex items-start gap-3">
                            <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-muted-foreground">
                              <strong>Remember:</strong> There's no shame in acknowledging that you need help. 
                              Recognizing a problem is the first step toward positive change. We're here to 
                              support you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 7: Tools & Controls */}
                    <section id="tools" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">7</span>
                        Tools & Controls
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          We provide several tools to help you manage your fantasy sports activity:
                        </p>
                        
                        <div className="bg-muted/30 rounded-lg p-6 mb-4">
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">Self-Exclusion</p>
                                <p className="text-muted-foreground text-sm">
                                  Request to temporarily or permanently deactivate your account. Contact our 
                                  support team at support@{COMPANY_INFO.domain} to initiate this process.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">Cool-Off Period</p>
                                <p className="text-muted-foreground text-sm">
                                  Take a break from the platform for a specified period (24 hours to 30 days). 
                                  Your account will be temporarily suspended during this time.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">Activity History</p>
                                <p className="text-muted-foreground text-sm">
                                  Review your contest participation history to understand your playing patterns 
                                  and identify any concerning trends.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">Account Deletion</p>
                                <p className="text-muted-foreground text-sm">
                                  Permanently delete your account and all associated data. This action cannot 
                                  be undone.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 8: Getting Support */}
                    <section id="support" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">8</span>
                        Getting Support
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          If you're struggling with your gaming habits, please reach out for support. 
                          You're not alone, and help is available:
                        </p>
                        
                        <div className="space-y-4">
                          <Card className="bg-muted/30">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Talk to Someone You Trust
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                Share your concerns with a friend, family member, or trusted person. Sometimes 
                                just talking about it can help you gain perspective and find solutions.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-muted/30">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Heart className="h-5 w-5 text-primary" />
                                Professional Help
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                Consider speaking with a mental health professional or counselor who specializes 
                                in behavioral issues. They can provide personalized guidance and support.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-muted/30">
                            <CardContent className="p-6">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary" />
                                Contact Us
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                Our support team is trained to help users who are concerned about their gaming 
                                habits. Reach out to us at support@{COMPANY_INFO.domain} for confidential 
                                assistance.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </section>

                    {/* Section 9: Resources */}
                    <section id="resources" className="mb-12 scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">9</span>
                        External Resources
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          These organizations provide support and resources for gaming-related concerns:
                        </p>
                        
                        <div className="bg-muted/30 rounded-lg p-6">
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">iCall (India)</p>
                                <p className="text-muted-foreground text-sm">
                                  Psychosocial helpline: 9152987821 (Monday to Saturday, 8am to 10pm)
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">Vandrevala Foundation</p>
                                <p className="text-muted-foreground text-sm">
                                  24/7 Mental Health Helpline: 1860-2662-345
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">NIMHANS (India)</p>
                                <p className="text-muted-foreground text-sm">
                                  National Institute of Mental Health: 080-46110007
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    {/* Section 10: Contact Us */}
                    <section id="contact" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">10</span>
                        Contact Us
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          If you have any questions about responsible gaming or need assistance, please 
                          contact us:
                        </p>
                        <Card className="bg-muted/30">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-medium">Responsible Gaming Support</p>
                                  <p className="text-sm text-muted-foreground">{COMPANY_INFO.companyName}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <a href={`mailto:support@${COMPANY_INFO.domain}`} className="text-primary hover:underline">
                                  support@{COMPANY_INFO.domain}
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
                <Link href="/privacy">Privacy Policy</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/fair-play">Fair Play Policy</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Play Responsibly, Enjoy More</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Fantasy cricket is best enjoyed when it's part of a balanced lifestyle. 
              Take care of yourself, and the game will always be here when you're ready.
            </p>
            <Button asChild className="gradient-brand">
              <Link href="/how-to-play">
                Learn How to Play
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
