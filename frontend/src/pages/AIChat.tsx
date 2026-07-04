import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AIChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get('/chat')
      .then(res => setMessages(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'USER', message: input, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { message: userMessage.message });
      setMessages(prev => [...prev, res.data]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        sender: 'AI', 
        message: 'Sorry, I encountered an error compiling response. Please try again.', 
        timestamp: new Date().toISOString() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] animate-fade-in-up">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
            <Bot className="text-purple-400" size={32} />
            AI Career Mentor
          </h1>
          <p className="text-zinc-400 text-sm mt-1">Ask for interview preparation, coding algorithms, or career advice.</p>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 glass-panel border border-white/5 rounded-[24px] overflow-hidden flex flex-col relative bg-black/20 shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-zinc-500 max-w-md mx-auto text-center relative z-10"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600/20 to-indigo-600/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400 animate-pulse-glow shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <Bot size={40} />
                </div>
                <h3 className="text-zinc-100 font-bold text-xl tracking-tight">Your AI Career Mentor is ready</h3>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed font-medium">
                  Ask questions about placement preparations, check coding solutions, get mock interview feedback, or seek career-related guidance.
                </p>
              </motion.div>
            )}
            
            {messages.map((msg, i) => (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={msg.id || i}
                className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[85%] ${msg.sender === 'USER' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    msg.sender === 'USER' 
                      ? 'bg-gradient-to-tr from-violet-600 to-indigo-600 ml-3 ring-2 ring-purple-500/20' 
                      : 'bg-zinc-900 border border-white/10 mr-3 text-purple-400 ring-2 ring-white/5'
                  }`}>
                    {msg.sender === 'USER' ? <UserIcon size={14} className="text-white" /> : <Bot size={14} />}
                  </div>
                  
                  <div className={`px-5 py-3.5 rounded-[20px] relative border ${
                    msg.sender === 'USER' 
                      ? 'bg-gradient-to-br from-purple-600/20 to-indigo-600/10 text-purple-100 border-purple-500/30 rounded-tr-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                      : 'bg-black/40 text-zinc-300 border-white/5 rounded-tl-sm shadow-sm'
                  }`}>
                    {/* Timestamp */}
                    <span className="absolute -bottom-5 right-1 text-[10px] text-zinc-600 font-mono tracking-wider font-semibold">
                      {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                    
                    {msg.sender === 'USER' ? (
                      <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.message}</p>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            code({ node, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '');
                              return !match ? (
                                <code className="bg-black/50 text-purple-300 px-1.5 py-0.5 rounded border border-white/10 text-xs font-mono" {...props}>
                                  {children}
                                </code>
                              ) : (
                                <pre className="bg-black/60 p-4 rounded-xl border border-white/10 overflow-x-auto my-3 font-mono text-[12px] text-zinc-300 leading-normal custom-scrollbar shadow-inner">
                                  <code className={className} {...props}>{children}</code>
                                </pre>
                              );
                            },
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-[15px] text-zinc-300">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2 text-[15px] text-zinc-300">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2 text-[15px] text-zinc-300">{children}</ol>,
                            li: ({ children }) => <li className="text-zinc-300 inline-block w-full">{children}</li>,
                          }}
                        >
                          {msg.message}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
            <div className="flex justify-start">
               <div className="flex items-start max-w-[80%] flex-row">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-900 border border-white/10 mr-3 text-purple-400 ring-2 ring-white/5">
                  <Bot size={14} />
                </div>
                <div className="px-5 py-4 rounded-[20px] bg-black/40 text-zinc-300 border border-white/5 rounded-tl-sm flex items-center space-x-2 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Footer Input Area */}
        <div className="p-5 border-t border-white/5 bg-black/40 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for interview prep, mock question reviews, coding guidelines..."
              className="w-full pl-6 pr-14 py-4 bg-zinc-900/80 border border-white/10 rounded-[16px] focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all shadow-inner text-[15px] placeholder-zinc-500 text-zinc-100"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2.5 p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-[12px] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-purple-600 shadow-[0_0_10px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
