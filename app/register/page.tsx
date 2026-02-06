import RegisterForm from "@/src/Presentation/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join <span className="text-blue-600">Zinnova</span>
          </h1>
          <p className="text-gray-600">
            AI-powered marketing for Indian startups
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
