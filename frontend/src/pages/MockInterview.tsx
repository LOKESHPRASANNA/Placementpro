import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, StopCircle, PlayCircle, Clock, AlertCircle } from 'lucide-react';

export const MockInterview = () => {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const mockQuestions = [
    "Tell me about yourself and your background.",
    "Describe a time you faced a difficult technical challenge and how you solved it.",
    "Why do you want to work as a Software Development Engineer?",
    "How do you handle disagreement in a team project?",
    "Where do you see yourself in five years?"
  ];

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    let interval: any;
    if (inProgress) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [inProgress]);

  // Rotate questions every 45 seconds during the mock session
  useEffect(() => {
    if (inProgress) {
      const qInterval = setInterval(() => {
        setQuestionIndex(idx => (idx + 1) % mockQuestions.length);
      }, 45000);
      return () => clearInterval(qInterval);
    } else {
      setQuestionIndex(0);
    }
  }, [inProgress]);

  const fetchInterviews = () => {
    api.get('/mock-interview')
      .then(res => setInterviews(res.data))
      .catch(console.error);
  };

  const toggleInterview = () => {
    if (inProgress) {
      setInProgress(false);
      // Generate a mock entry when completing the interview locally for demonstration
      const newMockEntry = {
        id: Date.now(),
        role: 'SDE Intern',
        overallScore: Math.floor(Math.random() * 25) + 70, // 70-95
        startedAt: new Date().toISOString()
      };
      setInterviews([newMockEntry, ...interviews]);
    } else {
      setTimer(0);
      setInProgress(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-8 h-full flex flex-col animate-fade-in-up">
      {/* Header */}
      <header className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <Video className="text-purple-400" size={32} />
            Mock Interview
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Practice interview queries and communication style with AI analysis</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        
        {/* Main Recording Interface */}
        <div className="lg:col-span-2 glass-panel rounded-[24px] flex flex-col items-center justify-center relative overflow-hidden bg-black/40 border border-white/5 min-h-[460px] shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {inProgress ? (
              <motion.div 
                key="active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center z-10 text-center px-8"
              >
                {/* Listening Pulsing Micro Animation */}
                <div className="w-28 h-28 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8 relative animate-pulse-glow shadow-[0_0_30px_rgba(244,63,94,0.15)]">
                  <Mic size={36} className="text-rose-400" />
                  <span className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping opacity-75" />
                </div>
                
                <h2 className="text-xl font-bold text-zinc-100 mb-1 flex items-center gap-2">
                  Session Active
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                </h2>
                
                <p className="text-zinc-400 text-sm font-semibold mb-6">Question {questionIndex + 1} of {mockQuestions.length}</p>
                
                <div className="max-w-lg bg-black/40 border border-white/5 p-8 rounded-[20px] text-zinc-200 text-[15px] leading-relaxed mb-8 font-medium shadow-inner">
                  "{mockQuestions[questionIndex]}"
                </div>
                
                <div className="text-4xl font-extrabold font-mono text-rose-400 mb-8 bg-rose-500/5 px-6 py-3 rounded-2xl border border-rose-500/10 shadow-sm">
                  {formatTime(timer)}
                </div>

                <button 
                  onClick={toggleInterview}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-rose-500/20 border border-rose-500/30 text-sm uppercase transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <StopCircle size={18} /> End Interview
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center z-10 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 animate-pulse-glow shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <Video size={40} />
                </div>
                <h2 className="text-xl font-bold text-zinc-100">Start Preparation</h2>
                <p className="text-zinc-400 text-sm max-w-sm mt-3 mb-8 font-medium leading-relaxed">
                  Ready to test your communication skills? Start a mock session to evaluate articulation, technical explanations, and logic.
                </p>
                <button 
                  onClick={toggleInterview}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20 border border-purple-500/30 text-sm uppercase transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <PlayCircle size={18} /> Start Mock Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Simulation Decorative Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Sidebar History Panel */}
        <div className="glass-panel flex flex-col rounded-[24px] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-black/20 shrink-0">
            <h3 className="font-bold text-zinc-100 text-base flex items-center gap-2">
              <Clock size={18} className="text-purple-400" />
              Past Interviews
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {interviews.length > 0 ? interviews.map((inv, i) => (
              <div key={inv.id || i} className="p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-[16px] transition-all duration-300 flex items-center justify-between gap-3 hover:bg-white/10 group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                    <Video size={16} className="text-zinc-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-zinc-200 truncate">{inv.role || 'Software Engineer'}</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
                      {new Date(inv.startedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <span className={`px-3 py-1.5 rounded-lg font-bold font-mono text-[11px] border shrink-0 ${
                  inv.overallScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]' : 
                  inv.overallScore >= 60 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                  'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {inv.overallScore || 0}%
                </span>
              </div>
            )) : (
              <div className="text-center py-20 text-zinc-500">
                <AlertCircle size={32} className="mx-auto mb-4 opacity-40 text-purple-400" />
                <p className="text-sm font-semibold text-zinc-400">No interview sessions found</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
