'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', glow, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`
          rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]
          [backdrop-filter:blur(12px)]
          ${glow ? 'shadow-[0_0_30px_rgba(124,58,237,0.15)]' : ''}
          ${className}
        `}
        style={{ background: 'rgba(28, 28, 40, 0.7)' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
