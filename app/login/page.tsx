import LoginForm from "@/src/Presentation/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sign in to <span className="text-blue-600">Ceratlyin</span>
          </h1>
          <p className="text-gray-600">
            Access your AI-powered marketing tools
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
