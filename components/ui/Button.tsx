'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_28px_rgba(124,58,237,0.5)] active:scale-[0.98] cursor-pointer',
  ghost:
    'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--border)] cursor-pointer',
  danger:
    'bg-[var(--danger)] text-white hover:opacity-90 active:scale-[0.98] cursor-pointer',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className = '', children, ...props }, ref) => {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={fullWidth ? 'w-full' : 'inline-block'}
      >
        <button
          ref={ref}
          type="button"
          className={`
            min-h-[48px] min-w-[48px] rounded-xl px-6 py-3 font-body text-base font-medium
            transition-all duration-300 ease-out
            disabled:opacity-50 disabled:pointer-events-none
            ${variantStyles[variant]}
            ${fullWidth ? 'w-full' : ''}
            ${className}
          `}
          style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
          {...props}
        >
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = 'Button';
