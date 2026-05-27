import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dee-backend-7x0g.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin();
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Could not connect to the authentication server.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-500/20 mb-6 p-4 border border-white/20">
            <img src={logo} alt="Digital Engineering Enterprises" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Digital Engineering Enterprises</h1>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em] opacity-70">Enterprise Resource Planning</p>
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

            <button
              type="button"
              onClick={() => {
                localStorage.setItem('token', 'dev-token');
                localStorage.setItem('user', JSON.stringify({ name: 'Dev Admin', email: 'dev@company.com', role: 'Admin' }));
                onLogin();
              }}
              className="w-full py-3 bg-white/5 text-blue-300 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all mt-4 text-xs uppercase tracking-widest"
            >
              Skip Login (Dev Only)
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
