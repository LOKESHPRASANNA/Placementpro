import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Search, CheckCircle2, Circle, Flame, BarChart3, Database, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const languages = [
  { id: 'all', name: 'All Languages' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'c', name: 'C' },
  { id: 'js', name: 'JavaScript' },
  { id: 'sql', name: 'SQL' },
];

const categories = [
  'All Categories', 'Arrays', 'Strings', 'Sorting', 'Searching', 'Recursion', 
  'Dynamic Programming', 'Graphs', 'Trees', 'Stack', 'Queue', 'Linked List', 
  'HashMap', 'Greedy', 'Backtracking', 'Bit Manipulation', 'Database Queries', 'OOP'
];

const mockProblems = [
  { id: 1, title: 'Two Sum', category: 'Arrays', difficulty: 'Easy', acceptance: '48.9%', status: 'solved' },
  { id: 2, title: 'Longest Substring Without Repeating Characters', category: 'Strings', difficulty: 'Medium', acceptance: '33.8%', status: 'unsolved' },
  { id: 3, title: 'Merge k Sorted Lists', category: 'Linked List', difficulty: 'Hard', acceptance: '49.2%', status: 'unsolved' },
  { id: 4, title: 'Climbing Stairs', category: 'Dynamic Programming', difficulty: 'Easy', acceptance: '52.1%', status: 'solved' },
  { id: 5, title: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', acceptance: '40.2%', status: 'solved' },
  { id: 6, title: 'Course Schedule', category: 'Graphs', difficulty: 'Medium', acceptance: '45.7%', status: 'unsolved' },
  { id: 7, title: 'Binary Tree Maximum Path Sum', category: 'Trees', difficulty: 'Hard', acceptance: '38.6%', status: 'unsolved' },
  { id: 8, title: 'N-Queens', category: 'Backtracking', difficulty: 'Hard', acceptance: '61.2%', status: 'unsolved' },
  { id: 9, title: 'Employees Earning More Than Their Managers', category: 'Database Queries', difficulty: 'Easy', acceptance: '68.4%', status: 'unsolved' },
  { id: 10, title: 'Coin Change', category: 'Dynamic Programming', difficulty: 'Medium', acceptance: '41.3%', status: 'unsolved' },
];

export const CodingPlatform = () => {
  const [activeLang, setActiveLang] = useState('all');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredProblems = mockProblems.filter(p => {
    const matchCat = activeCategory === 'All Categories' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleStartCoding = (id: number, title: string) => {
    navigate('/test-simulation', { state: { subject: 'Coding', topic: title, questionId: id } });
  };

  return (
    <div className="space-y-8 h-full flex flex-col animate-fade-in-up pb-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <Code2 className="text-purple-400" size={32} />
            AI Coding Platform
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Master algorithms, data structures, and system design with an intelligent AI evaluator.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass-button bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-sm font-bold text-amber-400 hover:bg-amber-500/20 flex items-center gap-2">
            <Flame size={16} className="text-amber-400 animate-pulse"/> 14 Day Streak
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          
          {/* Quick Stats */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <h3 className="text-zinc-100 font-bold mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-purple-400" />
              Your Progress
            </h3>
            <div className="flex justify-between items-end mb-2">
              <span className="text-3xl font-black text-white">42</span>
              <span className="text-sm font-semibold text-zinc-400 mb-1">/ 500 solved</span>
            </div>
            <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{ width: '8.4%' }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
              <div className="bg-emerald-500/10 text-emerald-400 py-1.5 rounded-lg border border-emerald-500/20">21 Easy</div>
              <div className="bg-amber-500/10 text-amber-400 py-1.5 rounded-lg border border-amber-500/20">15 Med</div>
              <div className="bg-rose-500/10 text-rose-400 py-1.5 rounded-lg border border-rose-500/20">6 Hard</div>
            </div>
          </div>

          {/* Categories */}
          <div className="glass-panel p-5 rounded-[24px] border border-white/5 bg-black/20 shadow-2xl flex-1 flex flex-col overflow-hidden">
            <h3 className="text-zinc-100 font-bold mb-4 flex items-center gap-2 px-1">
              <Database size={16} className="text-purple-400" />
              Categories
            </h3>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold ${
                    activeCategory === cat 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                      : 'bg-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side - Problem List */}
        <div className="lg:col-span-3 glass-panel rounded-[24px] border border-white/5 bg-black/20 shadow-2xl flex flex-col overflow-hidden relative">
          
          {/* Header Controls */}
          <div className="p-6 border-b border-white/5 bg-black/40 flex flex-col sm:flex-row gap-4 justify-between items-center z-10">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-sm text-zinc-200"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar w-full sm:w-auto">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setActiveLang(lang.id)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
                    activeLang === lang.id
                      ? 'bg-zinc-800 text-white border-white/20 shadow-md'
                      : 'bg-black/40 text-zinc-500 border-white/5 hover:bg-zinc-800/80 hover:text-zinc-300'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-white/5 border-b border-white/5 text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <div className="col-span-1">Status</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Acceptance</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Problem List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            <AnimatePresence>
              {filteredProblems.map((p, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  key={p.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-transparent hover:bg-white/5 border border-transparent hover:border-white/5 rounded-2xl transition-all group"
                >
                  <div className="col-span-1 flex justify-center">
                    {p.status === 'solved' ? (
                      <CheckCircle2 size={18} className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    ) : (
                      <Circle size={18} className="text-zinc-700 group-hover:text-zinc-500 transition-colors" />
                    )}
                  </div>
                  <div className="col-span-6 flex flex-col">
                    <span className="font-bold text-zinc-200 group-hover:text-purple-300 transition-colors cursor-pointer" onClick={() => handleStartCoding(p.id, p.title)}>
                      {p.id}. {p.title}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium mt-0.5">{p.category}</span>
                  </div>
                  <div className="col-span-2 text-sm font-mono text-zinc-400">
                    {p.acceptance}
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                      p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      p.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {p.difficulty}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button 
                      onClick={() => handleStartCoding(p.id, p.title)}
                      className="p-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg border border-purple-500/20 transition-all shadow-sm hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:scale-105 active:scale-95"
                    >
                      <PlayCircle size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
              {filteredProblems.length === 0 && (
                <div className="text-center py-20">
                  <Terminal size={32} className="mx-auto text-zinc-600 mb-4" />
                  <p className="text-zinc-400 font-medium">No problems found for this criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
