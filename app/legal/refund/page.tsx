import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Zinnova",
  description:
    "Understand our refund policy for digital credits and AI services.",
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Refund & Cancellation Policy
            </h1>
            <p className="text-gray-600">Last updated: February 7, 2026</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 prose prose-gray max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 not-prose">
                <p className="text-blue-800 font-medium">
                  💡 Important: Credits are digital goods and are generally
                  non-refundable once purchased.
                </p>
              </div>

              <h2>1. Credit Purchase Refunds</h2>
              <p>
                Since credits are digital goods consumed instantly upon
                purchase:
              </p>
              <ul>
                <li>
                  <strong>Unused Credits:</strong> Refund requests for unused
                  credits may be considered within 7 days of purchase.
                </li>
                <li>
                  <strong>Partially Used Credits:</strong> No refunds for
                  partially used credit packages.
                </li>
                <li>
                  <strong>Technical Issues:</strong> Full refund if payment was
                  charged but credits were not added (with proof).
                </li>
              </ul>

              <h2>2. AI Generation Refunds</h2>
              <ul>
                <li>
                  <strong>Failed Generations:</strong> Credits are automatically
                  refunded if AI generation fails.
                </li>
                <li>
                  <strong>Quality Issues:</strong> We do not refund for
                  subjective quality concerns as AI results vary.
                </li>
                <li>
                  <strong>Wrong Style:</strong> No refunds for selecting the
                  wrong style (preview before purchase).
                </li>
              </ul>

              <h2>3. Free Credits</h2>
              <ul>
                <li>
                  Free credits (20 credits for new users) have no cash value.
                </li>
                <li>Free credits cannot be refunded or transferred.</li>
              </ul>

              <h2>4. How to Request a Refund</h2>
              <ol>
                <li>
                  Email us at{" "}
                  <a href="mailto:support@zinnova.ai">support@zinnova.ai</a>
                </li>
                <li>
                  Include: Account email, Transaction ID, Reason for refund
                </li>
                <li>We will respond within 48 hours</li>
                <li>Approved refunds are processed within 5-7 business days</li>
              </ol>

              <h2>5. Cancellation Policy</h2>
              <ul>
                <li>
                  <strong>Account Cancellation:</strong> You may delete your
                  account at any time.
                </li>
                <li>
                  <strong>Credit Expiry:</strong> Unused credits do NOT expire
                  while your account is active.
                </li>
                <li>
                  <strong>Inactive Accounts:</strong> Accounts inactive for 12+
                  months may be deleted (with 30-day notice).
                </li>
              </ul>

              <h2>6. Exceptions</h2>
              <p>We may make exceptions for:</p>
              <ul>
                <li>Duplicate charges (with bank statement proof)</li>
                <li>Unauthorized transactions (reported within 24 hours)</li>
                <li>Service outages lasting more than 24 hours</li>
              </ul>

              <h2>7. Contact Us</h2>
              <p>For refund requests or questions:</p>
              <ul>
                <li>
                  Email:{" "}
                  <a href="mailto:support@zinnova.ai">support@zinnova.ai</a>
                </li>
                <li>WhatsApp: +91 98765 43210</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/legal/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Privacy Policy
              </Link>
              <Link
                href="/legal/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Terms & Conditions →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
