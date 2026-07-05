import { useState, useEffect, useRef } from 'react';

import { Clock, Expand,  ChevronLeft, ChevronRight, Play,  Bookmark, Code2, ShieldAlert } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export const TestSimulation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, topic, } = location.state || { subject: 'Aptitude', topic: 'Practice Test', questionId: null };
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 mins
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [code, setCode] = useState('// Write your solution here\n\nfunction solution() {\n  \n}');
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isCoding = subject === 'Coding';

  // Mock Data
  const questions = isCoding ? [
    {
      id: 1,
      title: topic || 'Two Sum',
      description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n**Example 1:**\n\`\`\`\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\`\`\``,
      status: 'unanswered' // answered, marked, unanswered
    }
  ] : Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `Question ${i + 1}`,
    description: `This is a sample ${topic} question for the aptitude test. Solve the problem below.\n\nIf a train travels 60km in 1.5 hours, what is its average speed?`,
    options: ['30 km/hr', '40 km/hr', '45 km/hr', '50 km/hr'],
    selectedOption: null,
    status: i === 0 ? 'unanswered' : 'not_visited'
  }));

  const [qState, setQState] = useState<any[]>(questions);

  // Timer & Security
  useEffect(() => {
    let timer: any;
    if (isFullscreen && timeRemaining > 0) {
      timer = setInterval(() => setTimeRemaining(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isFullscreen, timeRemaining]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const requestFullscreen = async () => {
    if (containerRef.current) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    }
  };

  const handleOptionSelect = (qIndex: number, optIndex: number) => {
    setQState(prev => {
      const nw = [...prev];
      nw[qIndex].selectedOption = optIndex;
      nw[qIndex].status = 'answered';
      return nw;
    });
  };

  const handleMarkReview = () => {
    setQState(prev => {
      const nw = [...prev];
      if (nw[activeQuestion].status === 'marked') {
        nw[activeQuestion].status = nw[activeQuestion].selectedOption !== null ? 'answered' : 'unanswered';
      } else {
        nw[activeQuestion].status = 'marked';
      }
      return nw;
    });
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const submitTest = () => {
    if(document.fullscreenElement) {
      document.exitFullscreen();
    }
    alert("Test Submitted Successfully! (AI Evaluation Engine is processing your results)");
    navigate(isCoding ? '/coding' : '/aptitude');
  };

  if (!isFullscreen) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center animate-fade-in-up">
        <div className="w-24 h-24 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 text-rose-400 animate-pulse-glow">
          <ShieldAlert size={40} />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Proctored Environment</h2>
        <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium bg-white/5 p-4 rounded-xl border border-white/5">
          This assessment requires <strong>Fullscreen Mode</strong>. Exiting fullscreen during the test will automatically submit your assessment and record a violation.
        </p>
        <button 
          onClick={requestFullscreen}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all flex items-center gap-2 shadow-lg"
        >
          <Expand size={18} /> Enter Fullscreen to Start
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-[#05050c] flex flex-col z-[100] font-sans text-zinc-200">
      
      {/* Top Bar */}
      <header className="h-14 bg-zinc-950 border-b border-white/5 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          {isCoding ? <Code2 className="text-purple-400" size={20} /> : <Clock className="text-purple-400" size={20} />}
          <h1 className="font-bold text-zinc-100">{subject} Assessment: <span className="text-zinc-400 font-medium">{topic}</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className={`font-mono text-xl font-bold ${timeRemaining < 300 ? 'text-rose-400 animate-pulse' : 'text-zinc-100'}`}>
            {formatTime(timeRemaining)}
          </div>
          <button 
            onClick={submitTest}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-5 rounded-lg transition-all text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] border border-emerald-500/30"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Question Description */}
        <div className={`flex flex-col border-r border-white/5 bg-zinc-950/50 ${isCoding ? 'w-1/2' : 'w-3/4'} overflow-hidden`}>
          <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center shrink-0">
            <h2 className="font-bold text-lg">Question {activeQuestion + 1}</h2>
            <button onClick={handleMarkReview} className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded border transition-all ${
              qState[activeQuestion].status === 'marked' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10'
            }`}>
              <Bookmark size={14} /> {qState[activeQuestion].status === 'marked' ? 'Unmark' : 'Mark for Review'}
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar prose prose-invert prose-purple max-w-none">
            <ReactMarkdown
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !match ? (
                    <code className="bg-white/10 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-black/60 p-4 rounded-xl border border-white/10 overflow-x-auto my-4 font-mono text-[13px]">
                      <code className={className} {...props}>{children}</code>
                    </pre>
                  );
                }
              }}
            >
              {qState[activeQuestion].description}
            </ReactMarkdown>

            {/* MCQ Options (If not coding) */}
            {!isCoding && qState[activeQuestion].options && (
              <div className="mt-8 space-y-3">
                {qState[activeQuestion].options.map((opt: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(activeQuestion, i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                      qState[activeQuestion].selectedOption === i
                        ? 'bg-purple-600/20 border-purple-500/50 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                        : 'bg-black/40 border-white/10 text-zinc-300 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      qState[activeQuestion].selectedOption === i ? 'border-purple-400 bg-purple-500/20' : 'border-zinc-500'
                    }`}>
                      {qState[activeQuestion].selectedOption === i && <div className="w-2.5 h-2.5 bg-purple-400 rounded-full" />}
                    </div>
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="p-4 border-t border-white/5 bg-black/40 flex justify-between shrink-0">
            <button 
              onClick={() => setActiveQuestion(Math.max(0, activeQuestion - 1))}
              disabled={activeQuestion === 0}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/10 disabled:opacity-30 flex items-center gap-2"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button 
              onClick={() => {
                if(qState[activeQuestion].status === 'not_visited' || qState[activeQuestion].status === 'unanswered') {
                  const nw = [...qState];
                  nw[activeQuestion].status = 'unanswered';
                  setQState(nw);
                }
                setActiveQuestion(Math.min(qState.length - 1, activeQuestion + 1));
              }}
              disabled={activeQuestion === qState.length - 1}
              className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-lg text-sm font-bold hover:bg-purple-600/30 disabled:opacity-30 flex items-center gap-2"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Side: Code Editor (if coding) OR Question Palette */}
        {isCoding ? (
          <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
            <div className="h-10 bg-[#2d2d2d] flex items-center px-4 shrink-0 border-b border-black">
              <span className="text-xs font-mono text-zinc-400">solution.js</span>
            </div>
            <div className="flex-1 p-4 font-mono text-[14px] leading-relaxed">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-transparent outline-none resize-none text-zinc-300 custom-scrollbar"
                spellCheck={false}
              />
            </div>
            <div className="h-14 bg-[#2d2d2d] border-t border-black flex items-center justify-end px-4 gap-3 shrink-0">
              <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-sm font-bold rounded transition-colors text-zinc-300">
                Run Code
              </button>
              <button className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-sm font-bold rounded transition-colors text-white shadow-sm flex items-center gap-1.5">
                <Play size={14} fill="currentColor" /> Submit Solution
              </button>
            </div>
          </div>
        ) : (
          <div className="w-1/4 bg-black/40 flex flex-col">
            <div className="p-4 border-b border-white/5 font-bold text-sm text-zinc-300">
              Question Palette
            </div>
            <div className="p-4 grid grid-cols-4 gap-2 overflow-y-auto custom-scrollbar">
              {qState.map((q, i) => {
                let bg = 'bg-white/5 border-white/10 text-zinc-400';
                if (q.status === 'answered') bg = 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
                if (q.status === 'marked') bg = 'bg-amber-500/20 border-amber-500/30 text-amber-400';
                if (q.status === 'unanswered' && i !== activeQuestion) bg = 'bg-rose-500/20 border-rose-500/30 text-rose-400';
                if (i === activeQuestion) bg = 'bg-purple-600 border-purple-500 text-white ring-2 ring-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.4)]';

                return (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestion(i)}
                    className={`aspect-square rounded-lg border font-bold text-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${bg}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="p-4 mt-auto border-t border-white/5 space-y-2 text-xs font-semibold text-zinc-400 bg-black/20">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" /> Answered</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-rose-500/20 border border-rose-500/30" /> Unanswered</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/30" /> Marked for Review</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/5 border border-white/10" /> Not Visited</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
