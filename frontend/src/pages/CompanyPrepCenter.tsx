import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, MapPin, Briefcase, IndianRupee, GraduationCap, Star, BrainCircuit, Users, Target, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const companies = [
  {
    id: 1,
    name: 'Google',
    industry: 'Technology',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
    locations: ['Bangalore', 'Hyderabad', 'Pune'],
    salary: '₹12L - ₹40L',
    rating: 4.5,
    hiring: ['Software Engineer', 'Data Scientist', 'Cloud Engineer'],
    rounds: ['Online Assessment', 'Technical Interview 1', 'Technical Interview 2', 'Googlyness Round'],
    eligibility: 'B.Tech/BE (CS/IT/EC), 7.0+ CGPA',
    skills: ['Algorithms', 'Data Structures', 'System Design', 'Java', 'Python'],
    color: 'from-blue-500/20 to-red-500/20'
  },
  {
    id: 2,
    name: 'Microsoft',
    industry: 'Technology',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    locations: ['Hyderabad', 'Bangalore', 'Noida'],
    salary: '₹14L - ₹45L',
    rating: 4.4,
    hiring: ['SDE', 'Support Engineer', 'Program Manager'],
    rounds: ['Coding Test', 'Technical Round 1', 'Technical Round 2', 'As-App Round'],
    eligibility: 'B.Tech/BE/M.Tech, 7.5+ CGPA',
    skills: ['C++', 'C#', 'Cloud Computing', 'System Architecture'],
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 3,
    name: 'Amazon',
    industry: 'E-Commerce',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    locations: ['Bangalore', 'Hyderabad', 'Chennai'],
    salary: '₹16L - ₹44L',
    rating: 4.2,
    hiring: ['SDE-1', 'Business Analyst', 'QAE'],
    rounds: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Bar Raiser'],
    eligibility: 'Any Degree, 6.5+ CGPA',
    skills: ['DSA', 'Java', 'AWS', 'Problem Solving'],
    color: 'from-orange-500/20 to-amber-500/20'
  },
  {
    id: 4,
    name: 'TCS',
    industry: 'IT Services',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    locations: ['Pan India'],
    salary: '₹3.36L - ₹7L',
    rating: 3.9,
    hiring: ['Ninja', 'Digital', 'Prime'],
    rounds: ['NQT', 'Technical Interview', 'HR Interview'],
    eligibility: 'B.Tech/BE/B.Sc, 6.0+ CGPA',
    skills: ['Java', 'Python', 'SQL', 'Aptitude'],
    color: 'from-blue-600/20 to-blue-400/20'
  }
];

export const CompanyPrepCenter = () => {
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null);
  const navigate = useNavigate();

  const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full flex flex-col space-y-6 animate-fade-in-up pb-8 relative">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <Building2 className="text-purple-400" size={32} />
            AI Company Database
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Research companies, understand their hiring patterns, and prepare with AI.</p>
        </div>
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900/60 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-sm text-zinc-200"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        
        {/* Company List */}
        <div className={`flex flex-col gap-4 overflow-y-auto custom-scrollbar transition-all duration-300 ${selectedCompany ? 'w-full lg:w-1/3 pr-2' : 'w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {filtered.map(company => (
            <div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`glass-panel border rounded-2xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                selectedCompany?.id === company.id 
                  ? 'bg-purple-900/10 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                  : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${company.color} rounded-full blur-3xl opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm shrink-0">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2 py-1 rounded-md text-xs font-bold border border-amber-500/20">
                  <Star size={12} className="fill-amber-400" /> {company.rating}
                </div>
              </div>
              
              <div className="mt-4 relative z-10">
                <h3 className="text-xl font-bold text-zinc-100">{company.name}</h3>
                <p className="text-xs text-zinc-400 font-medium">{company.industry}</p>
              </div>

              <div className="mt-4 space-y-2 relative z-10">
                <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                  <IndianRupee size={14} className="text-emerald-400 shrink-0" /> {company.salary}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium">
                  <MapPin size={14} className="text-rose-400 shrink-0" /> {company.locations.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Detail View */}
        <AnimatePresence>
          {selectedCompany && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="hidden lg:flex w-2/3 glass-panel rounded-[24px] border border-white/5 bg-black/20 shadow-2xl flex-col overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${selectedCompany.color} rounded-full blur-[100px] opacity-20 pointer-events-none`} />
              
              <div className="p-8 overflow-y-auto custom-scrollbar relative z-10">
                <div className="flex items-start gap-6 mb-8 border-b border-white/5 pb-8">
                  <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center p-4 shadow-xl shrink-0">
                    <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-extrabold text-white mb-2">{selectedCompany.name}</h2>
                    <div className="flex flex-wrap gap-3 text-sm font-semibold">
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-zinc-300">{selectedCompany.industry}</span>
                      <span className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg text-amber-400 flex items-center gap-1.5"><Star size={14} className="fill-amber-400"/> {selectedCompany.rating} Glassdoor</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col gap-2">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center gap-2">
                      <Target size={16} /> AI Prep Guide
                    </button>
                    <button onClick={() => navigate('/test-simulation', { state: { subject: 'Mock Test', topic: selectedCompany.name } })} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 justify-center">
                      <BrainCircuit size={16} /> Mock Assessment
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2 mb-4">
                        <Briefcase size={18} className="text-purple-400" /> Hiring Profiles
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.hiring.map(role => (
                          <span key={role} className="text-xs font-semibold px-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-zinc-300">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2 mb-4">
                        <GraduationCap size={18} className="text-emerald-400" /> Eligibility Criteria
                      </h3>
                      <p className="text-sm text-zinc-400 font-medium bg-black/40 border border-white/10 p-4 rounded-xl leading-relaxed">
                        {selectedCompany.eligibility}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2 mb-4">
                        <BookOpen size={18} className="text-blue-400" /> Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.skills.map(skill => (
                          <span key={skill} className="text-xs font-semibold px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2 mb-4">
                        <Users size={18} className="text-rose-400" /> Selection Process
                      </h3>
                      <div className="bg-black/40 border border-white/10 rounded-xl p-2">
                        {selectedCompany.rounds.map((round, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 border-b border-white/5 last:border-0 group hover:bg-white/5 rounded-lg transition-colors">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </div>
                            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{round}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <IndianRupee size={64} />
                      </div>
                      <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-1">Expected Package</h3>
                      <p className="text-3xl font-black text-white">{selectedCompany.salary}</p>
                      <p className="text-xs font-medium text-emerald-400/80 mt-2">Based on recent campus drives</p>
                    </div>
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
