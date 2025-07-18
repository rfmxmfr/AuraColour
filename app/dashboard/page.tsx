"use client";

import { AuthGuard } from "../components/auth/AuthGuard";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || user?.email}</h2>
              <p className="text-gray-600">
                This is your personal dashboard where you can manage your AuraColor services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">Your Services</h3>
                <p className="text-gray-600">View and manage your booked services.</p>
                <button className="mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                  View Services
                </button>
              </div>

              <div className="bg-white/50 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-2">Your Results</h3>
                <p className="text-gray-600">Access your color analysis results.</p>
                <button className="mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                  View Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}