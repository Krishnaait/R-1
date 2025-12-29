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
  Gamepad2
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We prioritize the security of our users with industry-leading encryption and fair play policies.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Building a vibrant community of cricket enthusiasts who share their passion for the game.",
  },
  {
    icon: Trophy,
    title: "Fair Competition",
    description: "Ensuring a level playing field for all participants with transparent rules and scoring.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Continuously improving our platform with cutting-edge technology and user feedback.",
  },
];

const stats = [
  { value: "10L+", label: "Active Users" },
  { value: "500+", label: "Daily Contests" },
  { value: "100%", label: "Free to Play" },
  { value: "24/7", label: "Support" },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/about-hero.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          
          <div className="container relative text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-brand-text">{COMPANY_INFO.brandName}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {COMPANY_INFO.brandName} is India's premier free-to-play fantasy cricket platform, 
              bringing the excitement of cricket to millions of fans across the country. 
              We combine cutting-edge technology with our passion for cricket to deliver 
              an unmatched fantasy sports experience.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    To revolutionize the way cricket fans engage with the sport they love. 
                    We believe every fan deserves the thrill of building their dream team 
                    and competing for glory.
                  </p>
                  <p className="text-muted-foreground">
                    Our platform empowers millions of users to showcase their cricket 
                    knowledge, compete with friends and strangers alike, and climb the 
                    leaderboard while enjoying every match - completely free!
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Heart className="h-24 w-24 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl md:text-4xl font-bold gradient-brand-text">{stat.value}</p>
                    <p className="text-muted-foreground mt-2">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Info Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-center">Company Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-muted-foreground font-medium min-w-[140px]">Legal Name:</span>
                      <span>{COMPANY_INFO.companyName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-muted-foreground font-medium min-w-[140px]">Brand Name:</span>
                      <span>{COMPANY_INFO.brandName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <span className="text-muted-foreground font-medium min-w-[140px]">Address:</span>
                      <span>{COMPANY_INFO.address}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-muted-foreground font-medium min-w-[140px]">Website:</span>
                      <a href={`https://${COMPANY_INFO.domain}`} className="text-primary hover:underline">
                        {COMPANY_INFO.domain}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose {COMPANY_INFO.brandName}?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Gamepad2, text: "100% Free to Play" },
                { icon: Shield, text: "Secure Platform" },
                { icon: Trophy, text: "Exciting Competitions" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center gap-3 p-4">
                  <item.icon className="h-6 w-6 text-primary" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
