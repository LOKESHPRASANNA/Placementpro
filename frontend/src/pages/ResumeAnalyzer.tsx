import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Lightbulb, 
  Sparkles, 
  Award,
  AlertTriangle,
  History,
  Languages,
  UserCheck
} from 'lucide-react';

export const ResumeAnalyzer = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'skills' | 'suggestions' | 'grammar'>('summary');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = () => {
    api.get('/resume')
      .then(res => setResumes(res.data))
      .catch(console.error);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetRole', user?.targetGoal || '');

    try {
      await api.post('/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(null);
      fetchResumes();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const latestResume = resumes[0];

  const parseJsonArray = (str: string): string[] => {
    try {
      if (!str) return [];
      if (str.startsWith('[')) {
        return JSON.parse(str);
      }
      return [str];
    } catch (e) {
      return [str];
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <FileText className="text-purple-400" size={32} />
            Resume Analyzer
          </h1>
          <p className="text-zinc-400 text-sm mt-1">SaaS AI-powered ATS optimizer and resume evaluator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-lg font-bold text-zinc-100 mb-5 flex items-center gap-2 relative z-10">
              <UploadCloud className="text-purple-400" size={20} />
              Upload Resume
            </h2>

            <form onSubmit={handleAnalyze} className="space-y-4 flex-1 flex flex-col relative z-10">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 min-h-[240px] border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                  isDragOver 
                    ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                    : file 
                      ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                      : 'border-zinc-700/50 hover:border-purple-500/50 bg-black/20 hover:bg-white/5'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                />
                
                {file ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <FileText size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-100 max-w-[200px] truncate mx-auto">{file.name}</p>
                      <p className="text-xs text-zinc-400 mt-1 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                      <UploadCloud size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-200">Drag & drop your file here</p>
                      <p className="text-xs text-zinc-500 mt-1.5 font-medium">Supports PDF, DOCX, DOC up to 5MB</p>
                    </div>
                  </div>
                )}
              </motion.div>

              <button
                type="submit"
                disabled={loading || !file}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 flex justify-center items-center shadow-lg shadow-purple-500/20 border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white mr-3" />
                    Parsing & Analyzing...
                  </>
                ) : 'Analyze Resume'}
              </button>
            </form>
          </div>

          {/* History Panel */}
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20 shadow-xl">
            <h2 className="text-base font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <History size={18} className="text-purple-400" />
              Upload History
            </h2>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
              {resumes.map((res, i) => (
                <div key={res.id || i} className="p-3.5 rounded-[16px] bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-900/80 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                      <FileText size={16} className="text-zinc-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-zinc-200">Scan #{resumes.length - i}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">
                        {res.analyzedAt ? new Date(res.analyzedAt).toLocaleDateString() : 'Today'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg font-bold font-mono text-[11px] ${
                      res.atsScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]' : 
                      res.atsScore >= 60 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {res.atsScore}%
                    </span>
                  </div>
                </div>
              ))}
              {resumes.length === 0 && (
                <p className="text-zinc-500 text-xs text-center py-6 font-medium">No previous analysis scans found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {latestResume ? (
            <div className="glass-panel p-8 rounded-[24px] border border-white/5 shadow-2xl flex flex-col min-h-[500px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header metrics */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-6">
                  {/* Gauge */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="none" />
                      <circle 
                        cx="56" cy="56" r="48" 
                        stroke={latestResume.atsScore >= 80 ? '#10b981' : latestResume.atsScore >= 60 ? '#f59e0b' : '#ef4444'} 
                        strokeWidth="8" 
                        fill="none" 
                        strokeDasharray="301.59" 
                        strokeDashoffset={301.59 - (301.59 * latestResume.atsScore) / 100} 
                        strokeLinecap="round"
                        className="transition-all duration-1500 ease-out"
                      />
                    </svg>
                    <div className="absolute text-2xl font-extrabold font-mono text-zinc-100 tracking-tighter">
                      {latestResume.atsScore}%
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
                      ATS Optimization Score
                      <Sparkles size={20} className="text-purple-400 animate-pulse-glow" />
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1.5 font-medium">Target Role: <span className="text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{user?.targetGoal || 'SDE'}</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/10 border border-purple-500/20 p-3.5 rounded-xl text-xs shadow-lg">
                  <Award className="text-purple-400" size={18} />
                  <span className="text-purple-200 font-bold">Evaluation complete</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-3 border-b border-white/5 py-5 overflow-x-auto custom-scrollbar relative z-10">
                {(['summary', 'skills', 'suggestions', 'grammar'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-[12px] text-xs font-bold capitalize transition-all duration-300 shrink-0 ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="flex-1 pt-6 relative z-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'summary' && (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 text-sm leading-relaxed text-zinc-300"
                    >
                      <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-base">
                        <UserCheck size={18} className="text-purple-400" />
                        Professional Resume Summary
                      </h3>
                      <p className="bg-black/20 border border-white/5 p-6 rounded-[20px] shadow-inner text-[15px]">
                        {latestResume.summary || "No professional summary provided. Our AI evaluates the structure and summarizes your professional details here."}
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'skills' && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-8"
                    >
                      {/* Technical Skills */}
                      <div>
                        <h3 className="flex items-center text-sm text-emerald-400 font-bold mb-4 gap-2">
                          <CheckCircle2 size={18} /> Technical Skills Detected
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                          {parseJsonArray(latestResume.keywordsFound).map((kw, i) => (
                            <span key={i} className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold shadow-sm">
                              {kw}
                            </span>
                          ))}
                          {parseJsonArray(latestResume.keywordsFound).length === 0 && (
                            <p className="text-zinc-500 text-xs font-medium">No technical skills detected.</p>
                          )}
                        </div>
                      </div>

                      {/* Soft Skills */}
                      <div>
                        <h3 className="flex items-center text-sm text-indigo-400 font-bold mb-4 gap-2">
                          <Award size={18} /> Soft Skills Highlighted
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                          {parseJsonArray(latestResume.softSkills).map((kw, i) => (
                            <span key={i} className="px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-xs font-bold shadow-sm">
                              {kw}
                            </span>
                          ))}
                          {parseJsonArray(latestResume.softSkills).length === 0 && (
                            <p className="text-zinc-500 text-xs font-medium">No soft skills detected.</p>
                          )}
                        </div>
                      </div>

                      {/* Missing Keywords */}
                      <div>
                        <h3 className="flex items-center text-sm text-rose-400 font-bold mb-4 gap-2">
                          <AlertTriangle size={18} /> Missing Key Skills
                        </h3>
                        <div className="flex flex-wrap gap-2.5">
                          {parseJsonArray(latestResume.keywordsMissing).map((kw, i) => (
                            <span key={i} className="px-3.5 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs font-bold shadow-sm">
                              {kw}
                            </span>
                          ))}
                          {parseJsonArray(latestResume.keywordsMissing).length === 0 && (
                            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
                              <CheckCircle2 size={14} /> Excellent! Your resume covers all crucial keyword fields.
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'suggestions' && (
                    <motion.div
                      key="suggestions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5 text-sm"
                    >
                      <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-base">
                        <Lightbulb size={18} className="text-purple-400" />
                        Actionable Recommendations
                      </h3>
                      <div className="space-y-3.5">
                        {parseJsonArray(latestResume.suggestions).map((s, i) => (
                          <div key={i} className="flex gap-4 bg-black/20 border border-white/5 p-5 rounded-[20px] shadow-sm hover:bg-white/5 transition-colors">
                            <span className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-bold text-xs shadow-inner">
                              {i + 1}
                            </span>
                            <p className="text-zinc-300 font-medium leading-relaxed">{s}</p>
                          </div>
                        ))}
                        {parseJsonArray(latestResume.suggestions).length === 0 && (
                          <p className="text-zinc-500 text-xs font-medium">No improvement recommendations suggested.</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'grammar' && (
                    <motion.div
                      key="grammar"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 text-sm"
                    >
                      <h3 className="font-bold text-zinc-100 flex items-center gap-2 text-base">
                        <Languages size={18} className="text-purple-400" />
                        Grammar, Style & Tone
                      </h3>
                      <div className="bg-black/20 border border-white/5 p-6 rounded-[20px] shadow-inner">
                        <p className="text-zinc-300 leading-relaxed font-medium">
                          {latestResume.grammar || "Your grammar assessment details are presented here, identifying clarity, dynamic verb usages, or layout formatting advice."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          ) : (
            <div className="glass-panel rounded-[24px] border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center p-16 min-h-[500px]">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <FileText size={40} className="animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">No Resume Evaluation Data</h3>
              <p className="text-zinc-400 text-sm max-w-md mt-3 font-medium leading-relaxed">
                Drag and drop your PDF or Word document in the side panel to calculate an ATS score and get optimized recommendations.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
