"use client";

import React, { useState } from "react";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import CreditPackages from "@/src/Presentation/components/credits/CreditPackages";
import PaymentModal from "@/src/Presentation/components/credits/PaymentModal";
import { CreditPackage } from "@/src/Domain/ValueObjects/CreditPackage";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CreditsPage() {
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSelectPackage = async (pkg: CreditPackage) => {
    setLoading(true);
    setShowPaymentModal(true);

    try {
      // 1. Create Order
      const response = await fetch("/api/credits/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const { orderId, amount, currency, keyId } = await response.json();

      // 2. Open Razorpay
      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Ceratlyin AI",
        description: `Credits Purchase - ${pkg.name} Pack`,
        order_id: orderId,
        handler: async function (response: any) {
          setShowPaymentModal(true); // Keep modal for verification step
          // 3. Verify Payment
          try {
            const verifyRes = await fetch("/api/credits/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) throw new Error("Payment verification failed");

            alert("Payment Successful! Credits added.");
            window.location.reload(); // Refresh to update credits
          } catch (err) {
            alert("Payment verification failed. Please contact support.");
            console.error(err);
          } finally {
            setLoading(false);
            setShowPaymentModal(false);
          }
        },
        prefill: {
          // We could prefill user details here if we had them in context
        },
        theme: {
          color: "#0F172A",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setShowPaymentModal(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Failed to initiate purchase. Please try again.");
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Purchase Credits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get comprehensive credit packages to generate stunning AI images.
            More credits, more creativity.
          </p>
        </div>

        <CreditPackages onSelect={handleSelectPackage} isLoading={loading} />

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
        />
      </main>
    </div>
  );
}
