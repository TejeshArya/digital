import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl shadow-blue-500/50 mb-6">
            <span className="text-white font-bold text-3xl">ERP</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Enterprise Resource Planning</h1>
          <p className="text-blue-200">Sign in to access your dashboard</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 text-blue-600 focus:ring-blue-500 mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-300 hover:text-blue-200 font-semibold transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-blue-200 mt-6">
            Demo credentials: admin@company.com / admin123
          </p>
        </div>

        <p className="text-center text-sm text-blue-300 mt-6">
          © 2026 Enterprise ERP. All rights reserved.
        </p>
      </div>
    </div>
  );
}
