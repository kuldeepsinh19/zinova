import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";

export const metadata: Metadata = {
  title: "Pricing | Zinnova - AI Marketing at ₹20 per image",
  description:
    "Simple, transparent pricing. Get 20 free credits on signup. Create stunning marketing visuals starting at just ₹20.",
};

const creditPackages = [
  { credits: 20, price: 20, perCredit: 1, popular: false, savings: null },
  {
    credits: 60,
    price: 50,
    perCredit: 0.83,
    popular: true,
    savings: "17% off",
  },
  {
    credits: 100,
    price: 80,
    perCredit: 0.8,
    popular: false,
    savings: "20% off",
  },
  {
    credits: 200,
    price: 150,
    perCredit: 0.75,
    popular: false,
    savings: "25% off",
  },
];

const faqs = [
  {
    q: "What can I do with 20 credit?",
    a: "20 credits = 1 AI image generation. Upload your product photo, select a style, and get a transformed marketing-ready image.",
  },
  {
    q: "Do credits expire?",
    a: "No! Your credits never expire as long as your account is active. Use them whenever you need.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "If the AI generation fails, your credit is automatically refunded. For quality concerns, we recommend trying a different style.",
  },
  {
    q: "Can I get a refund?",
    a: "Unused credit packages can be refunded within 7 days of purchase. See our refund policy for details.",
  },
  {
    q: "What's included in custom projects?",
    a: "Custom projects (₹500+) include personalized AI styling, 6-7 variations, and direct support until you're satisfied.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              No subscriptions. No hidden fees. Pay only for what you use.
            </p>
          </div>
        </section>

        {/* Free Credits Banner */}
        <section className="py-8 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">🎁</span>
              <div>
                <span className="text-green-800 font-semibold text-lg">
                  Get 20 FREE Credits
                </span>
                <span className="text-green-600 ml-2">
                  when you sign up — no card required
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Credit Packages */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Credit Packages
              </h2>
              <p className="text-gray-600"> 
                20 Credits = 1 AI Image Generation • ₹1 = 1 Credit
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {creditPackages.map((pkg) => (
                <div
                  key={pkg.credits}
                  className={`relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all ${
                    pkg.popular ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {pkg.credits}
                    </div>
                    <div className="text-gray-500 text-sm mb-4">Credits</div>

                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ₹{pkg.price}
                    </div>
                    {pkg.savings && (
                      <div className="text-green-600 text-sm font-medium mb-4">
                        {pkg.savings}
                      </div>
                    )}
                    {!pkg.savings && (
                      <div className="text-gray-400 text-sm mb-4">
                        Base price
                      </div>
                    )}

                    <Link
                      href="/credits"
                      className={`block w-full py-3 rounded-xl font-semibold transition-all ${
                        pkg.popular
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What You Get
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "⚡",
                  title: "Instant Generation",
                  desc: "Get your transformed image in seconds",
                },
                {
                  icon: "🎨",
                  title: "Multiple Styles",
                  desc: "Choose from curated AI styles for every industry",
                },
                {
                  icon: "📱",
                  title: "High Resolution",
                  desc: "Download in full quality, ready for marketing",
                },
                {
                  icon: "🔄",
                  title: "Unlimited Attempts",
                  desc: "Try different styles until you find the perfect one",
                },
                {
                  icon: "💾",
                  title: "No Expiry",
                  desc: "Your credits never expire - use them anytime",
                },
                {
                  icon: "🛡️",
                  title: "Safe Refunds",
                  desc: "Failed generations are automatically refunded",
                },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Projects */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Custom Work?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get personalized AI-generated marketing campaigns with unlimited
              revisions. Perfect for brand launches, seasonal campaigns, and
              product shoots.
            </p>

            <div className="inline-flex items-center gap-4 bg-white/10 rounded-2xl px-6 py-4 mb-8">
              <span className="text-4xl font-bold">₹500</span>
              <span className="text-left text-gray-300">
                <span className="block text-white font-medium">
                  Starting Price
                </span>
                <span className="text-sm">6-7 variations included</span>
              </span>
            </div>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Get a Custom Quote →
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Compare & Save
              </h2>
              <p className="text-gray-600">
                See how much you save with Zinnova AI
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Service
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                      Price per Image
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-gray-600">
                      Professional Photographer
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      ₹2,000 - ₹5,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-600">
                      Freelance Designer (Fiverr)
                    </td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      ₹500 - ₹2,000
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-600">Design Agency</td>
                    <td className="px-6 py-4 text-right text-gray-900">
                      ₹1,000 - ₹5,000
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 font-semibold text-blue-600">
                      ✨ Zinnova AI
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600">
                      ₹20
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-blue-100 mb-8">
              Start with 20 free credits. No credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg"
            >
              Get Started Free →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
