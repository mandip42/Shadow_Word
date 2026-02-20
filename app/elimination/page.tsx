'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { RoleBadge } from '@/components/game/RoleBadge';
import { useGameStore } from '@/store/gameStore';
import { useSound } from '@/hooks/useSound';

const pageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default function EliminationPage() {
  const router = useRouter();
  const lastEliminatedId = useGameStore((s) => s.lastEliminatedId);
  const players = useGameStore((s) => s.players);
  const gamePhase = useGameStore((s) => s.gamePhase);
  const eliminatePlayer = useGameStore((s) => s.eliminatePlayer);
  const { eliminate } = useSound();

  const eliminated = lastEliminatedId ? players.find((p) => p.id === lastEliminatedId) : null;

  useEffect(() => {
    eliminate();
  }, [eliminate]);

  const handleContinue = () => {
    if (!lastEliminatedId) return;
    eliminatePlayer(lastEliminatedId);
    const nextPhase = useGameStore.getState().gamePhase;
    if (nextPhase === 'mrwhite') router.push('/mrwhite');
    else if (nextPhase === 'ended') router.push('/win');
    else router.push('/game');
  };

  if (!eliminated) {
    router.replace('/game');
    return null;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-md flex-col items-center gap-8"
    >
      <h1 className="font-display text-2xl font-semibold text-[var(--danger)]">
        Eliminated
      </h1>
      <motion.div
        className="w-full rounded-2xl border-2 border-[var(--danger)] bg-[var(--bg-card)] p-6 text-center [backdrop-filter:blur(12px)]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="mb-2 font-body text-lg font-semibold text-[var(--text-primary)]">
          {eliminated.name}
        </p>
        <RoleBadge role={eliminated.role} />
        {eliminated.word && (
          <p className="mt-3 font-display text-xl font-bold text-[var(--primary-light)]">
            Word: {eliminated.word}
          </p>
        )}
      </motion.div>
      <Button variant="primary" fullWidth onClick={handleContinue}>
        Continue
      </Button>
    </motion.div>
  );
}
