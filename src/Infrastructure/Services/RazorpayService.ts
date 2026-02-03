import Razorpay from "razorpay";
import crypto from "crypto";
import { IPaymentGateway } from "../../Domain/Interfaces/IPaymentGateway";

export class RazorpayService implements IPaymentGateway {
  private razorpay: Razorpay;
  private keySecret: string;

  constructor() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.warn(
        "⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Payment features will not work.",
      );
      // Initialize with dummies to prevent crash during build/dev if keys missing,
      // but methods will fail if called.
      this.keySecret = "dummy_secret";
      this.razorpay = new Razorpay({
        key_id: "dummy_id",
        key_secret: "dummy_secret",
      });
    } else {
      this.keySecret = keySecret;
      this.razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    }
  }

  async createOrder(
    amount: number,
    currency: string,
    receiptId: string,
  ): Promise<string> {
    if (this.keySecret === "dummy_secret") {
      throw new Error("Razorpay is not configured");
    }

    try {
      const options = {
        amount: amount, // Amount in smallest currency unit
        currency: currency,
        receipt: receiptId,
      };

      const order = await this.razorpay.orders.create(options);
      return order.id;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw new Error("Failed to create payment order");
    }
  }

  verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string,
  ): boolean {
    if (this.keySecret === "dummy_secret") {
      throw new Error("Razorpay is not configured");
    }

    const generatedSignature = crypto
      .createHmac("sha256", this.keySecret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    return generatedSignature === signature;
  }
}
