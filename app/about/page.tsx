import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us | Zinnova - AI-Powered Marketing",
  description:
    "Learn about Zinnova, India's most affordable AI-powered marketing platform for startups and small businesses.",
};

export default function AboutPage() {
  const values = [
    {
      icon: "🎯",
      title: "Democratize Quality",
      description:
        "Every small business deserves professional marketing visuals, not just those with big budgets.",
    },
    {
      icon: "⚡",
      title: "Instant Results",
      description:
        "No more waiting days for designers. Get studio-quality images in seconds.",
    },
    {
      icon: "💰",
      title: "Lowest Cost",
      description:
        "We believe in fair pricing. Pay only for what you use, starting at just ₹20.",
    },
    {
      icon: "🇮🇳",
      title: "Made for India",
      description:
        "Built specifically for Indian startups, with INR pricing and local market understanding.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Images Generated" },
    { value: "500+", label: "Happy Customers" },
    { value: "₹20", label: "Starting Price" },
    { value: "< 3s", label: "Generation Time" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center animate-fadeIn">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="text-blue-200">Zinnova</span>
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to make professional marketing accessible to
                every Indian startup, regardless of budget.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Zinnova was born from a simple observation: small businesses
                    in India struggle to create professional marketing visuals.
                    Hiring photographers costs ₹5,000-₹50,000 per shoot. Graphic
                    designers charge ₹500-₹5,000 per image. For a startup
                    selling ₹200 products, these costs are prohibitive.
                  </p>
                  <p>
                    We asked ourselves: what if AI could democratize access to
                    premium marketing? What if a chai seller in Jaipur could
                    have the same quality product photos as a funded D2C brand?
                  </p>
                  <p>
                    Today, Zinnova makes this possible. Our AI transforms
                    ordinary product photos into stunning marketing visuals in
                    seconds, at a fraction of the traditional cost.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="text-3xl font-bold text-blue-600">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we build at Zinnova.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of Indian startups already using Zinnova to create
              stunning product visuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Free - 20 Credits
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
