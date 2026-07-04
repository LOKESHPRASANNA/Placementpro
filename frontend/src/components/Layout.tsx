import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Map, 
  Video, 
  Calendar, 
  BarChart, 
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Layout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Chat', path: '/chat', icon: MessageSquare },
    { name: 'Resume Analyzer', path: '/resume', icon: FileText },
    { name: 'Roadmap', path: '/roadmap', icon: Map },
    { name: 'Mock Interview', path: '/interview', icon: Video },
    { name: 'Study Planner', path: '/planner', icon: Calendar },
    { name: 'Analytics', path: '/analytics', icon: BarChart },
  ];

  const getPageBackgrounds = () => {
    let bgImage = '/images/dashboard_bg.png';
    switch (location.pathname) {
      case '/dashboard':
        bgImage = '/images/dashboard_bg.png';
        break;
      case '/chat':
        bgImage = '/images/dashboard_bg.png';
        break;
      case '/resume':
        bgImage = '/images/dashboard_bg.png';
        break;
      case '/roadmap':
        bgImage = '/images/dashboard_bg.png';
        break;
      case '/interview':
        bgImage = '/images/interview_bg.png';
        break;
      case '/planner':
        bgImage = '/images/interview_bg.png';
        break;
      case '/analytics':
        bgImage = '/images/dashboard_bg.png';
        break;
      default:
        bgImage = '/images/dashboard_bg.png';
    }

    return (
      <>
        {/* Dynamic Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none opacity-[0.09]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Ambient Aurora Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-aurora-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-aurora-2" />
      </>
    );
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-[#f4f4f5] w-full overflow-hidden font-sans relative bg-grid">
      {/* Background Decorative glow */}
      {getPageBackgrounds()}

      {/* Sidebar */}
      <div className="w-72 glass-panel flex flex-col justify-between relative z-10 my-4 ml-4 rounded-[20px] shadow-2xl border-white/5 overflow-hidden">
        <div>
          {/* Logo Header */}
          <div className="p-6">
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse-glow" />
              PlacementPro <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono tracking-widest uppercase mt-1">AI</span>
            </h1>
          </div>
          
          {/* Nav Items */}
          <nav className="mt-4 px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex items-center justify-between group"
                >
                  <div
                    className={`flex items-center space-x-3 px-4 py-3.5 rounded-[16px] w-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/10 text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-purple-400' : 'text-zinc-500 group-hover:text-zinc-300 transition-colors'} />
                    <span className="font-medium text-[15px]">{item.name}</span>
                  </div>
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute right-3 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* User profile & Logout */}
        <div className="p-4 border-t border-white/5 bg-black/10">
          <div className="flex items-center space-x-3 px-3 py-3 rounded-[16px] border border-white/5 bg-white/5 mb-3 group hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/10">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-zinc-100">{user?.name || 'User Profile'}</p>
              <p className="text-xs text-zinc-400 truncate mt-0.5">{user?.major || 'SDE Aspirant'}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-[16px] transition-all duration-300 border border-transparent hover:border-rose-500/20"
          >
            <LogOut size={18} />
            <span className="font-medium text-[15px]">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 pl-2">
        {/* Top Navigation Bar */}
        <header className="h-20 flex items-center justify-between px-8 mt-4 mx-4 rounded-[20px] glass-panel border border-white/5 shadow-lg">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              {location.pathname === '/dashboard' ? `Welcome back, ${user?.name?.split(' ')[0] || 'User'} 👋` : navItems.find(i => i.path === location.pathname)?.name}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-zinc-400 group-focus-within:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="text" className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all w-64 placeholder-zinc-500" placeholder="Search resources, topics..." />
            </div>
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 mt-2 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-7xl mx-auto h-full pb-10"
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
