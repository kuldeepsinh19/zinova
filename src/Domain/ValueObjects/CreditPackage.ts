export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  name: string;
  description?: string;
  popular?: boolean;
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "pkg_starter",
    credits: 20,
    price: 399, // INR
    name: "Starter",
    description: "Perfect for trying out the platform",
  },
  {
    id: "pkg_standard",
    credits: 60,
    price: 999,
    name: "Standard",
    description: "Most popular for regular users",
    popular: true,
  },
  {
    id: "pkg_pro",
    credits: 100,
    price: 1499,
    name: "Pro",
    description: "Best value for professionals",
  },
  {
    id: "pkg_business",
    credits: 200,
    price: 2499,
    name: "Business",
    description: "High volume generation",
  },
];
