import { NextRequest, NextResponse } from "next/server";
import { GetTransactionHistory } from "@/src/Application/UseCases/Credits/GetTransactionHistory";
import { RepositoryFactory } from "@/src/Infrastructure/Persistence/RepositoryFactory";
import { ServerSupabaseAuthService } from "@/src/Infrastructure/Services/ServerSupabaseAuthService";

export async function GET(req: NextRequest) {
  try {
    const authService = new ServerSupabaseAuthService();
    const user = await authService.getUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const transactionRepo = RepositoryFactory.getTransactionRepository();
    const useCase = new GetTransactionHistory(transactionRepo);

    const history = await useCase.execute(user.id);

    return NextResponse.json({ data: history });
  } catch (error: any) {
    console.error("History Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
