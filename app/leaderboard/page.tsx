'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useGameStore } from '@/store/gameStore';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function LeaderboardPage() {
  const loadPersisted = useGameStore((s) => s.loadPersisted);
  const leaderboard = useGameStore((s) => s.leaderboard);

  useEffect(() => {
    loadPersisted();
  }, [loadPersisted]);

  const entries = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);

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
        <h1 className="font-display text-2xl font-semibold flex items-center gap-2">
          <Trophy size={28} className="text-[var(--warning)]" />
          Leaderboard
        </h1>
      </div>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        Wins across games (this device)
      </p>
      <Card className="p-4">
        {entries.length === 0 ? (
          <p className="py-6 text-center font-body text-[var(--text-secondary)]">
            No games played yet. Play to see wins here!
          </p>
        ) : (
          <ul className="space-y-3">
            {entries.map(([name, wins], i) => (
              <li
                key={name}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3"
              >
                <span className="font-body font-medium text-[var(--text-primary)]">
                  #{i + 1} {name}
                </span>
                <span className="font-body text-[var(--primary-light)]">
                  {wins} {wins === 1 ? 'win' : 'wins'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  );
}
