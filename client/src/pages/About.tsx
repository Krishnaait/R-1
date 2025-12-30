import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Users, 
  Trophy, 
  Target,
  Heart,
  Zap,
  Gamepad2,
  BarChart3,
  Clock,
  Globe,
  Award,
  Lightbulb,
  CheckCircle,
  Star,
  TrendingUp,
  Lock,
  Smartphone
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const coreValues = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We operate with complete transparency in all our dealings. Our scoring systems, rules, and policies are clearly documented and consistently applied to ensure every user has a fair experience.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Our platform is built around the cricket community. We actively listen to user feedback, implement requested features, and foster a supportive environment where cricket enthusiasts can connect and compete.",
  },
  {
    icon: Trophy,
    title: "Fair Competition",
    description: "We maintain strict anti-fraud measures and fair play policies to ensure a level playing field. Every user competes on equal terms, with success determined solely by cricket knowledge and strategy.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description: "We constantly evolve our platform with cutting-edge technology, real-time data integration, and user-centric features to deliver the best fantasy cricket experience possible.",
  },
];

const platformFeatures = [
  { icon: Gamepad2, value: "100%", label: "Free to Play", description: "No entry fees, no hidden charges" },
  { icon: Zap, value: "Real-Time", label: "Live Updates", description: "Scores update every 3 seconds" },
  { icon: BarChart3, value: "Detailed", label: "Player Stats", description: "Comprehensive player analytics" },
  { icon: Clock, value: "24/7", label: "Available", description: "Play anytime, anywhere" },
];

const milestones = [
  { year: "2025", title: "Platform Launch", description: "IMAGINITIATE Fantasy Sports platform goes live with comprehensive cricket coverage" },
  { year: "2025", title: "CricAPI Integration", description: "Real-time match data integration covering international and domestic cricket" },
  { year: "2025", title: "Multi-League Support", description: "Support for IPL, BBL, PSL, SA20, and all major cricket leagues worldwide" },
];

const whyChooseUs = [
  { icon: Lock, title: "Secure Platform", description: "Industry-standard encryption protects your data and ensures safe gameplay" },
  { icon: Smartphone, title: "Mobile Friendly", description: "Fully responsive design works seamlessly on all devices" },
  { icon: TrendingUp, title: "Real-Time Scoring", description: "Live point calculations as the match progresses" },
  { icon: Award, title: "Leaderboard Rankings", description: "Compete for top positions and track your performance" },
  { icon: Globe, title: "Global Coverage", description: "All major cricket leagues and international matches" },
  { icon: Star, title: "Player Statistics", description: "Detailed batting, bowling, and fielding stats for informed decisions" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/about-hero.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          
          <div className="container relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
              Passion for Cricket
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-brand-text">{COMPANY_INFO.brandName}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {COMPANY_INFO.brandName} is India's emerging free-to-play fantasy cricket platform, 
              designed to bring the excitement of cricket strategy to fans across the nation. 
              We combine cutting-edge technology with our deep passion for cricket to deliver 
              an engaging, fair, and thrilling fantasy sports experience.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
              
              <div className="prose prose-invert max-w-none">
                <Card className="mb-8">
                  <CardContent className="p-8">
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {COMPANY_INFO.brandName} was born from a simple yet powerful idea: every cricket fan deserves 
                      the opportunity to experience the thrill of team management and strategic decision-making 
                      that comes with fantasy sports, without any financial barriers.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      Founded by {COMPANY_INFO.companyName}, our platform represents the culmination of extensive 
                      research into what cricket fans truly want from a fantasy sports experience. We identified 
                      that while many platforms exist, few offer a genuinely free, fair, and feature-rich experience 
                      that puts the user first.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Today, {COMPANY_INFO.brandName} stands as a testament to our commitment to the cricket community. 
                      We provide real-time match data, comprehensive player statistics, and an intuitive team-building 
                      experience that allows fans to showcase their cricket knowledge and compete for glory on our 
                      leaderboards.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To democratize fantasy cricket by providing a completely free, fair, and engaging platform 
                    where every cricket enthusiast can participate, regardless of their financial background.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Make fantasy cricket accessible to all fans",
                      "Provide accurate, real-time match data",
                      "Foster a community of passionate cricket lovers",
                      "Continuously innovate based on user feedback"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Globe className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To become India's most trusted and beloved free-to-play fantasy cricket platform, 
                    recognized for our commitment to fair play, user experience, and cricket expertise.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Build India's largest cricket fantasy community",
                      "Set industry standards for fair play",
                      "Expand to cover all cricket formats globally",
                      "Create innovative features that enhance engagement"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform is packed with features designed to give you the ultimate fantasy cricket experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformFeatures.map((feature) => (
                <Card key={feature.label} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-3xl font-bold gradient-brand-text mb-1">{feature.value}</p>
                    <p className="font-semibold mb-2">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do at {COMPANY_INFO.brandName}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {coreValues.map((value) => (
                <Card key={value.title} className="card-hover">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <value.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose {COMPANY_INFO.brandName}?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Here's what sets us apart from other fantasy cricket platforms
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whyChooseUs.map((item) => (
                <Card key={item.title} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Journey/Milestones Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Key milestones in our mission to revolutionize fantasy cricket
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-primary/20 mt-2" />
                      )}
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <div className="text-sm text-primary font-medium mb-1">{milestone.year}</div>
                        <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Information Section */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-8 text-center">Company Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground font-medium">Legal Name</span>
                      <span className="sm:col-span-2 font-medium">{COMPANY_INFO.companyName}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg">
                      <span className="text-muted-foreground font-medium">Brand Name</span>
                      <span className="sm:col-span-2 font-medium">{COMPANY_INFO.brandName}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground font-medium">Tagline</span>
                      <span className="sm:col-span-2">{COMPANY_INFO.tagline}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg">
                      <span className="text-muted-foreground font-medium">Registered Address</span>
                      <span className="sm:col-span-2">{COMPANY_INFO.address}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
                      <span className="text-muted-foreground font-medium">Website</span>
                      <a href={`https://${COMPANY_INFO.domain}`} className="sm:col-span-2 text-primary hover:underline">
                        {COMPANY_INFO.domain}
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-lg">
                      <span className="text-muted-foreground font-medium">Email</span>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="sm:col-span-2 text-primary hover:underline">
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Fantasy Journey?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join {COMPANY_INFO.brandName} today and experience the thrill of fantasy cricket. 
              Create your dream team, compete with other fans, and climb the leaderboards!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/matches" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Browse Matches
              </a>
              <a 
                href="/how-to-play" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
              >
                Learn How to Play
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
