import { NextRequest, NextResponse } from "next/server";
import { GetPortfolioItemsByCategory } from "@application/UseCases/Portfolio/GetPortfolioItemsByCategory";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";
import { PortfolioCategory } from "@domain/Entities/PortfolioItem";

/**
 * GET /api/portfolio/[category]
 *
 * Fetch portfolio items by category.
 * No authentication required - public endpoint.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } },
) {
  try {
    const { category } = params;

    // Validate category
    const validCategories = Object.values(PortfolioCategory);
    if (!validCategories.includes(category as PortfolioCategory)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Get repository
    const portfolioRepository = RepositoryFactory.getPortfolioRepository();

    // Execute use case
    const useCase = new GetPortfolioItemsByCategory(portfolioRepository);
    const items = await useCase.execute(category as PortfolioCategory);

    // Return success response
    return NextResponse.json({
      success: true,
      data: items,
      category,
    });
  } catch (error) {
    console.error("Get portfolio items by category error:", error);

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
