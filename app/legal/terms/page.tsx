import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Zinnova",
  description:
    "Read the terms and conditions for using Zinnova's AI-powered image generation services.",
};

export default function TermsPage() {
  const lastUpdated = "February 7, 2026";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 prose prose-gray max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Zinnova ("the Service"), you accept and
                agree to be bound by these Terms and Conditions. If you do not
                agree to these terms, please do not use our Service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Zinnova provides AI-powered image generation and transformation
                services. Users can upload product images and receive
                AI-generated marketing visuals based on pre-defined styles.
              </p>

              <h2>3. User Accounts</h2>
              <ul>
                <li>You must be at least 18 years old to create an account.</li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account credentials.
                </li>
                <li>
                  You agree to provide accurate and complete information during
                  registration.
                </li>
                <li>
                  One account per person. Multiple accounts may be suspended.
                </li>
              </ul>

              <h2>4. Credits System</h2>
              <ul>
                <li>
                  Credits are the virtual currency used to access our AI
                  services.
                </li>
                <li>1 Credit = ₹1 (Indian Rupee).</li>
                <li>New users receive 20 free credits upon registration.</li>
                <li>
                  Credits can be purchased in packages: 20, 60, 100, or 200+
                  credits.
                </li>
                <li>Credits are non-transferable between accounts.</li>
                <li>
                  Credits do not expire as long as your account remains active.
                </li>
              </ul>

              <h2>5. Payment Terms</h2>
              <ul>
                <li>All payments are processed securely through Razorpay.</li>
                <li>Prices are displayed in Indian Rupees (₹ INR).</li>
                <li>
                  Payment is required before credits are added to your account.
                </li>
                <li>
                  We accept UPI, Credit Cards, Debit Cards, Net Banking, and
                  Wallets.
                </li>
              </ul>

              <h2>6. Acceptable Use</h2>
              <p>You agree NOT to:</p>
              <ul>
                <li>Upload illegal, harmful, or offensive content.</li>
                <li>Upload images you do not have rights to use.</li>
                <li>
                  Use the Service to generate content that infringes on
                  intellectual property rights.
                </li>
                <li>Attempt to reverse-engineer or exploit our AI systems.</li>
                <li>
                  Abuse the free credits system by creating multiple accounts.
                </li>
              </ul>

              <h2>7. Intellectual Property</h2>
              <ul>
                <li>You retain ownership of images you upload.</li>
                <li>
                  AI-generated output images are licensed to you for commercial
                  use.
                </li>
                <li>
                  Zinnova retains ownership of the AI models, prompts, and
                  styles.
                </li>
                <li>
                  We may use anonymized, non-identifiable data to improve our
                  services.
                </li>
              </ul>

              <h2>8. Limitation of Liability</h2>
              <p>
                Zinnova is provided "as is" without warranties of any kind. We
                are not liable for:
              </p>
              <ul>
                <li>AI-generated output quality or accuracy.</li>
                <li>
                  Any business losses resulting from use of generated images.
                </li>
                <li>Service interruptions or technical issues.</li>
                <li>Third-party actions related to your use of our Service.</li>
              </ul>

              <h2>9. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account if you
                violate these Terms. Upon termination, unused credits may be
                forfeited.
              </p>

              <h2>10. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. Continued use of
                the Service after changes constitutes acceptance of the new
                Terms.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes
                shall be resolved in the courts of Mumbai, Maharashtra.
              </p>

              <h2>12. Contact Us</h2>
              <p>For questions about these Terms, please contact us at:</p>
              <ul>
                <li>
                  Email: <a href="mailto:legal@zinnova.ai">legal@zinnova.ai</a>
                </li>
                <li>Address: Zinnova AI, Mumbai, Maharashtra, India</li>
              </ul>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/legal/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Privacy Policy →
              </Link>
              <Link
                href="/legal/refund"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Refund Policy →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
