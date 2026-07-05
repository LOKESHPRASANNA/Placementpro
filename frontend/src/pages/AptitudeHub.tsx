import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Calculator, MessageSquare, LineChart, Puzzle, Activity, ChevronRight, PlayCircle, BookOpen, Clock, Target, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'quantitative', name: 'Quantitative Aptitude', icon: Calculator, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'logical', name: 'Logical Reasoning', icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'verbal', name: 'Verbal Ability', icon: MessageSquare, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'data', name: 'Data Interpretation', icon: LineChart, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'analytical', name: 'Analytical Reasoning', icon: Activity, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'puzzle', name: 'Puzzle Solving', icon: Puzzle, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
];

const topics: Record<string, any[]> = {
  'quantitative': [
    { name: 'Number System', progress: 85, questions: 120, difficulty: 'Medium' },
    { name: 'Profit & Loss', progress: 60, questions: 85, difficulty: 'Medium' },
    { name: 'Time & Work', progress: 30, questions: 90, difficulty: 'Hard' },
    { name: 'Time Speed Distance', progress: 15, questions: 110, difficulty: 'Hard' },
    { name: 'Pipes & Cisterns', progress: 0, questions: 45, difficulty: 'Medium' },
    { name: 'Percentages', progress: 100, questions: 70, difficulty: 'Easy' },
    { name: 'Ratio & Proportion', progress: 100, questions: 65, difficulty: 'Easy' },
    { name: 'Probability', progress: 5, questions: 95, difficulty: 'Hard' },
    { name: 'Permutation & Combination', progress: 0, questions: 105, difficulty: 'Hard' },
    { name: 'Geometry', progress: 40, questions: 150, difficulty: 'Hard' },
    { name: 'Algebra', progress: 55, questions: 130, difficulty: 'Medium' },
  ],
  'logical': [
    { name: 'Blood Relations', progress: 90, questions: 60, difficulty: 'Easy' },
    { name: 'Coding-Decoding', progress: 75, questions: 80, difficulty: 'Medium' },
    { name: 'Seating Arrangement', progress: 20, questions: 120, difficulty: 'Hard' },
    { name: 'Calendar', progress: 10, questions: 40, difficulty: 'Medium' },
    { name: 'Clock', progress: 5, questions: 35, difficulty: 'Medium' },
  ],
  'verbal': [
    { name: 'Reading Comprehension', progress: 50, questions: 200, difficulty: 'Medium' },
    { name: 'Sentence Correction', progress: 80, questions: 150, difficulty: 'Easy' },
  ],
  'data': [
    { name: 'Bar Graphs', progress: 60, questions: 40, difficulty: 'Easy' },
    { name: 'Pie Charts', progress: 40, questions: 45, difficulty: 'Medium' },
  ],
  'analytical': [
    { name: 'Syllogism', progress: 30, questions: 80, difficulty: 'Hard' },
  ],
  'puzzle': [
    { name: 'Sudoku Patterns', progress: 10, questions: 20, difficulty: 'Hard' },
  ]
};

export const AptitudeHub = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const navigate = useNavigate();

  const handleStartPractice = (topicName: string) => {
    navigate('/test-simulation', { state: { subject: 'Aptitude', topic: topicName } });
  };

  return (
    <div className="space-y-8 h-full flex flex-col animate-fade-in-up pb-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <BrainCircuit className="text-purple-400" size={32} />
            AI Aptitude Center
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Master quantitative and logical reasoning with AI-guided learning and timed practice.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass-button bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 flex items-center gap-2">
            <Target size={16} className="text-indigo-400"/> Daily Challenge
          </button>
          <button onClick={() => navigate('/test-simulation')} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2 px-5 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <PlayCircle size={18} /> Mock Test
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
        
        {/* Category Sidebar */}
        <div className="lg:col-span-1 glass-panel rounded-[24px] border border-white/5 overflow-hidden shadow-2xl bg-black/20 flex flex-col">
          <div className="p-5 border-b border-white/5 bg-black/40">
            <h2 className="font-bold text-zinc-100 flex items-center gap-2">
              <BookOpen size={18} className="text-purple-400" />
              Subjects
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  activeCategory === cat.id 
                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-zinc-100 border border-purple-500/30 shadow-md font-semibold' 
                    : 'hover:bg-white/5 text-zinc-400 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeCategory === cat.id ? cat.bg : 'bg-black/50'} ${activeCategory === cat.id ? cat.border : 'border border-white/5'}`}>
                  <cat.icon size={16} className={activeCategory === cat.id ? cat.color : 'text-zinc-500'} />
                </div>
                <span className="truncate text-sm">{cat.name}</span>
                {activeCategory === cat.id && <ChevronRight size={16} className="ml-auto text-purple-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Topics List */}
        <div className="lg:col-span-3 glass-panel rounded-[24px] border border-white/5 bg-black/20 shadow-2xl overflow-hidden flex flex-col relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/40 relative z-10">
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-3">
              {categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <div className="text-sm text-zinc-400 font-medium">
              {topics[activeCategory]?.length || 0} Topics Available
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative z-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {topics[activeCategory]?.map((topic, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all group hover:bg-white/5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-zinc-100 mb-1">{topic.name}</h3>
                        <p className="text-xs text-zinc-500 font-medium flex items-center gap-1.5">
                          <Target size={12} className="text-indigo-400"/> {topic.questions} AI Questions
                        </p>
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                        topic.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        topic.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {topic.difficulty}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-zinc-400">Mastery</span>
                          <span className={topic.progress === 100 ? 'text-emerald-400' : 'text-purple-400'}>{topic.progress}%</span>
                        </div>
                        <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className={`h-full transition-all duration-1000 ${topic.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`} 
                            style={{ width: `${topic.progress}%` }} 
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => handleStartPractice(topic.name)} className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 hover:border-purple-500/30 text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 group-hover:bg-purple-500/10 group-hover:text-purple-300">
                          <Play size={14} /> Practice
                        </button>
                        <button className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 hover:border-indigo-500/30 text-xs font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5">
                          <Clock size={14} /> Timed Test
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
