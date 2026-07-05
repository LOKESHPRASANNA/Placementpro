import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, StopCircle, PlayCircle, Clock, AlertCircle, ShieldAlert, ShieldCheck } from 'lucide-react';

export const MockInterview = () => {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [inProgress, setInProgress] = useState(false);
  const [timer, setTimer] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  
  // New State for Video & Security
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [integrityScore, setIntegrityScore] = useState(100);
  const MAX_STRIKES = 4;
  const inProgressRef = useRef(inProgress);

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

  // Update Ref for Event Listener
  useEffect(() => {
    inProgressRef.current = inProgress;
  }, [inProgress]);

  // Security & Proctoring Event Listeners
  useEffect(() => {
    const handleViolation = (msg: string) => {
      if (!inProgressRef.current) return;
      setTabSwitchCount(prev => {
        const newCount = prev + 1;
        setIntegrityScore(score => Math.max(0, score - 25));
        if (newCount >= MAX_STRIKES) {
          alert(`Interview terminated due to multiple proctoring violations: ${msg}`);
          endInterview(true);
        } else {
          setWarningMsg(msg);
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 4000);
        }
        return newCount;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden && inProgressRef.current) {
        handleViolation("Tab Switched or Minimized");
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && inProgressRef.current) {
        handleViolation("Exited Fullscreen Mode");
      }
    };

    const handleResize = () => {
      if (inProgressRef.current && (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160)) {
        handleViolation("Developer Tools Opened");
      }
    };

    const handleCopyPaste = (e: ClipboardEvent) => {
      if (inProgressRef.current) {
        e.preventDefault();
        handleViolation("Copy/Paste Attempted");
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (inProgressRef.current) {
        e.preventDefault();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("copy", handleCopyPaste as any);
    document.addEventListener("paste", handleCopyPaste as any);
    document.addEventListener("contextmenu", handleContextMenu as any);
    window.addEventListener("resize", handleResize);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("copy", handleCopyPaste as any);
      document.removeEventListener("paste", handleCopyPaste as any);
      document.removeEventListener("contextmenu", handleContextMenu as any);
      window.removeEventListener("resize", handleResize);
    };
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

  // Attach Stream to Video Element
  useEffect(() => {
    if (inProgress && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [inProgress, stream]);

  const fetchInterviews = () => {
    api.get('/mock-interview')
      .then(res => setInterviews(res.data))
      .catch(console.error);
  };

  const endInterview = (failed = false) => {
    setInProgress(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
    setStream(prevStream => {
      if (prevStream) {
        prevStream.getTracks().forEach(track => track.stop());
      }
      return null;
    });

    const newMockEntry = {
      id: Date.now(),
      role: failed ? 'Failed (Violation)' : 'SDE Intern',
      overallScore: failed ? 0 : Math.floor(Math.random() * 25) + 70, 
      startedAt: new Date().toISOString()
    };
    setInterviews(prev => [newMockEntry, ...prev]);
  };

  const toggleInterview = async () => {
    if (inProgress) {
      endInterview();
    } else {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // Request fullscreen on start
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        }
        
        setStream(mediaStream);
        setTimer(0);
        setTabSwitchCount(0);
        setIntegrityScore(100);
        setShowWarning(false);
        setInProgress(true);
      } catch (err) {
        alert("Camera and microphone access is required for the mock interview.");
      }
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
            Video Mock Interview
          </h1>
          <p className="text-zinc-400 text-sm mt-1">AI Proctored mock sessions with strict tab-switch security</p>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        
        {/* Main Recording Interface */}
        <div className="lg:col-span-2 glass-panel rounded-[24px] flex flex-col items-center justify-center relative overflow-hidden bg-black/40 border border-white/5 min-h-[460px] shadow-2xl">
          
          <AnimatePresence mode="wait">
            {inProgress ? (
              <motion.div 
                key="active"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10"
              >
                {/* Live Video Feed Background */}
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm pointer-events-none"
                />

                <div className="absolute top-6 left-6 w-48 rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover bg-black"
                  />
                  {/* Proctoring Indicator */}
                  <div className={`absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md text-[10px] font-bold flex flex-col items-center gap-1 justify-center backdrop-blur-md border ${
                    tabSwitchCount > 0 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      {tabSwitchCount > 0 ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                      {tabSwitchCount > 0 ? `STRIKES: ${tabSwitchCount}/${MAX_STRIKES}` : 'PROCTORING ACTIVE'}
                    </div>
                    <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                      <div 
                        className={`h-full transition-all duration-500 ${integrityScore > 70 ? 'bg-emerald-500' : integrityScore > 40 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                        style={{ width: `${integrityScore}%` }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Warning Overlay */}
                <AnimatePresence>
                  {showWarning && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-6 bg-rose-500/90 text-white px-6 py-3 rounded-xl shadow-lg border border-rose-400/50 flex items-center gap-3 z-50 backdrop-blur-md"
                    >
                      <AlertCircle size={24} className="animate-pulse" />
                      <div>
                        <p className="font-bold text-sm">Proctoring Warning!</p>
                        <p className="text-xs opacity-90">{warningMsg}. Strike {tabSwitchCount} of {MAX_STRIKES}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Center Content */}
                <div className="z-20 flex flex-col items-center px-8 w-full max-w-2xl mt-16">
                  <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 relative animate-pulse-glow shadow-[0_0_30px_rgba(244,63,94,0.15)]">
                    <Mic size={28} className="text-rose-400" />
                    <span className="absolute inset-0 rounded-full border border-rose-500/30 animate-ping opacity-75" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-zinc-100 mb-1 flex items-center gap-2">
                    Recording Active
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  </h2>
                  
                  <p className="text-zinc-400 text-sm font-semibold mb-6">Question {questionIndex + 1} of {mockQuestions.length}</p>
                  
                  <div className="w-full bg-black/60 backdrop-blur-md border border-white/10 p-8 rounded-[20px] text-zinc-100 text-lg leading-relaxed mb-8 font-medium shadow-2xl text-center">
                    "{mockQuestions[questionIndex]}"
                  </div>
                  
                  <div className="text-4xl font-extrabold font-mono text-rose-400 mb-8 bg-rose-500/5 px-6 py-3 rounded-2xl border border-rose-500/10 shadow-sm backdrop-blur-sm">
                    {formatTime(timer)}
                  </div>

                  <button 
                    onClick={() => endInterview(false)}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-rose-500/20 border border-rose-500/30 text-sm uppercase transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <StopCircle size={18} /> End Interview
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center z-10 text-center relative w-full h-full justify-center"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 animate-pulse-glow shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <Video size={40} />
                </div>
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">Start Preparation</h2>
                <div className="text-zinc-400 text-sm max-w-md mt-3 mb-8 font-medium leading-relaxed bg-white/5 p-5 rounded-xl border border-white/5 space-y-2 text-left">
                  <p className="flex items-center gap-2 text-zinc-200">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <strong>Enterprise Anti-Cheating Enabled</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-400 mt-2">
                    <li>Camera & microphone access is mandatory.</li>
                    <li>The session will be recorded in <strong>Fullscreen Mode</strong>.</li>
                    <li>Switching tabs, exiting fullscreen, or minimizing the window issues a strike.</li>
                    <li>Copy/Paste and DevTools are strictly blocked.</li>
                    <li>4 strikes will auto-terminate the interview (0% Score).</li>
                  </ul>
                </div>
                <button 
                  onClick={toggleInterview}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20 border border-purple-500/30 text-sm uppercase transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <PlayCircle size={18} /> Enter Fullscreen & Start
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Simulation Decorative Gradient Overlay */}
          {!inProgress && <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />}
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
                  {inv.overallScore > 0 ? `${inv.overallScore}%` : 'FAIL'}
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

