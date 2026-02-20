'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useSettingsStore } from '@/store/settingsStore';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function SettingsPage() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const setSoundEnabled = useSettingsStore((s) => s.setSoundEnabled);
  const setHapticsEnabled = useSettingsStore((s) => s.setHapticsEnabled);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-md space-y-6"
    >
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between py-2">
          <span className="font-body text-[var(--text-primary)]">Theme</span>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between border-t border-[var(--border)] py-4">
          <span className="font-body text-[var(--text-primary)]">Sound effects</span>
          <button
            type="button"
            role="switch"
            aria-checked={soundEnabled}
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`relative h-8 w-14 rounded-full transition-colors ${
              soundEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                soundEnabled ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--border)] py-4">
          <span className="font-body text-[var(--text-primary)]">Haptic feedback</span>
          <button
            type="button"
            role="switch"
            aria-checked={hapticsEnabled}
            onClick={() => setHapticsEnabled(!hapticsEnabled)}
            className={`relative h-8 w-14 rounded-full transition-colors ${
              hapticsEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                hapticsEnabled ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </Card>

      <Link href="/history">
        <Card className="block p-4 font-body text-[var(--text-primary)]">
          Game history
        </Card>
      </Link>
      <Link href="/settings/custom-words">
        <Card className="block p-4 font-body text-[var(--text-primary)]">
          Custom word pairs
        </Card>
      </Link>
    </motion.div>
  );
}
