"use client";

import {
  CreditPackage,
  CREDIT_PACKAGES,
} from "@/src/Domain/ValueObjects/CreditPackage";
import { useState } from "react";

interface CreditPackagesProps {
  onSelect: (pkg: CreditPackage) => void;
  isLoading: boolean;
}

export default function CreditPackages({
  onSelect,
  isLoading,
}: CreditPackagesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {CREDIT_PACKAGES.map((pkg) => (
        <div
          key={pkg.id}
          className={`relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer ${
            pkg.popular ? "ring-2 ring-primary" : ""
          } ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
          onClick={() => onSelect(pkg)}
        >
          {pkg.popular && (
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULAR
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {pkg.name}
          </h3>

          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ₹{pkg.price}
            </span>
            <span className="text-gray-500 ml-2">/ pack</span>
          </div>

          <div className="mb-6">
            <span className="text-2xl font-bold text-primary">
              {pkg.credits}
            </span>
            <span className="text-gray-600 ml-1">Credits</span>
          </div>

          <p className="text-sm text-gray-500 mb-6">{pkg.description}</p>

          <button
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              pkg.popular
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      ))}
    </div>
  );
}
