'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
  onTick?: () => void;
  size?: number;
  strokeWidth?: number;
}

export function CountdownTimer({
  seconds,
  onComplete,
  onTick,
  size = 80,
  strokeWidth = 6,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const t = setInterval(() => {
      setRemaining((r) => {
        const next = r - 1;
        if (next <= 0) {
          clearInterval(t);
          onComplete();
          return 0;
        }
        onTick?.();
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [remaining, onComplete, onTick]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (remaining / seconds) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </svg>
      <span
        className="absolute font-body text-xl font-bold text-[var(--text-primary)]"
        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
      >
        {remaining}
      </span>
    </div>
  );
}
