'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/store/settingsStore';

const SLIDES = [
  {
    title: 'Shadow Word',
    body: 'A social deduction word game for 2–16 players. One word pair, secret roles, and one clue per round.',
  },
  {
    title: 'Roles',
    body: 'Citizens see one word. Undercover see a similar word. Mr. White sees nothing. Vote to eliminate — but don\'t vote out your own!',
  },
  {
    title: 'Win',
    body: 'Citizens win by eliminating all Undercover and Mr. White. Undercover win by reaching the final 2. Mr. White wins by guessing the word when voted out.',
  },
];

interface OnboardingProps {
  onDone: () => void;
}

export function Onboarding({ onDone }: OnboardingProps) {
  const [index, setIndex] = useState(0);
  const setOnboardingDone = useSettingsStore((s) => s.setOnboardingDone);

  const handleNext = useCallback(() => {
    if (index >= SLIDES.length - 1) {
      setOnboardingDone(true);
      onDone();
    } else {
      setIndex((i) => i + 1);
    }
  }, [index, setOnboardingDone, onDone]);

  const handleSkip = useCallback(() => {
    setOnboardingDone(true);
    onDone();
  }, [setOnboardingDone, onDone]);

  const slide = SLIDES[index];

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-4">
            {slide.title}
          </h2>
          <p className="font-body text-[var(--text-secondary)] mb-8">
            {slide.body}
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-2 w-full max-w-sm">
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
        <Button variant="primary" fullWidth onClick={handleNext}>
          {index >= SLIDES.length - 1 ? 'Get started' : 'Next'}
        </Button>
      </div>
      <div className="flex gap-2 mt-6">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
