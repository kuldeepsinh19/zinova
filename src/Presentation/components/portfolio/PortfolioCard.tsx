"use client";

import Image from "next/image";

interface PortfolioCardProps {
  id: string;
  title: string;
  category: string;
  categoryDisplayName: string;
  imageUrl: string;
  onClick: () => void;
}

export default function PortfolioCard({
  title,
  category,
  categoryDisplayName,
  imageUrl,
  onClick,
}: PortfolioCardProps) {
  // Category color mapping
  const categoryColors: Record<string, string> = {
    skincare: "bg-pink-100 text-pink-700",
    food: "bg-orange-100 text-orange-700",
    fashion: "bg-purple-100 text-purple-700",
    general: "bg-blue-100 text-blue-700",
  };

  const badgeColor = categoryColors[category] || "bg-gray-100 text-gray-700";

  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Title and category on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}
          >
            {categoryDisplayName}
          </span>
        </div>
      </div>

      {/* Category badge (always visible) */}
      <div className="absolute top-3 right-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium shadow-md ${badgeColor} group-hover:opacity-0 transition-opacity duration-300`}
        >
          {categoryDisplayName}
        </span>
      </div>
    </div>
  );
}
