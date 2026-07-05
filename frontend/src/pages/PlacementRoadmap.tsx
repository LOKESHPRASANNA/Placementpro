import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Plus, ChevronRight, Compass, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const PlacementRoadmap = () => {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [selectedRoadmap, setSelectedRoadmap] = useState<any>(null);

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const fetchRoadmaps = () => {
    api.get('/roadmap')
      .then(res => {
        setRoadmaps(res.data);
        if (res.data.length > 0) {
          setSelectedRoadmap(res.data[0]);
        }
      })
      .catch(console.error);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || cooldown > 0) return;
    
    // Rate Limiting Cooldown (10 seconds)
    setCooldown(10);
    setLoading(true);
    try {
      const res = await api.post('/roadmap/generate', { company });
      setCompany('');
      setRoadmaps([res.data, ...roadmaps]);
      setSelectedRoadmap(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 h-full flex flex-col animate-fade-in-up">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <Compass className="text-purple-400" size={32} />
            Placement Roadmaps
          </h1>
          <p className="text-zinc-400 text-sm mt-1">AI-generated career pathways and preparation guides</p>
        </div>
      </header>

      {/* Grid container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        
        {/* Left Side Control Panel & History */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {/* Generation form */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 shadow-xl">
            <h2 className="text-base font-bold text-zinc-100 mb-5 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-400 animate-pulse-glow" />
              Generate Roadmap
            </h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <input
                type="text"
                className={`w-full pl-5 pr-5 py-3.5 bg-zinc-900/80 border border-white/10 rounded-[16px] outline-none transition-all text-sm text-zinc-100 shadow-inner ${
                  cooldown > 0 ? 'placeholder-rose-500/70 border-rose-500/30 bg-rose-950/10' : 'placeholder-zinc-500 focus:ring-2 focus:ring-purple-500/50'
                }`}
                placeholder={cooldown > 0 ? `Rate limited. Wait ${cooldown}s` : "Company (e.g. Google)"}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={loading || cooldown > 0}
              />
              <button
                type="submit"
                disabled={loading || !company.trim() || cooldown > 0}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-[16px] transition-all duration-300 flex justify-center items-center shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-500/30 disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                ) : (
                  <><Plus size={20} className="mr-1.5"/> {cooldown > 0 ? 'Please Wait' : 'Generate'}</>
                )}
              </button>
            </form>
          </div>

          {/* History Panel */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 flex flex-col flex-1 overflow-hidden shadow-xl bg-black/20">
            <h2 className="text-base font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <Map size={18} className="text-purple-400" />
              Past Guides
            </h2>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {roadmaps.map(rm => (
                <button
                  key={rm.id}
                  onClick={() => setSelectedRoadmap(rm)}
                  className={`w-full text-left px-4 py-3.5 rounded-[16px] border transition-all duration-300 flex items-center justify-between ${
                    selectedRoadmap?.id === rm.id 
                      ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-purple-300 border-purple-500/30 font-bold shadow-md' 
                      : 'bg-black/40 border-white/5 hover:border-white/10 hover:bg-white/5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="truncate text-[13px]">{rm.company}</span>
                  <ChevronRight size={16} className={`shrink-0 transition-transform ${selectedRoadmap?.id === rm.id ? 'translate-x-1' : ''}`} />
                </button>
              ))}
              {roadmaps.length === 0 && (
                <p className="text-zinc-500 text-sm font-medium text-center py-10">No roadmaps generated yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Roadmap Viewer */}
        <div className="lg:col-span-3 glass-panel rounded-[24px] border border-white/5 flex flex-col overflow-hidden relative shadow-2xl">
          <AnimatePresence mode="wait">
            {selectedRoadmap ? (
              <motion.div 
                key={selectedRoadmap.id}
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 overflow-y-auto p-10 pr-8 custom-scrollbar prose prose-invert max-w-none prose-purple leading-relaxed z-10 relative"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <h2 className="text-3xl font-black tracking-tight text-zinc-100 mb-8 flex items-center gap-3 pb-6 border-b border-white/5">
                  <Compass size={28} className="text-purple-400" />
                  Preparation Roadmap: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{selectedRoadmap.company}</span>
                </h2>
                
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h3 className="text-xl font-bold text-zinc-100 mt-8 mb-4">{children}</h3>,
                    h2: ({ children }) => <h4 className="text-lg font-bold text-zinc-200 mt-6 mb-3">{children}</h4>,
                    p: ({ children }) => <p className="text-[15px] text-zinc-300 mb-5 leading-relaxed font-medium">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-5 text-[15px] text-zinc-300 font-medium">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-5 text-[15px] text-zinc-300 font-medium">{children}</ol>,
                    li: ({ children }) => <li className="text-zinc-300 inline-block w-full">{children}</li>,
                    blockquote: ({ children }) => (
                      <div className="p-5 bg-gradient-to-r from-purple-500/10 to-indigo-500/5 border-l-4 border-purple-500 rounded-r-2xl my-6 text-[15px] text-purple-200 font-medium shadow-sm">
                        {children}
                      </div>
                    ),
                  }}
                >
                  {selectedRoadmap.details}
                </ReactMarkdown>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-16 relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)] animate-pulse-glow">
                  <Map size={40} />
                </div>
                <h3 className="text-zinc-100 font-bold text-xl">Select Preparation Guide</h3>
                <p className="text-zinc-400 font-medium text-sm max-w-sm mt-3 leading-relaxed">
                  Enter a target company in the generator panel or select an existing guide from your past list to view.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
