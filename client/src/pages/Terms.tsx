import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY_INFO } from "@shared/types";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms & <span className="gradient-brand-text">Conditions</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 2024
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 prose prose-invert max-w-none">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using {COMPANY_INFO.brandName} (the "Platform"), operated by {COMPANY_INFO.companyName}, 
                  you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, 
                  please do not use our Platform.
                </p>

                <h2>2. Eligibility</h2>
                <p>To use our Platform, you must:</p>
                <ul>
                  <li>Be at least 18 years of age</li>
                  <li>Be a resident of India (excluding Assam, Odisha, Telangana, Andhra Pradesh, Sikkim, and Nagaland where paid contests are not available)</li>
                  <li>Have the legal capacity to enter into a binding agreement</li>
                  <li>Not be an employee or immediate family member of an employee of {COMPANY_INFO.companyName}</li>
                </ul>

                <h2>3. Account Registration</h2>
                <p>
                  Users must provide accurate, current, and complete information during registration. 
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account.
                </p>

                <h2>4. Game of Skill</h2>
                <p>
                  Fantasy cricket as offered on our Platform is a game of skill. Success depends on 
                  the user's knowledge, judgment, and attention to the game of cricket. The outcome 
                  is not determined by chance but by the skill of the participant.
                </p>

                <h2>5. Contest Rules</h2>
                <p>
                  Each contest has specific rules regarding team selection, entry fees, prize distribution, 
                  and deadlines. Users must read and understand these rules before participating. 
                  Once a contest begins, entries cannot be modified or withdrawn.
                </p>

                <h2>6. Payments and Withdrawals</h2>
                <p>
                  All payments are processed through secure payment gateways. Withdrawals are subject to 
                  verification and may take 24-48 hours to process. We reserve the right to withhold 
                  winnings if any fraudulent activity is detected.
                </p>

                <h2>7. Prohibited Activities</h2>
                <p>Users are prohibited from:</p>
                <ul>
                  <li>Creating multiple accounts</li>
                  <li>Using automated systems or bots</li>
                  <li>Colluding with other users</li>
                  <li>Exploiting bugs or vulnerabilities</li>
                  <li>Engaging in any form of match-fixing or insider trading</li>
                </ul>

                <h2>8. Intellectual Property</h2>
                <p>
                  All content on the Platform, including logos, designs, text, and graphics, is the 
                  property of {COMPANY_INFO.companyName} and is protected by intellectual property laws. 
                  Users may not reproduce, distribute, or create derivative works without permission.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                  {COMPANY_INFO.companyName} shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising from your use of the Platform. Our total 
                  liability shall not exceed the amount paid by you in the preceding 12 months.
                </p>

                <h2>10. Dispute Resolution</h2>
                <p>
                  Any disputes arising from these terms shall be resolved through arbitration in 
                  New Delhi, India, in accordance with the Arbitration and Conciliation Act, 1996.
                </p>

                <h2>11. Modifications</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the Platform 
                  after changes constitutes acceptance of the modified terms.
                </p>

                <h2>12. Contact Information</h2>
                <p>
                  For any questions regarding these Terms and Conditions, please contact us at:
                </p>
                <p>
                  <strong>{COMPANY_INFO.companyName}</strong><br />
                  {COMPANY_INFO.address}<br />
                  Email: legal@{COMPANY_INFO.domain}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
