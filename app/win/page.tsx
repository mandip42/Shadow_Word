'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ConfettiBlast } from '@/components/ui/ConfettiBlast';
import { RoleBadge } from '@/components/game/RoleBadge';
import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const winnerConfig = {
  citizens: { title: 'Citizens win!', color: 'var(--success)' },
  spy: { title: 'Spy wins!', color: 'var(--danger)' },
  ghost: { title: 'Ghost wins!', color: 'var(--text-secondary)' },
};

export default function WinPage() {
  const winner = useGameStore((s) => s.winner);
  const winReason = useGameStore((s) => s.winReason);
  const players = useGameStore((s) => s.players);
  const wordPair = useGameStore((s) => s.wordPair);
  const ghostGuess = useGameStore((s) => s.ghostGuess);
  const { win: playWinSound } = useSound();
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    playWinSound();
    const t = setTimeout(() => setConfetti(false), 4000);
    return () => clearTimeout(t);
  }, [playWinSound]);

  if (!winner) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-md space-y-6"
      >
        <h1 className="font-display text-2xl font-semibold">Game over</h1>
        <Link href="/">
          <Button variant="primary" fullWidth>Back to home</Button>
        </Link>
      </motion.div>
    );
  }

  const config = winnerConfig[winner];
  const winnerPlayers = players.filter(
    (p) =>
      (winner === 'citizens' && p.role === 'citizen') ||
      (winner === 'spy' && p.role === 'spy') ||
      (winner === 'ghost' && p.role === 'ghost')
  );

  return (
    <>
      <ConfettiBlast active={confetti} />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-md space-y-6"
      >
        <p className="text-center font-body text-sm uppercase tracking-widest text-[var(--text-secondary)]">
          And the winner is…
        </p>
        <h1
          className="font-display text-4xl font-bold text-center"
          style={{ color: config.color }}
        >
          {config.title}
        </h1>
        <p className="text-center font-body text-[var(--text-secondary)]">
          {winReason}
        </p>
        {/* Reveal correct word and Ghost's guess when Ghost won, or when Citizens won and the Ghost had a turn to guess */}
        {(wordPair || ghostGuess) && (winner === 'ghost' || winner === 'citizens') && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 [backdrop-filter:blur(12px)]">
            <p className="mb-2 font-body text-sm font-medium text-[var(--text-secondary)]">
              Words
            </p>
            <p className="font-body text-[var(--text-primary)]">
              Correct word: <strong className="text-[var(--primary-light)]">{wordPair?.wordA ?? '—'}</strong>
            </p>
            <p className="mt-1 font-body text-[var(--text-primary)]">
              Ghost guessed: <strong className="text-[var(--text-secondary)]">{ghostGuess ?? '—'}</strong>
            </p>
          </div>
        )}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 [backdrop-filter:blur(12px)]">
          <p className="mb-2 font-body text-sm font-medium text-[var(--text-secondary)]">
            Winners
          </p>
          {winnerPlayers.map((p) => (
            <div key={p.id} className="flex items-center gap-2 py-1">
              <RoleBadge role={p.role} size="sm" />
              <span className="font-body text-[var(--text-primary)]">{p.name}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href="/" className="flex-1">
            <Button variant="ghost" fullWidth>Home</Button>
          </Link>
          <Link href="/setup" className="flex-1">
            <Button variant="primary" fullWidth>Play again</Button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
