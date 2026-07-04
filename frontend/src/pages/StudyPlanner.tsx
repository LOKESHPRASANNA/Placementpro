import { useState, useEffect } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, CheckCircle, Circle, Trash2, Trophy, Play, Pause, RotateCcw } from 'lucide-react';

export const StudyPlanner = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

  // Pomodoro Timer States
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMode, setTimerMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      if (timerMode === 'focus') {
        alert("Focus session complete! Take a 5-minute break.");
        setTimerMode('break');
        setTimerSeconds(5 * 60);
      } else {
        alert("Break complete! Ready to focus?");
        setTimerMode('focus');
        setTimerSeconds(25 * 60);
      }
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, timerMode]);

  const fetchTasks = () => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(console.error);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setLoading(true);
    try {
      const res = await api.post('/tasks', { title: newTask });
      setTasks([...tasks, res.data]);
      setNewTask('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: number) => {
    try {
      const res = await api.put(`/tasks/${taskId}/toggle`);
      setTasks(tasks.map(t => t.id === taskId ? res.data : t));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(timerMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <Calendar className="text-purple-400" size={32} />
            Pomodoro Planner
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Focus and plan your preparation schedules with customizable timers</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Task List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 rounded-[24px] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <form onSubmit={handleCreateTask} className="flex space-x-4 mb-8 relative z-10">
              <input
                type="text"
                className="flex-1 pl-6 pr-6 py-4 bg-zinc-900/80 border border-white/10 rounded-[16px] focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-[15px] placeholder-zinc-500 shadow-inner text-zinc-100"
                placeholder="Add a new goal to focus on today..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !newTask.trim()}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 rounded-[16px] transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-500/20 disabled:opacity-50 hover:scale-105 active:scale-95"
              >
                <Plus size={24} />
              </button>
            </form>

            <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
              <AnimatePresence>
                {tasks.map(task => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-4.5 rounded-[16px] flex items-center justify-between border transition-all duration-300 ${
                      task.completed 
                        ? 'bg-purple-950/20 border-purple-500/20 opacity-75' 
                        : 'bg-black/40 border-white/5 hover:border-white/10 shadow-sm'
                    }`}
                  >
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="flex items-center space-x-4 flex-1 text-left py-1"
                    >
                      {task.completed ? (
                        <CheckCircle size={22} className="text-purple-400 flex-shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-full" />
                      ) : (
                        <Circle size={22} className="text-zinc-500 flex-shrink-0 hover:text-purple-400 transition-colors" />
                      )}
                      <span className={`text-[15px] font-medium tracking-wide ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                        {task.title}
                      </span>
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-2.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {tasks.length === 0 && (
                <div className="text-center py-20 text-zinc-500">
                  <Calendar size={56} className="mx-auto mb-5 opacity-40 text-purple-400" />
                  <p className="text-base font-bold text-zinc-300">Your planner is empty</p>
                  <p className="text-sm text-zinc-500 mt-2 font-medium">Add tasks above to organize your goals.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Status & Interactive Pomodoro */}
        <div className="space-y-6">
          
          {/* Progress Card */}
          <div className="glass-panel p-8 rounded-[24px] border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-black/40 to-black/40 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-lg font-bold text-zinc-100 mb-2 flex items-center gap-2 relative z-10">
              <Trophy className="text-purple-400" size={20} /> Today's Completion
            </h2>
            <div className="mt-8 mb-3 flex justify-between text-sm font-bold text-zinc-400 relative z-10">
              <span className="text-zinc-200">{completedCount} Completed</span>
              <span>{tasks.length} Total</span>
            </div>
            
            <div className="h-3 bg-black/50 border border-white/5 rounded-full overflow-hidden relative z-10 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              />
            </div>
            
            <p className="mt-5 text-sm font-medium text-zinc-400 relative z-10 leading-relaxed">
              {progress === 100 && tasks.length > 0 
                ? "Perfect score! All daily goals completed. Time to rest!" 
                : "Structure goals to track daily progress effectively."}
            </p>
          </div>

          {/* Interactive Pomodoro Timer */}
          <div className="glass-panel p-8 rounded-[24px] border border-white/5 flex flex-col items-center shadow-2xl relative overflow-hidden bg-black/40">
            <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="font-bold text-zinc-200 text-base mb-6 capitalize flex items-center gap-2 relative z-10">
              <span className={`w-2.5 h-2.5 rounded-full ${timerActive ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
              {timerMode} Session
            </h3>
            <div className="flex flex-col items-center justify-center w-full relative z-10">
              <div className="text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 to-zinc-500 mb-8 bg-black/50 border border-white/5 px-8 py-5 rounded-[24px] shadow-inner">
                {formatTime(timerSeconds)}
              </div>
              
              <div className="flex space-x-4 w-full justify-center">
                <button 
                  onClick={() => setTimerActive(!timerActive)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center gap-2 text-sm uppercase transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {timerActive ? <Pause size={16} /> : <Play size={16} />}
                  {timerActive ? 'Pause' : 'Start'}
                </button>
                
                <button 
                  onClick={handleResetTimer}
                  className="bg-white/5 hover:bg-white/10 text-zinc-300 font-bold p-3.5 rounded-xl transition-all duration-200 border border-white/5 flex items-center justify-center hover:text-white"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
