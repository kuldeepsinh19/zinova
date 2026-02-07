import Link from "next/link";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";

// Style Gallery Data - Before/After transformations
const styleGallery = [
  {
    id: "cinematic-product",
    name: "Cinematic Product",
    before: "/styles/before-shoe.jpg",
    after: "/styles/after-shoe.jpg",
    category: "Fashion",
  },
  {
    id: "studio-beauty",
    name: "Studio Beauty",
    before: "/styles/before-skincare.jpg",
    after: "/styles/after-skincare.jpg",
    category: "Skincare",
  },
  {
    id: "food-styling",
    name: "Food Styling",
    before: "/styles/before-food.jpg",
    after: "/styles/after-food.jpg",
    category: "Food",
  },
  {
    id: "lifestyle-shot",
    name: "Lifestyle Shot",
    before: "/styles/before-lifestyle.jpg",
    after: "/styles/after-lifestyle.jpg",
    category: "Lifestyle",
  },
];

// Portfolio showcase data
const portfolioShowcase = [
  {
    id: 1,
    title: "Skincare Campaign",
    category: "Skincare",
    image: "/portfolio/skincare-1.jpg",
  },
  {
    id: 2,
    title: "Food Photography",
    category: "Food",
    image: "/portfolio/food-1.jpg",
  },
  {
    id: 3,
    title: "Fashion Product",
    category: "Fashion",
    image: "/portfolio/fashion-1.jpg",
  },
  {
    id: 4,
    title: "Jewelry Shot",
    category: "Jewelry",
    image: "/portfolio/jewelry-1.jpg",
  },
  {
    id: 5,
    title: "Watch Campaign",
    category: "Lifestyle",
    image: "/portfolio/watch-1.jpg",
  },
  {
    id: 6,
    title: "Footwear Ad",
    category: "Fashion",
    image: "/portfolio/footwear-1.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Product Photos with{" "}
                <span className="text-blue-200">AI Magic</span>
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Create stunning, studio-quality marketing visuals in seconds. No
                designer needed. Starting at just ₹20.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/ai-studio"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
                >
                  <span className="mr-2">✨</span>
                  Try It Free
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg"
                >
                  View Portfolio
                </Link>
              </div>
              <p className="mt-6 text-blue-200 text-sm">
                🎁 Get 20 free credits when you sign up
              </p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 50L48 45.7C96 41.3 192 32.7 288 30.8C384 29 480 34 576 41.3C672 48.7 768 58.3 864 56.5C960 54.7 1056 41.3 1152 36.8C1248 32.3 1344 36.7 1392 38.8L1440 41V101H1392C1344 101 1248 101 1152 101C1056 101 960 101 864 101C768 101 672 101 576 101C480 101 384 101 288 101C192 101 96 101 48 101H0V50Z"
                fill="#F9FAFB"
              />
            </svg>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transform your product photos in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Choose a Style",
                  description:
                    "Browse our curated AI styles and pick one that matches your brand",
                  icon: "🎨",
                },
                {
                  step: "2",
                  title: "Upload Your Photo",
                  description:
                    "Drop your product image - we support JPG and PNG up to 5MB",
                  icon: "📸",
                },
                {
                  step: "3",
                  title: "Download & Use",
                  description:
                    "Get your transformed image in seconds, ready for marketing",
                  icon: "⚡",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Style Gallery Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                AI Style Gallery
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See the magic in action. Hover to preview the transformation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {styleGallery.map((style) => (
                <div
                  key={style.id}
                  className="group relative bg-gray-100 rounded-2xl overflow-hidden aspect-square cursor-pointer"
                >
                  {/* Before image (default) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Before</span>
                  </div>

                  {/* After image (on hover) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm">After</span>
                  </div>

                  {/* Style info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <span className="text-xs text-blue-300 font-medium">
                      {style.category}
                    </span>
                    <h3 className="text-white font-semibold">{style.name}</h3>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors" />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/ai-studio"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow"
              >
                Try These Styles Free →
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Showcase */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Portfolio
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real AI-generated marketing visuals for real businesses
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioShowcase.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gray-100 rounded-2xl overflow-hidden aspect-[4/5] hover:shadow-xl transition-all"
                >
                  {/* Placeholder - will be replaced with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400">{item.category}</span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-xs text-blue-300 font-medium">
                        {item.category}
                      </span>
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                View Full Portfolio →
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Teaser */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Affordable Pricing
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              No subscriptions. No hidden fees. Pay only for what you use.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold">20</div>
                <div className="text-blue-200 text-sm">Free Credits</div>
                <div className="text-xs text-blue-300 mt-2">on signup</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 ring-2 ring-white/30">
                <div className="text-4xl font-bold">₹20</div>
                <div className="text-blue-200 text-sm">Per Image</div>
                <div className="text-xs text-blue-300 mt-2">
                  20 credits = 1 image
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold">₹500</div>
                <div className="text-blue-200 text-sm">Custom Projects</div>
                <div className="text-xs text-blue-300 mt-2">starting price</div>
              </div>
            </div>

            <Link
              href="/pricing"
              className="inline-flex items-center justify-center mt-10 px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all"
            >
              View All Pricing →
            </Link>
          </div>
        </section>

        {/* Business CTA */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Need Custom Marketing Content?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Get personalized AI-generated campaigns, social media content,
                and brand visuals. Starting at just ₹500.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Contact Us for Custom Work →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
