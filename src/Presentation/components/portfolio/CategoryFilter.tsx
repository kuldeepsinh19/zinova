"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categoryDisplayNames: Record<string, string> = {
    skincare: "Skincare",
    food: "Food & Beverage",
    fashion: "Fashion",
    general: "General",
  };

  const categoryColors: Record<string, string> = {
    skincare: "bg-pink-600 hover:bg-pink-700",
    food: "bg-orange-600 hover:bg-orange-700",
    fashion: "bg-purple-600 hover:bg-purple-700",
    general: "bg-blue-600 hover:bg-blue-700",
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {/* All button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
          activeCategory === null
            ? "bg-gray-900 text-white shadow-lg scale-105"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((category) => {
        const displayName = categoryDisplayNames[category] || category;
        const colorClass =
          categoryColors[category] || "bg-gray-600 hover:bg-gray-700";
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              isActive
                ? `${colorClass.split(" ")[0]} text-white shadow-lg scale-105`
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {displayName}
          </button>
        );
      })}
    </div>
  );
}
