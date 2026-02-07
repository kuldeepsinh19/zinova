import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Zinnova",
  description:
    "How Zinnova collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600">Last updated: February 7, 2026</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 prose prose-gray max-w-none">
              <h2>1. Introduction</h2>
              <p>
                Zinnova respects your privacy and is committed to protecting
                your personal data.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>Account Information</h3>
              <ul>
                <li>Name, Email, Password (encrypted)</li>
              </ul>
              <h3>Payment Information</h3>
              <ul>
                <li>Processed by Razorpay. We do NOT store card details.</li>
              </ul>
              <h3>Usage Data</h3>
              <ul>
                <li>
                  Images uploaded, AI output, style selections, credit history
                </li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <ul>
                <li>Service Delivery: Process images and generate AI output</li>
                <li>Account Management: Manage credits and transactions</li>
                <li>Communications: Send transactional emails</li>
                <li>Improvement: Improve AI using anonymized data</li>
              </ul>

              <h2>4. Data Storage & Security</h2>
              <ul>
                <li>Data stored on Supabase and Vercel (encrypted)</li>
                <li>Passwords are hashed, never stored in plain text</li>
              </ul>

              <h2>5. Data Sharing</h2>
              <p>
                We do NOT sell your data. We share only with: Razorpay, Google
                (Gemini API), hosting providers, and when legally required.
              </p>

              <h2>6. Your Rights</h2>
              <p>
                Access, Correct, Delete, or Export your data. Contact:
                privacy@zinnova.ai
              </p>

              <h2>7. Contact Us</h2>
              <p>
                Email:{" "}
                <a href="mailto:privacy@zinnova.ai">privacy@zinnova.ai</a>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/legal/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Terms & Conditions
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
