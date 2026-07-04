import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth delay / trail effect
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if mouse is hovering over interactive elements
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.glass-card') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Glow outer ring (Trailing) */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
        }}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-screen bg-purple-500/15 border border-purple-500/30"
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.15)',
          borderColor: isHovered ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.3)',
          boxShadow: isHovered 
            ? '0 0 20px rgba(139, 92, 246, 0.5)' 
            : '0 0 10px rgba(139, 92, 246, 0.15)'
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.2 }}
      />
      {/* Inner dot */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
          // Offset to align center
          x: 12,
          y: 12,
        }}
        className="fixed w-2 h-2 rounded-full bg-purple-400 pointer-events-none z-50 shadow-[0_0_8px_#c084fc]"
        animate={{
          scale: isHovered ? 0.5 : 1.0,
        }}
        transition={{ type: 'tween', duration: 0.15 }}
      />
    </>
  );
};
