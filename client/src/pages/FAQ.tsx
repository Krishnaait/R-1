import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpCircle, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "@shared/types";

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is fantasy cricket?",
        a: "Fantasy cricket is a game where you create a virtual team of real cricket players and earn points based on their actual performance in real matches. The better your players perform, the more points you score!",
      },
      {
        q: "How do I create an account?",
        a: "Creating an account is simple! Click on the 'Sign Up' button, enter your details, and you're ready to start playing. The entire process takes less than 2 minutes.",
      },
      {
        q: "Is it free to play?",
        a: "Yes! Our platform is 100% free to play. There are no entry fees, no hidden charges, and no real money involved. You compete for points and rankings, not cash prizes.",
      },
      {
        q: "What is the minimum age to play?",
        a: "You must be at least 18 years old to create an account and participate on our platform.",
      },
    ],
  },
  {
    category: "Team Creation",
    questions: [
      {
        q: "How many players can I select in my team?",
        a: "You need to select exactly 11 players for your fantasy team, just like a real cricket team.",
      },
      {
        q: "What is the credit system?",
        a: "Each player has a credit value based on their recent performance and popularity. You have a total of 100 credits to build your team. Choose wisely to create a balanced team within the budget!",
      },
      {
        q: "What is Captain and Vice-Captain?",
        a: "Captain (C) earns 2x points and Vice-Captain (VC) earns 1.5x points for their performance. Choosing the right C and VC can significantly boost your total score.",
      },
      {
        q: "Can I edit my team after creating it?",
        a: "Yes, you can edit your team any time before the match deadline (usually when the match starts). Once the match begins, your team is locked.",
      },
      {
        q: "Can I create multiple teams for the same match?",
        a: "Yes, you can create multiple teams for the same match and join different contests with different teams.",
      },
    ],
  },
  {
    category: "Contests & Competition",
    questions: [
      {
        q: "What types of contests are available?",
        a: "We offer various contest types including: Mega Contests (large participant pools), Head to Head (1v1 battles), and Practice contests for beginners. All contests are free to join!",
      },
      {
        q: "How are winners determined?",
        a: "Winners are determined based on the total points scored by their fantasy team. Points are calculated based on the real-life performance of your selected players.",
      },
      {
        q: "What do I win?",
        a: "You compete for points and leaderboard rankings. Climb the leaderboard to showcase your cricket knowledge and compete with other players for glory!",
      },
      {
        q: "Is there a limit on how many contests I can join?",
        a: "There's no limit on the number of contests you can join, but each contest has a maximum entry limit which varies by contest type.",
      },
    ],
  },
  {
    category: "Points & Scoring",
    questions: [
      {
        q: "How are points calculated?",
        a: "Points are calculated based on various actions: runs scored, wickets taken, catches, stumpings, run-outs, and more. Each action has a specific point value. Check our 'How to Play' page for the complete points system.",
      },
      {
        q: "When are points updated?",
        a: "Points are updated in real-time during live matches. You can track your team's performance on the live score page.",
      },
      {
        q: "What happens if a player doesn't play?",
        a: "If a player in your team doesn't play in the match, you won't receive any points for that player. That's why it's important to check playing XI announcements before the deadline.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I update my profile?",
        a: "Go to your Dashboard and click on your profile settings to update your information.",
      },
      {
        q: "Is my data secure?",
        a: "Absolutely! We use industry-standard encryption to protect all your personal data and account information.",
      },
      {
        q: "How do I reset my password?",
        a: "Click on 'Forgot Password' on the login page and follow the instructions sent to your registered email.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes, you can request account deletion by contacting our support team. Please note that this action is irreversible.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/faq-hero.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          
          <div className="container relative text-center">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-brand-text">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about {COMPANY_INFO.brandName}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              {faqCategories.map((category) => (
                <Card key={category.category}>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 gradient-brand-text">
                      {category.category}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="container text-center">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <Button asChild className="gradient-brand">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
