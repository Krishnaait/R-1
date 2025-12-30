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
        a: "Creating an account is simple! Click on the 'Sign Up' button, enter your details, verify your email/phone, and you're ready to start playing. The entire process takes less than 2 minutes.",
      },
      {
        q: "Is it legal to play fantasy cricket in India?",
        a: "Yes, fantasy cricket is completely legal in India. It is classified as a game of skill, which is exempt from gambling laws. The Supreme Court of India has recognized fantasy sports as games of skill.",
      },
      {
        q: "What is the minimum age to play?",
        a: "You must be at least 18 years old to create an account and participate in paid contests on our platform.",
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
    category: "Contests & Prizes",
    questions: [
      {
        q: "What types of contests are available?",
        a: "We offer various contest types including: Mega Contests (large prize pools), Head to Head (1v1 battles), Winner Takes All, and Free Practice contests for beginners.",
      },
      {
        q: "How are winners determined?",
        a: "Winners are determined based on the total points scored by their fantasy team. Points are calculated based on the real-life performance of your selected players.",
      },
      {
        q: "When do I receive my winnings?",
        a: "Winnings are credited to your account within 24 hours after the match is completed and results are verified.",
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
    category: "Payments & Withdrawals",
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept all major payment methods including UPI, Debit/Credit Cards, Net Banking, and popular wallets like Paytm and PhonePe.",
      },
      {
        q: "How do I withdraw my winnings?",
        a: "Go to your wallet, click on 'Withdraw', enter the amount and your bank details. Withdrawals are processed within 24-48 hours.",
      },
      {
        q: "Is there a minimum withdrawal amount?",
        a: "Yes, the minimum withdrawal amount is ₹100. There are no withdrawal fees.",
      },
      {
        q: "Are my transactions secure?",
        a: "Absolutely! We use industry-standard 256-bit SSL encryption to protect all your transactions and personal data.",
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
