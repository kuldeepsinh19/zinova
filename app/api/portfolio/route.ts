import { NextResponse } from "next/server";
import { GetPortfolioItems } from "@application/UseCases/Portfolio/GetPortfolioItems";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";

/**
 * GET /api/portfolio
 *
 * Fetch all active portfolio items.
 * No authentication required - public endpoint.
 */
export async function GET() {
  try {
    // Get repository
    const portfolioRepository = RepositoryFactory.getPortfolioRepository();

    // Execute use case
    const useCase = new GetPortfolioItems(portfolioRepository);
    const items = await useCase.execute();

    // Return success response
    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Get portfolio items error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch portfolio items",
      },
      { status: 500 },
    );
  }
}
  