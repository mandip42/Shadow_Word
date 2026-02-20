'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, History } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useGameStore } from '@/store/gameStore';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const winnerLabels: Record<string, string> = {
  citizens: 'Citizens',
  spy: 'Spy',
  ghost: 'Ghost',
  // backward compatibility for old persisted games
  undercover: 'Spy',
  mrwhite: 'Ghost',
};

export default function HistoryPage() {
  const loadPersisted = useGameStore((s) => s.loadPersisted);
  const gameHistory = useGameStore((s) => s.gameHistory);

  useEffect(() => {
    loadPersisted();
  }, [loadPersisted]);

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
          <History size={28} />
          Game history
        </h1>
      </div>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        Last 20 games
      </p>
      <Card className="p-4">
        {!gameHistory?.length ? (
          <p className="py-6 text-center font-body text-[var(--text-secondary)]">
            No games yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {gameHistory.map((g) => (
              <li
                key={g.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4"
              >
                <div className="flex justify-between">
                  <span className="font-body font-medium text-[var(--text-primary)]">
                    {winnerLabels[g.winner] ?? 'Unknown'} won
                  </span>
                  <span className="font-body text-xs text-[var(--text-secondary)]">
                    {new Date(g.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {g.winReason}
                </p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {g.playerCount} players
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  );
}
