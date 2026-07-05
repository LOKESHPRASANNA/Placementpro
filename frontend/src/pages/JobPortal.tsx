import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Search, Filter, MapPin, IndianRupee, Clock, Bookmark,  ChevronRight, Zap, Target,  ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Software Development Engineer',
    company: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    location: 'Bangalore, India (Hybrid)',
    type: 'Full-time',
    salary: '₹18L - ₹24L',
    posted: '2 hours ago',
    matchScore: 94,
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'DSA'],
    description: 'We are looking for a passionate SDE to build scalable distributed systems...',
    color: 'from-orange-500/20 to-amber-500/20'
  },
  {
    id: 2,
    title: 'Frontend Developer Intern',
    company: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    location: 'Hyderabad, India (Remote)',
    type: 'Internship',
    salary: '₹1L / month',
    posted: '5 hours ago',
    matchScore: 88,
    skills: ['React', 'TypeScript', 'CSS', 'Framer Motion'],
    description: 'Join the Google Workspace team to build next-generation UI components...',
    color: 'from-blue-500/20 to-red-500/20'
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    location: 'Noida, India (Hybrid)',
    type: 'Full-time',
    salary: '₹15L - ₹30L',
    posted: '1 day ago',
    matchScore: 72,
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    description: 'Leverage large language models to improve our enterprise search capabilities...',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 4,
    title: 'Backend Engineer (Fresher)',
    company: 'TCS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    location: 'Pune, India',
    type: 'Full-time',
    salary: '₹7L - ₹9L',
    posted: '2 days ago',
    matchScore: 98,
    skills: ['Java', 'SQL', 'Hibernate', 'REST APIs'],
    description: 'TCS Digital hiring for freshers with strong algorithmic skills...',
    color: 'from-blue-600/20 to-blue-400/20'
  }
];

export const JobPortal = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  const filters = ['All', 'Full-time', 'Internship', 'Remote', 'Top Matches'];

  const filteredJobs = jobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    if (activeFilter === 'All') return matchSearch;
    if (activeFilter === 'Top Matches') return matchSearch && j.matchScore >= 90;
    if (activeFilter === 'Remote') return matchSearch && j.location.includes('Remote');
    return matchSearch && j.type === activeFilter;
  });

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in-up pb-8 relative">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <Briefcase className="text-purple-400" size={32} />
            AI Job Portal
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Discover opportunities tailored to your skills with intelligent match scoring.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search jobs, skills, companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-sm text-zinc-200"
            />
          </div>
          <button className="glass-button bg-white/5 border border-white/10 p-2.5 rounded-xl text-zinc-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar shrink-0">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border ${
              activeFilter === filter
                ? 'bg-purple-600/20 text-purple-300 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                : 'bg-black/40 text-zinc-400 border-white/5 hover:bg-white/5 hover:text-zinc-200'
            }`}
          >
            {filter === 'Top Matches' && <Zap size={12} className="inline mr-1 text-amber-400" />}
            {filter}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        
        {/* Job List */}
        <div className={`flex flex-col gap-4 overflow-y-auto custom-scrollbar transition-all duration-300 ${selectedJob ? 'hidden md:flex w-full md:w-5/12 lg:w-1/3 pr-2' : 'w-full'}`}>
          {filteredJobs.map(job => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={`glass-panel border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden group flex flex-col ${
                selectedJob?.id === job.id 
                  ? 'bg-purple-900/10 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                  : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm shrink-0">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100 group-hover:text-purple-300 transition-colors leading-tight">{job.title}</h3>
                    <p className="text-sm font-semibold text-zinc-400">{job.company}</p>
                  </div>
                </div>
                <button className="text-zinc-500 hover:text-purple-400 transition-colors">
                  <Bookmark size={18} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/10 rounded-md text-zinc-300">
                  <MapPin size={10} /> {job.location.split(',')[0]}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400">
                  <IndianRupee size={10} /> {job.salary}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-400">
                  <Clock size={10} /> {job.type}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                  <Clock size={12} /> {job.posted}
                </span>
                
                {/* Match Score Badge */}
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                  job.matchScore >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  job.matchScore >= 75 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  <Target size={12} /> {job.matchScore}% Match
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Detail View */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full md:w-7/12 lg:w-2/3 glass-panel rounded-[24px] border border-white/5 bg-black/20 shadow-2xl flex flex-col overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${selectedJob.color} rounded-full blur-[100px] opacity-10 pointer-events-none`} />
              
              <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 p-8">
                
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="md:hidden flex items-center gap-1 text-zinc-400 hover:text-white text-sm font-semibold mb-6"
                >
                  <ChevronRight size={16} className="rotate-180" /> Back to jobs
                </button>

                {/* Detail Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-xl shrink-0">
                      <img src={selectedJob.logo} alt={selectedJob.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-white leading-tight">{selectedJob.title}</h2>
                      <p className="text-lg font-semibold text-zinc-400">{selectedJob.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-3 rounded-xl transition-all">
                      <Bookmark size={20} />
                    </button>
                    <button className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2">
                      Apply Now <ExternalLink size={16} />
                    </button>
                  </div>
                </div>

                {/* AI Matching Insights Box */}
                <div className="mb-8 p-6 rounded-2xl border bg-black/40 border-purple-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-2xl pointer-events-none" />
                  <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-4">
                    <SparklesIcon /> AI Match Insights
                  </h3>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative w-20 h-20 shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                        <circle 
                          cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" 
                          strokeDasharray={226.2} 
                          strokeDashoffset={226.2 - (226.2 * selectedJob.matchScore) / 100}
                          className={selectedJob.matchScore >= 90 ? 'text-emerald-500' : selectedJob.matchScore >= 75 ? 'text-amber-500' : 'text-rose-500'}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-black text-white">{selectedJob.matchScore}%</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300 font-medium leading-relaxed">
                        Your profile is an <strong>Excellent Match</strong> for this role! Your recent Mock Interview score (92%) and your strong background in Java make you a highly competitive candidate.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-zinc-400">Required Skills</span>
                      <span className="text-emerald-400">4 / 5 matched</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill, i) => (
                        <div key={skill} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          i < 4 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        }`}>
                          {i < 4 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />} {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-4">Job Description</h3>
                    <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                      {selectedJob.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

// Helper Sparkles icon since it wasn't in the import list from lucide-react above
const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
);
