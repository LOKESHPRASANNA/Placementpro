import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { User, Lock, BookOpen, Target } from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    major: '',
    targetGoal: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#05050c] text-[#f4f4f5] font-sans relative overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-[0.09]"
        style={{ backgroundImage: "url('/images/login_bg.png')" }}
      />
      {/* Decorative Aurora Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Left Column - Graphic/Branding */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-12 relative z-10 border-r border-white/5 bg-black/20">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse-glow" />
            PlacementPro <span className="text-xs px-1.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono">AI</span>
          </h1>
        </div>

        {/* Hologram Graphic Area */}
        <div className="flex flex-col items-center justify-center my-auto relative">
          <div className="w-72 h-72 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative animate-pulse-glow">
            <span className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping opacity-25" />
            <div className="absolute w-56 h-56 rounded-full border border-purple-500/20 flex items-center justify-center">
              <Target size={48} className="text-indigo-400 animate-pulse" />
            </div>
          </div>
          
          <div className="mt-12 text-center max-w-sm">
            <h2 className="text-3xl font-extrabold text-zinc-100 leading-tight">Join the Elite</h2>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              Create an account to track your progress, build AI-optimized resumes, and conquer technical interviews.
            </p>
          </div>
        </div>

        <div className="text-zinc-600 text-xs font-mono">
          © 2026 PLACEMENTPRO AI. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="glass-panel w-full max-w-md p-10 rounded-[24px] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="mb-8 relative z-10">
            <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Create Account</h2>
            <p className="text-zinc-400 text-sm mt-1.5">Start your placement preparation journey</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl mb-6 text-xs text-center font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-900/60 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm placeholder-zinc-600 text-zinc-200"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    name="username"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-900/60 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm placeholder-zinc-600 text-zinc-200"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  name="password"
                  className="w-full pl-11 pr-4 py-3 bg-zinc-900/60 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm placeholder-zinc-600 text-zinc-200"
                  placeholder="Enter a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Major</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <BookOpen size={16} />
                  </div>
                  <input
                    type="text"
                    name="major"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-900/60 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm placeholder-zinc-600 text-zinc-200"
                    placeholder="Comp Sci"
                    value={formData.major}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Target Role</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <Target size={16} />
                  </div>
                  <input
                    type="text"
                    name="targetGoal"
                    className="w-full pl-11 pr-4 py-3 bg-zinc-900/60 border border-white/5 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm placeholder-zinc-600 text-zinc-200"
                    placeholder="SDE"
                    value={formData.targetGoal}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 mt-2 rounded-xl transition-all duration-200 flex justify-center items-center shadow-lg shadow-indigo-500/10 border border-indigo-500/20 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-8 text-center text-zinc-500 text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
