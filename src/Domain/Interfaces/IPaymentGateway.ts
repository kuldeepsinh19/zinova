export interface IPaymentGateway {
  /**
   * Creates a payment order
   * @param amount Amount in smallest currency unit (e.g., paise for INR)
   * @param currency Currency code (e.g., 'INR')
   * @param receiptId Unique receipt identifier
   * @returns Order ID from the payment gateway
   */
  createOrder(
    amount: number,
    currency: string,
    receiptId: string,
  ): Promise<string>;

  /**
   * Verifies a payment signature
   * @param orderId The order ID returned by createOrder
   * @param paymentId The payment ID returned by the checkout
   * @param signature The signature to verify
   * @returns True if signature is valid, false otherwise
   */
  verifyPayment(orderId: string, paymentId: string, signature: string): boolean;
}
