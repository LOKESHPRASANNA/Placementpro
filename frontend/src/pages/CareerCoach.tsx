import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Target, 
  TrendingUp, 
  BookOpen, 
   
  Code2, 
  Award, 
  Calendar,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

export const CareerCoach = () => {
  
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'resources'>('overview');

  // Mock AI generated coach data
  const coachData = {
    strongAreas: ['Data Structures (Arrays/Strings)', 'React Frontend', 'REST APIs'],
    weakAreas: ['Dynamic Programming', 'System Design (Scalability)', 'Behavioral Interviews'],
    careerAdvice: 'You are well-positioned for frontend or full-stack roles. However, to crack top-tier companies like Amazon or Google, you must prioritize System Design concepts and medium-hard level Dynamic Programming questions. Your resume is strong, but your mock interview communication score is lagging slightly behind your technical skills.',
    weeklyGoals: [
      { task: 'Solve 5 Dynamic Programming problems on LeetCode', completed: false },
      { task: 'Watch "Grokking the System Design Interview" intro', completed: true },
      { task: 'Do 1 Mock Behavioral Interview (STAR method)', completed: false }
    ],
    monthlyGoals: [
      { task: 'Build a Full-stack E-Commerce app with payment integration', completed: false },
      { task: 'Achieve 85%+ consistently in ATS Resume score', completed: true },
      { task: 'Reach LeetCode rating of 1600+', completed: false }
    ],
    suggestions: {
      projects: ['Real-time Chat App with WebSockets', 'Microservices based E-Commerce'],
      hackathons: ['Smart India Hackathon 2026', 'MLH Global Hack Week'],
      certs: ['AWS Certified Developer - Associate', 'Meta Front-End Developer'],
      books: ['Cracking the Coding Interview (Chapter 8)', 'Designing Data-Intensive Applications'],
      youtube: ['NeetCode (DP Playlist)', 'ByteByteGo (System Design)'],
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-8">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-8 rounded-[24px] border border-white/5 relative overflow-hidden bg-black/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 flex gap-6 items-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Compass size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              AI Career Coach
            </h1>
            <p className="text-zinc-400 text-sm mt-1.5 font-medium max-w-xl">
              Your personalized roadmap to success. Analyzed from your test scores, resume strength, and mock interview performance.
            </p>
          </div>
        </div>
        
        <button className="relative z-10 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105 transition-all">
          <MessageSquare size={18} /> Chat with Coach
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-white/5 pb-1 overflow-x-auto custom-scrollbar">
        {(['overview', 'goals', 'resources'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-t-xl text-sm font-bold capitalize transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-white/5 text-purple-300 border-b-2 border-purple-500' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border-b-2 border-transparent'
            }`}
          >
            {tab === 'overview' ? 'AI Analysis' : tab === 'goals' ? 'Action Plan' : 'Learning Suggestions'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-panel p-8 rounded-[24px] border border-purple-500/20 bg-purple-900/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10"><BrainCircuit size={100} /></div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                    <Sparkles className="text-purple-400"/> Coach's Assessment
                  </h3>
                  <p className="text-zinc-300 leading-relaxed font-medium text-lg relative z-10">
                    "{coachData.careerAdvice}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 rounded-[24px] border border-emerald-500/20 bg-emerald-900/5">
                    <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><TrendingUp size={18}/> Strong Areas</h4>
                    <ul className="space-y-3">
                      {coachData.strongAreas.map((s,i)=><li key={i} className="text-sm text-zinc-300 flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> {s}</li>)}
                    </ul>
                  </div>
                  <div className="glass-panel p-6 rounded-[24px] border border-rose-500/20 bg-rose-900/5">
                    <h4 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><Zap size={18}/> Priority Improvements</h4>
                    <ul className="space-y-3">
                      {coachData.weakAreas.map((s,i)=><li key={i} className="text-sm text-zinc-300 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-rose-500"/> {s}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20">
                <h3 className="font-bold text-white mb-6">Readiness Radar</h3>
                {/* Dummy Radar Chart placeholder for Sprint 1 */}
                <div className="w-full aspect-square border border-white/5 rounded-full bg-black/40 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-grid opacity-10 rounded-full overflow-hidden" />
                  <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-purple-500/30 fill-current drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <polygon points="50,5 90,35 75,85 25,85 10,35" />
                  </svg>
                  <div className="absolute text-[10px] font-bold text-zinc-400 top-2">Coding</div>
                  <div className="absolute text-[10px] font-bold text-zinc-400 bottom-2">Aptitude</div>
                  <div className="absolute text-[10px] font-bold text-zinc-400 left-2">Resume</div>
                  <div className="absolute text-[10px] font-bold text-zinc-400 right-2">Soft Skills</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* GOALS TAB */}
          {activeTab === 'goals' && (
            <motion.div key="goals" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Target className="text-amber-400"/> Weekly Sprint</h2>
                <div className="space-y-3">
                  {coachData.weeklyGoals.map((g,i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${g.completed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-black/40 border-white/5 hover:border-amber-500/30'}`}>
                      <div className={`mt-0.5 shrink-0 ${g.completed ? 'text-emerald-400' : 'text-zinc-600'}`}>
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${g.completed ? 'text-emerald-200 line-through opacity-50' : 'text-zinc-200'}`}>{g.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Calendar className="text-blue-400"/> Monthly Milestones</h2>
                <div className="space-y-3">
                  {coachData.monthlyGoals.map((g,i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${g.completed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-black/40 border-white/5 hover:border-blue-500/30'}`}>
                      <div className={`mt-0.5 shrink-0 ${g.completed ? 'text-emerald-400' : 'text-zinc-600'}`}>
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${g.completed ? 'text-emerald-200 line-through opacity-50' : 'text-zinc-200'}`}>{g.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <motion.div key="resources" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
                <h3 className="text-sm font-bold text-purple-400 mb-4 flex items-center gap-2 uppercase tracking-wider"><Target size={18}/> YouTube Channels</h3>
                <ul className="space-y-4">
                  {coachData.suggestions.youtube.map((s,i) => (
                    <li key={i} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{s}</span>
                      <ChevronRight size={16} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
                <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-wider"><BookOpen size={18}/> Essential Books</h3>
                <ul className="space-y-4">
                  {coachData.suggestions.books.map((s,i) => (
                    <li key={i} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{s}</span>
                      <ChevronRight size={16} className="text-zinc-600 group-hover:text-blue-400 transition-colors" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
                <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2 uppercase tracking-wider"><Code2 size={18}/> Project Ideas</h3>
                <ul className="space-y-4">
                  {coachData.suggestions.projects.map((s,i) => (
                    <li key={i} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{s}</span>
                      <ChevronRight size={16} className="text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
                <h3 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wider"><Award size={18}/> Certifications</h3>
                <ul className="space-y-4">
                  {coachData.suggestions.certs.map((s,i) => (
                    <li key={i} className="flex justify-between items-center group cursor-pointer">
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{s}</span>
                      <ChevronRight size={16} className="text-zinc-600 group-hover:text-amber-400 transition-colors" />
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};
