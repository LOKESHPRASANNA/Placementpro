import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { 
  Target, 
  Building2, 
  CheckCircle, 
  
  Sparkles, 
  ChevronRight,
  BrainCircuit,
  Flame,
  Clock,
  Briefcase,
  PieChart,
  } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Mock AI Engine Data (In a real app, this comes from the backend)
  const aiData = {
    overallReadiness: 86,
    aiConfidence: 92,
    placementProbability: 89,
    companyEligibility: 94,
    metrics: [
      { name: 'Resume Quality', score: 95, color: 'text-purple-400', stroke: 'text-purple-500' },
      { name: 'Coding Skills', score: 82, color: 'text-blue-400', stroke: 'text-blue-500' },
      { name: 'Aptitude', score: 78, color: 'text-amber-400', stroke: 'text-amber-500' },
      { name: 'Interviewing', score: 88, color: 'text-emerald-400', stroke: 'text-emerald-500' },
      { name: 'Communication', score: 90, color: 'text-rose-400', stroke: 'text-rose-500' },
      { name: 'Soft Skills', score: 94, color: 'text-cyan-400', stroke: 'text-cyan-500' },
    ],
    dailyGrowth: {
      streak: 15,
      consistency: 98,
      learningHours: 4.5,
      tasks: {
        coding: true,
        aptitude: false,
        interview: true,
        resume: true,
        projects: false
      }
    }
  };

  useEffect(() => {
    // Simulate API Load
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse p-4">
        <div className="h-16 bg-white/5 border border-white/5 rounded-2xl w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-32 bg-white/5 border border-white/5 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-80 bg-white/5 border border-white/5 rounded-2xl lg:col-span-2" />
          <div className="h-80 bg-white/5 border border-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Circular Progress Component
  const CircularProgress = ({ score, color, stroke, size = 120, strokeWidth = 8, label }: any) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg className="transform -rotate-90" width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeLinecap="round"
              className={`${stroke} drop-shadow-md`}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className={`text-2xl font-black ${color}`}>{score}</span>
          </div>
        </div>
        {label && <span className="text-xs font-bold text-zinc-400 mt-3 text-center uppercase tracking-wider">{label}</span>}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-8">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-[24px] border border-white/5 relative overflow-hidden bg-black/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <BrainCircuit className="text-purple-400" size={32} />
            AI Performance Engine
          </h1>
          <p className="text-zinc-400 text-sm mt-1.5 flex items-center gap-2">
            Welcome back, <span className="text-white font-bold">{user?.name}</span>. Your AI Career Twin is actively analyzing your profile.
          </p>
        </div>
        
        <Link to="/career-coach" className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-sm text-purple-300 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:bg-purple-600/30 hover:scale-105 transition-all">
          <Sparkles size={16} /> Ask AI Coach
        </Link>
      </header>

      {/* Top Level AI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Target size={64}/></div>
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Overall Readiness</h3>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{aiData.overallReadiness}</span>
            <span className="text-lg text-zinc-500 font-bold mb-1.5">/100</span>
          </div>
          <div className="mt-4 h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <motion.div initial={{width:0}} animate={{width:`${aiData.overallReadiness}%`}} transition={{duration: 1}} className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10"><BrainCircuit size={64}/></div>
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">AI Confidence Score</h3>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{aiData.aiConfidence}</span>
            <span className="text-lg text-zinc-500 font-bold mb-1.5">%</span>
          </div>
          <div className="mt-4 h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <motion.div initial={{width:0}} animate={{width:`${aiData.aiConfidence}%`}} transition={{duration: 1}} className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Briefcase size={64}/></div>
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Offer Probability</h3>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">{aiData.placementProbability}</span>
            <span className="text-lg text-zinc-500 font-bold mb-1.5">%</span>
          </div>
          <div className="mt-4 h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <motion.div initial={{width:0}} animate={{width:`${aiData.placementProbability}%`}} transition={{duration: 1}} className="h-full bg-gradient-to-r from-amber-500 to-orange-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          </div>
        </div>

        <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Building2 size={64}/></div>
          <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">Company Eligibility</h3>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{aiData.companyEligibility}</span>
            <span className="text-lg text-zinc-500 font-bold mb-1.5">%</span>
          </div>
          <div className="mt-4 h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <motion.div initial={{width:0}} animate={{width:`${aiData.companyEligibility}%`}} transition={{duration: 1}} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Metrics Radar / Grid */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[24px] border border-white/5 bg-black/20 shadow-2xl relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <PieChart className="text-purple-400" size={24} /> Skill Matrix Analysis
            </h2>
            <Link to="/analytics" className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              Deep Analytics <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 relative z-10 mt-4">
            {aiData.metrics.map(metric => (
              <CircularProgress 
                key={metric.name} 
                score={metric.score} 
                color={metric.color} 
                stroke={metric.stroke} 
                label={metric.name} 
              />
            ))}
          </div>
        </div>

        {/* Daily Growth Score & Consistency */}
        <div className="lg:col-span-1 glass-panel p-8 rounded-[24px] border border-white/5 bg-black/20 shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-8 relative z-10">
            <Flame className="text-amber-400" size={24} /> AI Daily Growth
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center relative z-10 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
              <div className="w-32 h-32 rounded-full border-4 border-amber-500/30 flex flex-col items-center justify-center bg-black/60 relative z-10 backdrop-blur-sm">
                <Flame size={32} className="text-amber-400 mb-1" />
                <span className="text-3xl font-black text-amber-400">{aiData.dailyGrowth.streak}</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Day Streak</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 font-medium text-center mt-6">
              You are in the top <strong className="text-zinc-200">5%</strong> of consistent learners this week!
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="bg-black/40 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Daily Consistency</span>
                <span className="text-sm font-bold text-emerald-400">{aiData.dailyGrowth.consistency}%</span>
              </div>
              <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[98%]" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center gap-1">
                <Clock size={16} className="text-blue-400" />
                <span className="text-lg font-bold text-white">{aiData.dailyGrowth.learningHours}h</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Learning</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center gap-1">
                <CheckCircle size={16} className="text-emerald-400" />
                <span className="text-lg font-bold text-white">3/5</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Tasks</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
