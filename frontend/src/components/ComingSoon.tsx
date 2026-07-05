import { Sparkles } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  phase?: number;
}

export const ComingSoon = ({ title, description, icon, phase = 2 }: ComingSoonProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up space-y-6 text-center relative z-10">
      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)] animate-float">
        {icon}
      </div>
      <div className="max-w-md">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-2">
          {title} <Sparkles size={20} className="text-purple-400" />
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-3">
          {description}
        </p>
        <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-300 uppercase tracking-widest">
          In Development (Phase {phase})
        </span>
      </div>
      <button className="glass-button px-6 py-3 rounded-full text-zinc-200 font-semibold text-sm mt-4">
        Notify Me When Live
      </button>
    </div>
  );
};
