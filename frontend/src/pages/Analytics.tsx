import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { BarChart, TrendingUp, Award, CalendarDays, Brain, Clock } from 'lucide-react';

export const Analytics = () => {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    api.get('/analytics')
      .then(res => setAnalytics(res.data))
      .catch(console.error);
  }, []);

  const mockWeeklyProgress = [2, 4, 3, 5, 8, 6, 7];
  const mockStudyHours = [2.5, 4.0, 3.2, 5.0, 6.5, 4.2, 5.8];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <BarChart className="text-purple-400" size={32} />
            Performance Analytics
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Track your placement preparation consistency and metrics</p>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} className="glass-panel p-8 rounded-[24px] flex items-center border border-white/5 relative overflow-hidden shadow-xl hover:bg-white/5 transition-colors group">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-colors pointer-events-none" />
          <div className="p-4 rounded-[16px] bg-purple-500/10 border border-purple-500/20 text-purple-400 mr-5 shadow-inner">
            <Award size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-zinc-400 text-sm font-bold tracking-wide uppercase">Avg Interview Score</p>
            <p className="text-3xl font-black mt-1 font-mono text-zinc-100">{analytics?.avgInterviewScore || 0}%</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-panel p-8 rounded-[24px] flex items-center border border-white/5 relative overflow-hidden shadow-xl hover:bg-white/5 transition-colors group">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors pointer-events-none" />
          <div className="p-4 rounded-[16px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mr-5 shadow-inner">
            <TrendingUp size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-zinc-400 text-sm font-bold tracking-wide uppercase">Resume Score Trend</p>
            <p className="text-3xl font-black mt-1 font-mono text-zinc-100">{analytics?.resumeScore || 0}/100</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8 rounded-[24px] flex items-center border border-white/5 relative overflow-hidden shadow-xl hover:bg-white/5 transition-colors group">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />
          <div className="p-4 rounded-[16px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mr-5 shadow-inner">
            <Brain size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-zinc-400 text-sm font-bold tracking-wide uppercase">Total Interviews</p>
            <p className="text-3xl font-black mt-1 font-mono text-zinc-100">{analytics?.totalInterviews || 0}</p>
          </div>
        </motion.div>
      </div>

      {/* SVG Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Score Progression (Line & Area Chart) */}
        <div className="glass-panel p-8 rounded-[24px] border border-white/5 flex flex-col justify-between min-h-[400px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-base">
              <TrendingUp className="text-purple-400" size={18} /> Resume Score progression
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Calculated over your last 7 evaluation scans</p>
          </div>

          <div className="relative w-full h-52 mt-8 z-10">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="scoreArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

              {/* Area path */}
              <path
                d="M 10 200 L 10 120 L 90 100 L 170 85 L 250 88 L 330 75 L 410 60 L 490 50 L 490 200 Z"
                fill="url(#scoreArea)"
              />

              {/* Line path */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                d="M 10 120 Q 90 100 170 85 T 330 75 T 490 50"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]"
              />

              {/* Chart dots */}
              {[
                {x: 10, y: 120, val: 50}, 
                {x: 90, y: 100, val: 58}, 
                {x: 170, y: 85, val: 65}, 
                {x: 250, y: 88, val: 70}, 
                {x: 330, y: 75, val: 78}, 
                {x: 410, y: 60, val: 82}, 
                {x: 490, y: 50, val: 85}
              ].map((dot, i) => (
                <g key={i}>
                  <circle cx={dot.x} cy={dot.y} r="6" fill="#c084fc" stroke="#18181b" strokeWidth="2" className="drop-shadow-[0_0_5px_rgba(192,132,252,0.8)]" />
                  <text x={dot.x} y={dot.y - 15} fill="#f4f4f5" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    {dot.val}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex justify-between text-xs text-zinc-500 font-semibold mt-6 relative z-10">
            <span>Scan 1</span>
            <span>Scan 2</span>
            <span>Scan 3</span>
            <span>Scan 4</span>
            <span>Scan 5</span>
            <span>Scan 6</span>
            <span className="text-purple-400">Scan 7 (Latest)</span>
          </div>
        </div>

        {/* Study Hours / Pomodoros Weekly (Bar Chart) */}
        <div className="glass-panel p-8 rounded-[24px] border border-white/5 flex flex-col justify-between min-h-[400px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-base">
              <Clock className="text-purple-400" size={18} /> Focus Consistency
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-medium">Study hours and Pomodoros tracked this week</p>
          </div>

          <div className="relative w-full h-52 mt-8 z-10">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />

              {/* Render Bars */}
              {mockWeeklyProgress.map((val, i) => {
                const barWidth = 36;
                const barHeight = (val / 8) * 150;
                const x = 30 + i * 65;
                const y = 200 - barHeight;
                return (
                  <g key={i}>
                    <motion.rect
                      initial={{ height: 0, y: 200 }}
                      animate={{ height: barHeight, y: y }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.05 }}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="8"
                      fill="url(#barGradient)"
                    />
                    <text x={x + barWidth / 2} y={y - 12} fill="#f4f4f5" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      {mockStudyHours[i]}h
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-xs text-zinc-500 font-semibold px-4 mt-6 relative z-10">
            {daysOfWeek.map((day, i) => (
              <span key={i} className={i === daysOfWeek.length - 1 ? 'text-indigo-400' : ''}>{day}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Daily Contribution Calendar Grid */}
      <div className="glass-panel p-8 rounded-[24px] border border-white/5 bg-black/20 shadow-2xl">
        <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-base mb-6">
          <CalendarDays className="text-purple-400" size={18} /> Daily Preparation Grid
        </h3>
        
        <div className="flex flex-col justify-center overflow-x-auto custom-scrollbar">
          <div className="grid grid-flow-col grid-rows-7 gap-2 min-w-[800px] pb-6">
            {Array.from({length: 84}).map((_, i) => {
              const weight = Math.random();
              return (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-[4px] transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer ${
                    weight > 0.8 ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] border border-purple-400/20' : 
                    weight > 0.6 ? 'bg-purple-600/70 border border-purple-500/10' : 
                    weight > 0.3 ? 'bg-purple-800/40' : 
                    'bg-white/5 border border-white/5 hover:bg-white/10'
                  }`}
                />
              );
            })}
          </div>
          
          <div className="flex justify-between items-center text-xs text-zinc-500 font-semibold max-w-[360px] pt-4 border-t border-white/5">
            <span>Less prep</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-[3px] bg-white/5 border border-white/5" />
              <div className="w-3 h-3 rounded-[3px] bg-purple-800/40" />
              <div className="w-3 h-3 rounded-[3px] bg-purple-600/70" />
              <div className="w-3 h-3 rounded-[3px] bg-purple-500" />
            </div>
            <span>More prep</span>
          </div>
        </div>
      </div>
    </div>
  );
};
