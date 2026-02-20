'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, BookOpen, Settings, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Onboarding } from '@/components/ui/Onboarding';
import { useSettingsStore } from '@/store/settingsStore';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function HomePage() {
  const theme = useSettingsStore((s) => s.theme);
  const onboardingDone = useSettingsStore((s) => s.onboardingDone);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setShowOnboarding(!onboardingDone);
  }, [onboardingDone]);

  if (showOnboarding && !onboardingDone) {
    return <Onboarding onDone={() => setShowOnboarding(false)} />;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-8 py-4 sm:py-8"
    >
      <motion.h1
        className="font-display text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl text-center"
        style={{ fontFamily: 'var(--font-playfair), serif' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Shadow Word
      </motion.h1>
      <motion.p
        className="text-center font-body text-[var(--text-secondary)] text-base sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        The ultimate social deduction word game
      </motion.p>

      <div className="flex w-full max-w-sm flex-col gap-3 sm:gap-4">
        <Link href="/setup" className="w-full">
          <Button variant="primary" fullWidth className="flex items-center justify-center gap-2">
            <Play size={20} />
            Play
          </Button>
        </Link>
        <Link href="/how-to-play" className="w-full">
          <Button variant="ghost" fullWidth className="flex items-center justify-center gap-2">
            <BookOpen size={20} />
            How to Play
          </Button>
        </Link>
        <Link href="/leaderboard" className="w-full">
          <Button variant="ghost" fullWidth className="flex items-center justify-center gap-2">
            <Trophy size={20} />
            Leaderboard
          </Button>
        </Link>
        <Link href="/settings" className="w-full">
          <Button variant="ghost" fullWidth className="flex items-center justify-center gap-2">
            <Settings size={20} />
            Settings
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
