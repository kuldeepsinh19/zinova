import { NextRequest, NextResponse } from "next/server";
import { createOrderSchema } from "@/src/Application/DTOs/CreateOrderDTO";
import { CreateCreditOrder } from "@/src/Application/UseCases/Credits/CreateCreditOrder";
import { RazorpayService } from "@/src/Infrastructure/Services/RazorpayService";
import { RepositoryFactory } from "@/src/Infrastructure/Persistence/RepositoryFactory";
import { SupabaseAuthService } from "@/src/Infrastructure/Services/SupabaseAuthService";

export async function POST(req: NextRequest) {
  try {
    // 1. Check Authentication using SupabaseAuthService
    // We can instantiate SupabaseAuthService directly or via Factory if we had one for services.
    // Since it's infra service, newing it up is fine or we should consider dependency injection container in bigger apps.
    // For now, let's just use it lightly or rely on headers if we implemented middleware properly.
    // But to be safe and get user ID reliable:

    // Just for auth check example, assuming middleware might not block completely or we want double check.
    // In Phase 1 we set cookies.
    // Let's use SupabaseAuthService to get user.

    const authService = new SupabaseAuthService();
    const user = await authService.getUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse User Input
    const body = await req.json();
    const validation = createOrderSchema.safeParse({
      ...body,
      userId: user.id,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.message },
        { status: 400 },
      );
    }

    // 3. Instantiate Dependencies
    const transactionRepo = RepositoryFactory.getTransactionRepository();
    const razorpayService = new RazorpayService();

    // 4. Execute Use Case
    const useCase = new CreateCreditOrder(transactionRepo, razorpayService);
    const result = await useCase.execute(validation.data);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
