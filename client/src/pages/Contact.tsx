import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  MapPin, 
  Phone,
  Send,
  MessageSquare,
  Clock,
  HelpCircle,
  Shield,
  AlertTriangle,
  FileText,
  Users,
  Headphones,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";
import { toast } from "sonner";
import { Link } from "wouter";

const supportCategories = [
  {
    icon: HelpCircle,
    title: "General Inquiries",
    description: "Questions about our platform, features, or how to get started",
    email: `info@${COMPANY_INFO.domain}`,
    responseTime: "Within 24 hours"
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Issues with app functionality, login problems, or bugs",
    email: `support@${COMPANY_INFO.domain}`,
    responseTime: "Within 12 hours"
  },
  {
    icon: Shield,
    title: "Account & Security",
    description: "Account recovery, security concerns, or verification issues",
    email: `security@${COMPANY_INFO.domain}`,
    responseTime: "Within 6 hours"
  },
  {
    icon: AlertTriangle,
    title: "Report Issues",
    description: "Report suspicious activity, fair play violations, or abuse",
    email: `fairplay@${COMPANY_INFO.domain}`,
    responseTime: "Within 4 hours"
  },
  {
    icon: FileText,
    title: "Legal & Compliance",
    description: "Legal inquiries, compliance questions, or official requests",
    email: `legal@${COMPANY_INFO.domain}`,
    responseTime: "Within 48 hours"
  },
  {
    icon: Users,
    title: "Partnerships",
    description: "Business partnerships, collaborations, or media inquiries",
    email: `partnerships@${COMPANY_INFO.domain}`,
    responseTime: "Within 72 hours"
  },
];

const quickLinks = [
  { title: "How to Play", href: "/how-to-play", description: "Learn the basics of fantasy cricket" },
  { title: "FAQ", href: "/faq", description: "Find answers to common questions" },
  { title: "Fair Play Policy", href: "/fair-play", description: "Understand our fair play guidelines" },
  { title: "Terms of Service", href: "/terms", description: "Read our terms and conditions" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", category: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
          <div className="container relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <MessageSquare className="h-4 w-4" />
              We're Here to Help
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact <span className="gradient-brand-text">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions, feedback, or need assistance? Our dedicated support team is here to help you 
              with any inquiries related to {COMPANY_INFO.brandName}. Reach out through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the most appropriate channel based on your inquiry type for faster assistance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {supportCategories.map((category) => (
                <Card key={category.title} className="card-hover">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <div className="space-y-2">
                      <a 
                        href={`mailto:${category.email}`}
                        className="text-primary hover:underline text-sm flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        {category.email}
                      </a>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Response: {category.responseTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Details */}
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                
                <div className="space-y-6 mb-8">
                  {/* Office Address */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Registered Office</h3>
                          <p className="text-muted-foreground">{COMPANY_INFO.companyName}</p>
                          <p className="text-muted-foreground mt-1">{COMPANY_INFO.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Email Support</h3>
                          <div className="space-y-1">
                            <a 
                              href={`mailto:support@${COMPANY_INFO.domain}`}
                              className="text-primary hover:underline block"
                            >
                              support@{COMPANY_INFO.domain}
                            </a>
                            <p className="text-sm text-muted-foreground">
                              For general support and inquiries
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Support Hours */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Support Hours</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Monday - Friday</span>
                              <span className="font-medium">9:00 AM - 9:00 PM IST</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Saturday - Sunday</span>
                              <span className="font-medium">10:00 AM - 6:00 PM IST</span>
                            </div>
                            <p className="text-sm text-primary mt-2">
                              Extended support during live matches
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Website */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Globe className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Website</h3>
                          <a 
                            href={`https://${COMPANY_INFO.domain}`}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {COMPANY_INFO.domain}
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            Visit our website for more information
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Response Time Info */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Our Response Commitment
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        General inquiries: Response within 24 hours
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        Technical issues: Response within 12 hours
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        Security concerns: Priority response within 6 hours
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        Fair play violations: Immediate attention within 4 hours
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Send className="h-6 w-6 text-primary" />
                      Send us a Message
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="">Select a category</option>
                            <option value="general">General Inquiry</option>
                            <option value="technical">Technical Support</option>
                            <option value="account">Account & Security</option>
                            <option value="report">Report an Issue</option>
                            <option value="feedback">Feedback & Suggestions</option>
                            <option value="partnership">Partnership Inquiry</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please provide as much detail as possible about your inquiry. Include any relevant information such as match IDs, contest names, or error messages if applicable."
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum 20 characters. Be as detailed as possible for faster resolution.
                        </p>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full gradient-brand"
                        disabled={isSubmitting}
                        size="lg"
                      >
                        {isSubmitting ? (
                          "Sending Message..."
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our{" "}
                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        {" "}and{" "}
                        <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Helpful Resources</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers quickly by exploring our help resources
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <Card className="card-hover h-full cursor-pointer">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">{link.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                      <span className="text-primary text-sm flex items-center gap-1">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Looking for Quick Answers?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Many common questions are answered in our comprehensive FAQ section. 
              Check it out before reaching out - you might find your answer instantly!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-brand">
                <Link href="/faq">
                  Browse FAQ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/how-to-play">
                  How to Play Guide
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
