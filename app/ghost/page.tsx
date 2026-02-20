'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function GhostPage() {
  const router = useRouter();
  const submitGhostGuess = useGameStore((s) => s.submitGhostGuess);
  const wordPair = useGameStore((s) => s.wordPair);
  const [guess, setGuess] = useState('');

  const citizenWord = wordPair?.wordA ?? '';

  const handleSubmit = useCallback(() => {
    submitGhostGuess(guess.trim());
    // Only go to win screen if game ended; if Spy still exist, game continues to next round
    const { gamePhase } = useGameStore.getState();
    if (gamePhase === 'ended') {
      router.push('/win');
    } else {
      router.push('/game');
    }
  }, [guess, submitGhostGuess, router]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-md space-y-6"
    >
      <h1 className="font-display text-2xl font-semibold">Ghost&apos;s guess</h1>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        You were eliminated as Ghost. Guess the Citizens&apos; word to win!
      </p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess..."
        className="min-h-[48px] w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 font-body text-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
        autoFocus
      />
      <Button
        variant="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={!guess.trim()}
      >
        Submit guess
      </Button>
    </motion.div>
  );
}
