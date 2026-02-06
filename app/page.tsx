export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to <span className="text-blue-600">Zinnova</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-Powered Marketing for Indian Startups
        </p>

        {/* Auth Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <a
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Get Started - 20 Free Credits
          </a>
          <a
            href="/login"
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Sign In
          </a>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            ✅ Project Setup Complete!
          </h2>
          <div className="text-left space-y-2 text-gray-700">
            <p>✅ Next.js 14 with TypeScript</p>
            <p>✅ Clean Architecture structure</p>
            <p>✅ Database connected (Supabase PostgreSQL)</p>
            <p>
              ✅ 5 tables created (users, transactions, image_generations,
              business_inquiries, portfolio_items)
            </p>
            <p>✅ Database seeded with 6 portfolio items</p>
            <p>✅ Repository Pattern for database abstraction</p>
            <p>✅ Prisma ORM configured</p>
            <p>
              ✅ <strong>Authentication System Live!</strong>
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">
              📊 Database Status
            </h3>
            <p className="text-sm text-gray-600">
              Connected to Supabase PostgreSQL
              <br />6 portfolio items • Authentication ready
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">
              ⚠️ Gemini API Key
            </h3>
            <p className="text-sm text-gray-600">
              Add GEMINI_API_KEY to .env.local when ready to test AI features
            </p>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Your database is completely swappable!</p>
          <p>See DATABASE-SWAP-EXAMPLE.md for details</p>
        </div>
      </div>
    </main>
  );
}
