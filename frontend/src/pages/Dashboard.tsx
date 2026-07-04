import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { 
  Target, 
  CheckCircle, 
  Video, 
  FileText, 
  Sparkles, 
  Compass, 
  MessageSquare,
  ChevronRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics')
      .then(res => setAnalytics(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-16 bg-white/5 border border-white/5 rounded-2xl w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-28 bg-white/5 border border-white/5 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-white/5 border border-white/5 rounded-2xl lg:col-span-2" />
          <div className="h-64 bg-white/5 border border-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Pomodoros Completed', value: analytics?.pomodorosCompleted || 0, icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Mock Interviews', value: analytics?.totalInterviews || 0, icon: Video, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { label: 'Resume Score', value: `${analytics?.resumeScore || 0}/100`, icon: FileText, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { label: 'Tasks Completed', value: `${analytics?.tasksCompleted || 0}/${analytics?.totalTasks || 0}`, icon: Target, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  ];

  const quickActions = [
    { name: 'Analyze Resume', path: '/resume', icon: FileText, desc: 'Optimise ATS keywords', color: 'from-purple-500/20 to-indigo-500/5 hover:border-purple-500/30 text-purple-300' },
    { name: 'Practice Interview', path: '/interview', icon: Video, desc: 'AI interactive review', color: 'from-cyan-500/20 to-blue-500/5 hover:border-cyan-500/30 text-cyan-300' },
    { name: 'Ask AI Mentor', path: '/chat', icon: MessageSquare, desc: 'Ask career guidance', color: 'from-pink-500/20 to-rose-500/5 hover:border-pink-500/30 text-pink-300' },
    { name: 'Career Roadmap', path: '/roadmap', icon: Compass, desc: 'Generate placement guides', color: 'from-amber-500/20 to-orange-500/5 hover:border-amber-500/30 text-amber-300' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up pb-8">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-[20px] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Ready to conquer today, {user?.name}? 🚀
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 flex items-center gap-2">
            Targeting <span className="font-semibold text-purple-400 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20">{user?.targetGoal || 'Software Engineer'}</span> roles
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-purple-300 font-semibold shadow-inner cursor-pointer hover:bg-white/10 transition-colors">
          <Sparkles size={16} className="animate-pulse-glow" />
          Placement Ready
        </div>
      </header>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
              className="glass-card p-6 rounded-[20px] flex items-center space-x-5 border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl" />
              <div className={`p-4 rounded-[16px] border ${stat.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-extrabold mt-1 text-zinc-100 tracking-tight">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Launch Actions (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 px-1">
            <BrainCircuit size={20} className="text-purple-400" />
            Quick AI Launchpad
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {quickActions.map((act, i) => {
              const Icon = act.icon;
              return (
                <Link key={i} to={act.path}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`glass-card p-6 rounded-[20px] border border-white/5 bg-gradient-to-br ${act.color} flex flex-col justify-between h-40 group relative overflow-hidden`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="flex justify-between items-start relative z-10">
                      <div className="p-3 rounded-[16px] bg-white/5 border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors duration-300">
                        <Icon size={22} />
                      </div>
                      <ChevronRight size={20} className="text-zinc-500 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-base font-bold text-zinc-100 tracking-tight">{act.name}</h3>
                      <p className="text-xs text-zinc-400 mt-1 font-medium">{act.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 px-1">
            <TrendingUp size={20} className="text-purple-400" />
            Daily Focus
          </h2>
          <div className="glass-card p-8 rounded-[20px] border border-white/5 bg-gradient-to-b from-purple-900/10 to-transparent relative overflow-hidden flex flex-col items-center justify-center h-[340px]">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative w-44 h-44 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="88" cy="88" r="76" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                <circle 
                  cx="88" cy="88" r="76" 
                  stroke="url(#purpleGradientMain)" 
                  strokeWidth="12" 
                  fill="none" 
                  strokeDasharray="477.5" 
                  strokeDashoffset={477.5 - (477.5 * (analytics?.pomodorosCompleted || 0)) / (user?.pomoGoal || 4)} 
                  strokeLinecap="round"
                  className="transition-all duration-1500 ease-out drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                />
                <defs>
                  <linearGradient id="purpleGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-4xl font-extrabold tracking-tighter text-zinc-100">{analytics?.pomodorosCompleted || 0}</span>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">of {user?.pomoGoal || 4}</span>
              </div>
            </div>

            <div className="text-center relative z-10 w-full">
              <button className="w-full py-3 rounded-xl bg-purple-600/20 text-purple-300 font-semibold text-sm border border-purple-500/30 hover:bg-purple-600/30 hover:border-purple-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                Start Focus Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
