import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSchema } from "@/src/Application/DTOs/VerifyPaymentDTO";
import { VerifyPayment } from "@/src/Application/UseCases/Credits/VerifyPayment";
import { RazorpayService } from "@/src/Infrastructure/Services/RazorpayService";
import { RepositoryFactory } from "@/src/Infrastructure/Persistence/RepositoryFactory";
import { ServerSupabaseAuthService } from "@/src/Infrastructure/Services/ServerSupabaseAuthService";

export async function POST(req: NextRequest) {
  try {
    const authService = new ServerSupabaseAuthService();
    const user = await authService.getUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validation = verifyPaymentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.message },
        { status: 400 },
      );
    }

    const transactionRepo = RepositoryFactory.getTransactionRepository();
    const userRepo = RepositoryFactory.getUserRepository();
    const razorpayService = new RazorpayService();

    const useCase = new VerifyPayment(
      transactionRepo,
      userRepo,
      razorpayService,
    );
    const result = await useCase.execute(validation.data);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Verify Payment Error:", error);
    return NextResponse.json(
      { error: error.message || "Payment Verification Failed" },
      { status: 500 },
    );
  }
}
