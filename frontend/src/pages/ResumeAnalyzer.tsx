import { useState, useRef } from 'react';

import { motion, } from 'framer-motion';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle,
  
  Target,
  PenTool,
  Wand2,
  
  Briefcase,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export const ResumeAnalyzer = () => {
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const [analysisMode, setAnalysisMode] = useState<'upload' | 'analyzing' | 'results' | 'improve'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock Analysis Result Data
  const [mockResult, setMockResult] = useState<any>(null);

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

  const generateMockAnalysis = () => {
    // Generate a random dynamic score for demonstration of "True AI ATS Engine"
    const score = Math.floor(Math.random() * (95 - 45 + 1)) + 45; 
    let tier = 'Poor';
    let color = 'text-rose-500';
    let bg = 'bg-rose-500/10 border-rose-500/20';
    if (score >= 90) { tier = 'Outstanding'; color = 'text-emerald-400'; bg = 'bg-emerald-500/10 border-emerald-500/20'; }
    else if (score >= 75) { tier = 'Excellent'; color = 'text-emerald-500'; bg = 'bg-emerald-500/10 border-emerald-500/20'; }
    else if (score >= 60) { tier = 'Good'; color = 'text-amber-400'; bg = 'bg-amber-500/10 border-amber-500/20'; }
    else if (score >= 40) { tier = 'Average'; color = 'text-orange-400'; bg = 'bg-orange-500/10 border-orange-500/20'; }

    setMockResult({
      score,
      tier,
      color,
      bg,
      strengths: ['Strong action verbs', 'Clear education section', 'Good keyword density (4.5%)'],
      weaknesses: ['Missing quantifiable metrics in experience', 'Summary is too generic'],
      missingSkills: ['System Design', 'Docker', 'Kubernetes'],
      missingKeywords: ['Agile', 'Scrum', 'CI/CD'],
      grammar: '2 minor punctuation errors found.',
      formatting: 'Good structure, but margins are slightly inconsistent.',
      readability: '8th Grade Level (Optimal)',
      atsProblems: 'No major ATS parsing errors. Table elements detected but successfully extracted.',
      hiringProbability: score >= 75 ? 'High' : 'Moderate',
      recruiterInterest: score >= 75 ? 'Very Interested' : 'Needs Improvement',
      estimatedSalary: '₹12L - ₹18L',
    });
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setAnalysisMode('analyzing');
    

    // Simulate Deep AI Analysis Delay
    setTimeout(() => {
      generateMockAnalysis();
      
      setAnalysisMode('results');
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <FileCheck className="text-purple-400" size={32} />
            True AI ATS Engine
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Enterprise-grade dynamic resume scoring and intelligence.</p>
        </div>
        {analysisMode === 'results' && (
          <button 
            onClick={() => setAnalysisMode('improve')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-105 transition-all"
          >
            <Wand2 size={18} /> Improve My Resume
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Upload / Status */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-[24px] border border-white/5 shadow-2xl flex flex-col relative overflow-hidden bg-black/20">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-lg font-bold text-zinc-100 mb-5 flex items-center gap-2 relative z-10">
              <UploadCloud className="text-purple-400" size={20} />
              Upload Resume
            </h2>

            <form onSubmit={handleAnalyze} className="space-y-4 flex-1 flex flex-col relative z-10">
              <motion.div
                whileHover={analysisMode === 'upload' ? { scale: 1.01 } : {}}
                whileTap={analysisMode === 'upload' ? { scale: 0.99 } : {}}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => analysisMode === 'upload' && fileInputRef.current?.click()}
                className={`flex-1 min-h-[240px] border-2 border-dashed rounded-[20px] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${
                  analysisMode !== 'upload' ? 'opacity-50 cursor-default border-zinc-700/50' :
                  isDragOver 
                    ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                    : file 
                      ? 'border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)] cursor-pointer' 
                      : 'border-zinc-700/50 hover:border-purple-500/50 bg-black/20 hover:bg-white/5 cursor-pointer'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  disabled={analysisMode !== 'upload'}
                />
                
                {file ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <FileText size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-100 max-w-[200px] truncate mx-auto">{file.name}</p>
                      <p className="text-xs text-zinc-400 mt-1 font-medium">Ready for deep analysis</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                      <UploadCloud size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-200">Drag & drop your file here</p>
                    </div>
                  </div>
                )}
              </motion.div>

              {analysisMode === 'upload' && (
                <button
                  type="submit"
                  disabled={!file}
                  className="w-full bg-purple-600/20 text-purple-300 hover:bg-purple-600/40 border border-purple-500/30 font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze with True ATS
                </button>
              )}
              {analysisMode !== 'upload' && (
                <button
                  type="button"
                  onClick={() => { setFile(null); setAnalysisMode('upload'); setMockResult(null); }}
                  className="w-full bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10 font-semibold py-3.5 rounded-xl transition-all"
                >
                  Upload New Resume
                </button>
              )}
            </form>
          </div>
          
          {mockResult && analysisMode === 'results' && (
            <div className="glass-panel p-6 rounded-[24px] border border-white/5 bg-black/20">
              <h3 className="font-bold text-zinc-100 mb-4 flex items-center gap-2"><Briefcase size={18} className="text-purple-400"/> AI Predictions</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-sm text-zinc-400 font-medium">Hiring Probability</span>
                  <span className="text-sm font-bold text-emerald-400">{mockResult.hiringProbability}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-sm text-zinc-400 font-medium">Recruiter Interest</span>
                  <span className="text-sm font-bold text-emerald-400">{mockResult.recruiterInterest}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-400 font-medium">Estimated Salary</span>
                  <span className="text-sm font-bold text-amber-400">{mockResult.estimatedSalary}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Analysis Results or Loading */}
        <div className="lg:col-span-2 space-y-6">
          
          {analysisMode === 'upload' && (
             <div className="glass-panel rounded-[24px] border border-white/5 bg-black/20 shadow-2xl flex flex-col items-center justify-center text-center p-16 min-h-[600px]">
              <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <FileCheck size={40} className="animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">True ATS Intelligence</h3>
              <p className="text-zinc-400 text-sm max-w-md font-medium leading-relaxed">
                Our engine uses deep semantic analysis to grade your resume on 20+ parameters including formatting, keyword density, and structural completeness.
              </p>
            </div>
          )}

          {analysisMode === 'analyzing' && (
            <div className="glass-panel rounded-[24px] border border-white/5 bg-black/20 shadow-2xl flex flex-col items-center justify-center text-center p-16 min-h-[600px] relative overflow-hidden">
               <div className="absolute inset-0 bg-purple-500/5 animate-pulse" />
               <Sparkles size={48} className="text-purple-400 animate-spin-slow mb-6" />
               <h3 className="text-xl font-bold text-zinc-100 mb-2">Running Deep Analysis...</h3>
               <div className="space-y-2 mt-4 text-sm font-semibold text-zinc-400">
                  <p className="animate-fade-in-up">Scanning formatting structure...</p>
                  <p className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>Extracting technical keywords...</p>
                  <p className="animate-fade-in-up" style={{animationDelay: '1s'}}>Calculating ATS match score...</p>
               </div>
            </div>
          )}

          {analysisMode === 'results' && mockResult && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel rounded-[24px] border border-white/5 bg-black/20 shadow-2xl p-8 min-h-[600px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
              
              {/* Dynamic Score Header */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-white/5">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                    <circle 
                      cx="80" cy="80" r="70" 
                      stroke="currentColor" 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray="439.8" 
                      strokeDashoffset={439.8 - (439.8 * mockResult.score) / 100}
                      strokeLinecap="round"
                      className={`${mockResult.color} transition-all duration-1500 ease-out`}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className={`text-5xl font-black ${mockResult.color}`}>{mockResult.score}</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">/100 ATS Score</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-white mb-2">{mockResult.tier} Resume</h2>
                  <p className="text-zinc-400 font-medium max-w-md leading-relaxed">
                    Based on our deep analysis, your resume is categorized as <strong className={mockResult.color}>{mockResult.tier}</strong>. See the detailed breakdown below.
                  </p>
                </div>
              </div>

              {/* Analysis Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Strengths */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6">
                  <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><CheckCircle2 size={18}/> Core Strengths</h3>
                  <ul className="space-y-3">
                    {mockResult.strengths.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Weaknesses */}
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6">
                  <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><AlertTriangle size={18}/> Critical Weaknesses</h3>
                  <ul className="space-y-3">
                    {mockResult.weaknesses.map((s: string, i: number) => (
                      <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Keywords & Skills */}
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-sm font-bold text-zinc-200 mb-3 flex items-center gap-2"><Target size={16} className="text-amber-400"/> Missing Technical Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockResult.missingSkills.map((k: string) => (
                      <span key={k} className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-lg">{k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-200 mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-blue-400"/> Missing Industry Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockResult.missingKeywords.map((k: string) => (
                      <span key={k} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-lg">{k}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Readability</span>
                  <span className="text-sm font-bold text-white">{mockResult.readability}</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">Grammar</span>
                  <span className="text-sm font-bold text-white">{mockResult.grammar}</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">ATS Parser Check</span>
                  <span className="text-sm font-bold text-emerald-400">{mockResult.atsProblems}</span>
                </div>
              </div>
            </motion.div>
          )}

          {analysisMode === 'improve' && mockResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-[24px] border border-purple-500/30 bg-black/40 shadow-[0_0_30px_rgba(168,85,247,0.1)] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20"><Wand2 size={120} className="text-purple-400" /></div>
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="p-3 bg-purple-500/20 border border-purple-500/40 rounded-xl text-purple-400">
                  <Wand2 size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Resume Generator</h2>
                  <p className="text-zinc-400 text-sm font-medium">Here are AI-optimized rewrites for your weak sections.</p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-purple-300 mb-3">Better Professional Summary</h3>
                  <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                    "Results-driven Software Engineer with expertise in full-stack development, cloud architecture, and building scalable systems. Proven ability to optimize application performance by 40% and lead agile teams to deliver robust enterprise solutions."
                  </p>
                  <button className="mt-3 text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"><PenTool size={14}/> Copy to clipboard</button>
                </div>

                <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-purple-300 mb-3">Optimized Bullet Points (Experience)</h3>
                  <ul className="space-y-3 text-sm text-zinc-200 font-medium">
                    <li>• Engineered a microservices architecture using Spring Boot, reducing API latency by 35% and improving system throughput.</li>
                    <li>• Orchestrated CI/CD pipelines with Jenkins and Docker, decreasing deployment time from 2 hours to 15 minutes.</li>
                    <li>• Collaborated with cross-functional teams to integrate System Design best practices into the core platform.</li>
                  </ul>
                  <button className="mt-3 text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"><PenTool size={14}/> Copy to clipboard</button>
                </div>

                <button onClick={() => setAnalysisMode('results')} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl font-bold text-white transition-all">
                  Back to Analysis Results
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};
