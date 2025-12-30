import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY_INFO } from "@shared/types";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="gradient-brand-text">Policy</span>
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
                <h2>1. Introduction</h2>
                <p>
                  {COMPANY_INFO.companyName} ("we", "our", or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our free-to-play fantasy cricket platform {COMPANY_INFO.brandName}.
                </p>

                <h2>2. Information We Collect</h2>
                <h3>Personal Information</h3>
                <ul>
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Profile information you choose to provide</li>
                </ul>

                <h3>Usage Information</h3>
                <ul>
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on the platform</li>
                  <li>Contest participation and gaming history</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information to:</p>
                <ul>
                  <li>Create and manage your account</li>
                  <li>Provide and improve our services</li>
                  <li>Track your contest participation and points</li>
                  <li>Provide customer support</li>
                  <li>Send service-related communications</li>
                  <li>Improve our platform and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>4. Information Sharing</h2>
                <p>We may share your information with:</p>
                <ul>
                  <li>Service providers who assist in our operations</li>
                  <li>Law enforcement when required by law</li>
                  <li>Analytics providers to help us improve our services</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties for marketing purposes.
                </p>

                <h2>5. Data Security</h2>
                <p>
                  We implement industry-standard security measures including:
                </p>
                <ul>
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure data storage with access controls</li>
                  <li>Regular security reviews</li>
                  <li>Employee access controls and training</li>
                </ul>

                <h2>6. Data Retention</h2>
                <p>
                  We retain your personal information for as long as your account is active or as needed 
                  to provide services. We may retain certain information for legal compliance, dispute 
                  resolution, and enforcement of our agreements.
                </p>

                <h2>7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>

                <h2>8. Cookies</h2>
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and deliver personalized content. You can control cookie preferences through your 
                  browser settings.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our platform is not intended for users under 18 years of age. We do not knowingly 
                  collect information from minors. If we discover that we have collected information 
                  from a minor, we will delete it immediately.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  material changes by posting the new policy on this page and updating the "Last updated" date.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p>
                  <strong>{COMPANY_INFO.companyName}</strong><br />
                  {COMPANY_INFO.address}<br />
                  Email: privacy@{COMPANY_INFO.domain}
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
