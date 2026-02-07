"use client";

import { useEffect, useState } from "react";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";
import CategoryFilter from "@/src/Presentation/components/portfolio/CategoryFilter";
import PortfolioGrid from "@/src/Presentation/components/portfolio/PortfolioGrid";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryDisplayName: string;
  imageUrl: string;
  description: string | null;
}

export default function PortfolioPage() {
  const [allItems, setAllItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch portfolio items
  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const response = await fetch("/api/portfolio");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch portfolio");
        }

        setAllItems(data.data);
        setFilteredItems(data.data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.data.map((item: PortfolioItem) => item.category)),
        );
        setCategories(uniqueCategories as string[]);
      } catch (err) {
        console.error("Portfolio fetch error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load portfolio",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, []);

  // Filter items when category changes
  useEffect(() => {
    if (activeCategory === null) {
      setFilteredItems(allItems);
    } else {
      setFilteredItems(
        allItems.filter((item) => item.category === activeCategory),
      );
    }
  }, [activeCategory, allItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading portfolio...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold mb-2">
                Error Loading Portfolio
              </h3>
              <p className="text-gray-700">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Portfolio
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our AI-generated marketing content across different
              industries. Professional quality at a fraction of traditional
              costs.
            </p>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Portfolio Grid */}
          <PortfolioGrid items={filteredItems} />

          {/* CTA Section */}
          <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 mb-6">
              Get professional AI-generated marketing content for your business
              starting at just ₹500 per graphic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/ai-studio"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
              >
                Try AI Studio Free
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
