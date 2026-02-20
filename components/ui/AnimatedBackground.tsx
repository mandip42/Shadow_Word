'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, var(--primary) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, var(--accent) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, var(--primary-light) 0%, transparent 60%)
          `,
        }}
      />
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'var(--primary)',
          left: '10%',
          top: '20%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'var(--accent)',
          right: '15%',
          bottom: '25%',
        }}
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
