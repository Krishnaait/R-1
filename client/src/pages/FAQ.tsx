import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Users, 
  Trophy, 
  Shield, 
  Gamepad2,
  BarChart3,
  Clock,
  Settings,
  MessageSquare,
  ArrowRight,
  Search,
  Zap,
  Star,
  Crown
} from "lucide-react";
import { COMPANY_INFO } from "@shared/types";
import { useState } from "react";

const faqCategories = [
  {
    id: "getting-started",
    icon: Gamepad2,
    title: "Getting Started",
    description: "Learn the basics of fantasy cricket",
    faqs: [
      {
        question: "What is fantasy cricket?",
        answer: `Fantasy cricket is an online game where you create a virtual team of real cricket players and earn points based on their actual performance in real matches. You select 11 players from the two teams playing in a match, choose a captain and vice-captain, and compete against other users. The better your selected players perform in the actual match, the more points you score. It's a test of your cricket knowledge and analytical skills.`
      },
      {
        question: "How do I create an account on IMAGINITIATE?",
        answer: `Creating an account on ${COMPANY_INFO.brandName} is simple and free. Click on the "Login" button on the top right corner of the page, and you'll be redirected to our secure authentication page. You can sign up using your email address or through social login options. Once registered, you can immediately start creating teams and joining contests.`
      },
      {
        question: "Is it free to play on IMAGINITIATE?",
        answer: `Yes! ${COMPANY_INFO.brandName} is a 100% free-to-play fantasy cricket platform. There are no entry fees, no hidden charges, and no real money involved. All contests on our platform are completely free to join. You compete for glory, leaderboard rankings, and bragging rights - not money.`
      },
      {
        question: "What cricket matches are available on the platform?",
        answer: `We cover a wide range of cricket matches including international matches (Tests, ODIs, T20Is), major T20 leagues (IPL, BBL, PSL, SA20, CPL, The Hundred), domestic tournaments, and other significant cricket events. Our data is updated in real-time through our CricAPI integration, ensuring you have access to the latest matches and player information.`
      },
      {
        question: "Do I need to download an app to play?",
        answer: `No, you don't need to download any app. ${COMPANY_INFO.brandName} is a fully responsive web application that works seamlessly on all devices - desktop computers, laptops, tablets, and mobile phones. Simply visit our website through your browser and start playing. The website is optimized for mobile viewing, providing an app-like experience.`
      },
    ]
  },
  {
    id: "team-creation",
    icon: Users,
    title: "Team Creation",
    description: "How to build your fantasy team",
    faqs: [
      {
        question: "How do I create a fantasy team?",
        answer: `To create a fantasy team: 1) Go to the Matches page and select an upcoming match. 2) Click "Create Team" to view available players from both teams. 3) Select 11 players within the 100 credit budget. 4) Ensure you have the required number of players from each category (wicket-keepers, batsmen, all-rounders, bowlers). 5) Choose your Captain (2x points) and Vice-Captain (1.5x points). 6) Save your team and join contests.`
      },
      {
        question: "What are the team composition rules?",
        answer: `Your team must consist of exactly 11 players with the following constraints: Wicket-keepers: Minimum 1, Maximum 4 | Batsmen: Minimum 1, Maximum 6 | All-rounders: Minimum 1, Maximum 6 | Bowlers: Minimum 1, Maximum 6. Additionally, you can select a maximum of 7 players from any single team. The total credit value of your team cannot exceed 100 credits.`
      },
      {
        question: "What is the credit system?",
        answer: `Each player is assigned a credit value based on their recent performance, form, and overall skill level. You have a budget of 100 credits to build your team of 11 players. Higher-performing players typically have higher credit values, so you need to balance your team between star players and value picks. This system ensures fair competition and strategic team building.`
      },
      {
        question: "How do Captain and Vice-Captain selections work?",
        answer: `The Captain and Vice-Captain are crucial selections that can significantly impact your total score. Your Captain earns 2x (double) the points for their performance, while your Vice-Captain earns 1.5x points. For example, if a player scores 50 points and is your Captain, you'll receive 100 points. If they're your Vice-Captain, you'll receive 75 points. Choose players you expect to perform exceptionally well.`
      },
      {
        question: "Can I create multiple teams for the same match?",
        answer: `Yes, you can create multiple teams for the same match. This allows you to try different strategies and combinations. Each team can have different player selections, captains, and vice-captains. You can enter different teams in different contests or the same team in multiple contests.`
      },
      {
        question: "Can I edit my team after creating it?",
        answer: `Yes, you can edit your team at any time before the match starts (specifically, before the toss). Once the match begins, all teams are locked and cannot be modified. We recommend waiting for the playing XI announcement before finalizing your team to ensure all your selected players are actually playing.`
      },
    ]
  },
  {
    id: "points-scoring",
    icon: BarChart3,
    title: "Points & Scoring",
    description: "Understanding the points system",
    faqs: [
      {
        question: "How are fantasy points calculated?",
        answer: `Fantasy points are calculated based on various actions performed by players during the match. Batting points include runs scored (+1 per run), boundaries (+1 for 4s, +2 for 6s), and milestone bonuses (half-century +8, century +16). Bowling points include wickets (+25), maiden overs (+12 in T20), and bonus for LBW/Bowled dismissals (+8). Fielding points include catches (+8), stumpings (+12), and run outs (+6 to +12). Additional bonuses/penalties apply for economy rate and strike rate.`
      },
      {
        question: "Do points vary by match format?",
        answer: `Yes, the points system varies slightly between T20, ODI, and Test matches to account for the different nature of each format. For example, maiden overs are worth more in T20s (+12) than in ODIs (+4) because they're harder to bowl. Strike rate and economy rate bonuses/penalties also differ by format. Check our "How to Play" page for the complete points breakdown by format.`
      },
      {
        question: "When are points updated during a match?",
        answer: `Points are updated in real-time as the match progresses. Our system receives live data from CricAPI and calculates points automatically with every ball bowled. The leaderboard updates every few seconds, so you can track your team's performance and ranking throughout the match.`
      },
      {
        question: "What happens if a player doesn't play?",
        answer: `If a player you've selected doesn't play in the match (not in the playing XI), they will score 0 points. This is why we recommend waiting for the toss and playing XI announcement before finalizing your team. There are no substitute players in fantasy cricket - only the 11 players you've selected can earn points.`
      },
      {
        question: "How are bonus points for milestones calculated?",
        answer: `Milestone bonuses are awarded when players achieve specific targets. For batting: Half-century (50 runs) = +8 points, Century (100 runs) = +16 points. For bowling: 3-wicket haul = +4 points, 4-wicket haul = +8 points, 5-wicket haul = +16 points. These bonuses are cumulative - a player scoring 100 runs gets both the half-century and century bonus.`
      },
    ]
  },
  {
    id: "contests",
    icon: Trophy,
    title: "Contests & Leaderboards",
    description: "Competing with other players",
    faqs: [
      {
        question: "What types of contests are available?",
        answer: `${COMPANY_INFO.brandName} offers various free contest formats to suit different preferences. We have Head-to-Head contests (compete against one opponent), Small contests (limited participants), and Large contests (open to many participants). All contests are completely free to join - we don't charge any entry fees.`
      },
      {
        question: "How do leaderboards work?",
        answer: `Leaderboards rank all participants in a contest based on their total fantasy points. As the match progresses and points are calculated, the leaderboard updates in real-time. Your rank is determined by your team's total points compared to other participants. In case of a tie, the user who joined the contest first is ranked higher.`
      },
      {
        question: "Can I join multiple contests with the same team?",
        answer: `Yes, you can join multiple contests using the same team. You can also join the same contest multiple times with different teams (if you've created multiple teams). This allows you to maximize your participation and try different strategies.`
      },
      {
        question: "What happens if a match is abandoned or cancelled?",
        answer: `If a match is abandoned or cancelled before a certain number of overs are bowled, contests may be cancelled and no results will be declared. If sufficient play has occurred (typically a minimum number of overs), the contest may be completed based on the points accumulated until that point. The specific rules depend on the match situation and will be communicated to participants.`
      },
      {
        question: "How do I view my contest history?",
        answer: `You can view your contest history by going to your Dashboard. The "My Contests" section shows all contests you've participated in, including live, upcoming, and completed contests. You can see your teams, points scored, and final rankings for each contest.`
      },
    ]
  },
  {
    id: "account",
    icon: Settings,
    title: "Account & Settings",
    description: "Managing your account",
    faqs: [
      {
        question: "How do I update my profile information?",
        answer: `To update your profile, go to your Dashboard and click on your profile section. You can update your display name, profile picture, and other settings. Some information linked to your authentication provider may not be editable directly on our platform.`
      },
      {
        question: "How do I change my password?",
        answer: `Password management depends on your login method. If you signed up with email, you can reset your password through the "Forgot Password" option on the login page. If you use social login (Google, etc.), your password is managed by that provider and cannot be changed on our platform.`
      },
      {
        question: "Can I delete my account?",
        answer: `Yes, you can request account deletion by contacting our support team at support@${COMPANY_INFO.domain}. Please note that account deletion is permanent and will remove all your data, including contest history and teams. We process deletion requests within 7 business days.`
      },
      {
        question: "Is my personal information secure?",
        answer: `Yes, we take data security very seriously. We use industry-standard encryption to protect your personal information. We don't share your data with third parties without your consent. For more details, please read our Privacy Policy.`
      },
      {
        question: "How do I report a bug or issue?",
        answer: `If you encounter any bugs or issues, please report them through our Contact page or email us at support@${COMPANY_INFO.domain}. Include as much detail as possible - screenshots, error messages, device/browser information, and steps to reproduce the issue. Our technical team will investigate and respond within 12 hours.`
      },
    ]
  },
  {
    id: "fair-play",
    icon: Shield,
    title: "Fair Play & Rules",
    description: "Our commitment to fair gaming",
    faqs: [
      {
        question: "What is your fair play policy?",
        answer: `${COMPANY_INFO.brandName} is committed to providing a fair and enjoyable experience for all users. Our fair play policy prohibits the use of multiple accounts, automated tools/bots, collusion with other users, and any form of cheating or manipulation. Violations may result in account suspension or permanent ban. Read our complete Fair Play Policy for details.`
      },
      {
        question: "Can I have multiple accounts?",
        answer: `No, each user is allowed only one account on ${COMPANY_INFO.brandName}. Creating multiple accounts is a violation of our terms of service and fair play policy. If we detect multiple accounts belonging to the same user, all accounts may be suspended or banned.`
      },
      {
        question: "What happens if I violate the fair play policy?",
        answer: `Violations of our fair play policy are taken seriously. Depending on the severity, consequences may include: warning and notification, temporary account suspension, permanent account ban, and disqualification from contests. We investigate all reports thoroughly before taking action.`
      },
      {
        question: "How do I report suspicious activity?",
        answer: `If you notice any suspicious activity or believe someone is violating our fair play policy, please report it immediately to fairplay@${COMPANY_INFO.domain}. Include any relevant details such as usernames, contest IDs, and description of the suspicious behavior. All reports are investigated confidentially.`
      },
      {
        question: "Are there any age restrictions?",
        answer: `Yes, you must be at least 18 years old to use ${COMPANY_INFO.brandName}. This is in compliance with applicable laws and regulations. By creating an account, you confirm that you meet this age requirement.`
      },
    ]
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("getting-started");

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const totalFaqs = faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background" />
          <div className="container relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="gradient-brand-text">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to common questions about {COMPANY_INFO.brandName}. 
              Can't find what you're looking for? Contact our support team.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              {totalFaqs} questions across {faqCategories.length} categories
            </p>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 bg-card/50 sticky top-0 z-10 border-b border-border">
          <div className="container">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {/* Category Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-32 space-y-2">
                  <h3 className="font-semibold mb-4 text-lg">Categories</h3>
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <category.icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium text-sm">{category.title}</p>
                        <p className="text-xs opacity-70">{category.faqs.length} questions</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Accordions */}
              <div className="lg:col-span-3">
                {searchQuery ? (
                  // Search Results
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      Search Results for "{searchQuery}"
                    </h2>
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <div key={category.id} className="mb-8">
                          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <category.icon className="h-5 w-5 text-primary" />
                            {category.title}
                          </h3>
                          <Accordion type="single" collapsible className="space-y-4">
                            {category.faqs.map((faq, index) => (
                              <AccordionItem
                                key={index}
                                value={`${category.id}-${index}`}
                                className="border border-border rounded-lg px-6 bg-card"
                              >
                                <AccordionTrigger className="text-left hover:no-underline py-4">
                                  <span className="font-medium">{faq.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                                  {faq.answer}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-8 text-center">
                          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="font-semibold text-lg mb-2">No results found</h3>
                          <p className="text-muted-foreground mb-4">
                            We couldn't find any questions matching "{searchQuery}"
                          </p>
                          <Button onClick={() => setSearchQuery("")} variant="outline">
                            Clear Search
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  // Category View
                  faqCategories
                    .filter((cat) => cat.id === activeCategory)
                    .map((category) => (
                      <div key={category.id}>
                        <div className="mb-8">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <category.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold">{category.title}</h2>
                              <p className="text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                        </div>

                        <Accordion type="single" collapsible className="space-y-4">
                          {category.faqs.map((faq, index) => (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                              className="border border-border rounded-lg px-6 bg-card"
                            >
                              <AccordionTrigger className="text-left hover:no-underline py-4">
                                <span className="font-medium pr-4">{faq.question}</span>
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed whitespace-pre-line">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section className="py-16 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Tips for New Players</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get started with these essential tips for fantasy cricket success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Zap, title: "Wait for Toss", description: "Finalize your team after the toss to ensure all players are in the playing XI" },
                { icon: Crown, title: "Captain Wisely", description: "Your captain earns 2x points - choose a player in great form" },
                { icon: BarChart3, title: "Check Stats", description: "Review player statistics and recent form before selecting" },
                { icon: Star, title: "Balance Team", description: "Mix star players with value picks to maximize your budget" },
              ].map((tip, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <tip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container text-center">
            <MessageSquare className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help. 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-brand">
                <Link href="/contact">
                  Contact Support
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
