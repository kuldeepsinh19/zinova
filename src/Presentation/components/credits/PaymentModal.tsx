"use client";

import { useEffect } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  // Add Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen) return null;

  // This component usually handles logic but Razorpay modal is external.
  // We keep it simple or use it for custom overlay if needed.
  // Actually, Razorpay opens its own iframe/popup.
  // We might just need a loading overlay while it initializes.

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900">
          Initializing Payment...
        </h3>
        <p className="text-gray-500 mt-2">
          Please wait while we connect to secure gateway.
        </p>
      </div>
    </div>
  );
}
