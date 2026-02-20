'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import { RoleRevealCard } from '@/components/game/RoleRevealCard';
import { Button } from '@/components/ui/Button';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function RevealPage() {
  const router = useRouter();
  const players = useGameStore((s) => s.players);
  const currentRevealIndex = useGameStore((s) => s.currentRevealIndex);
  const advanceReveal = useGameStore((s) => s.advanceReveal);

  const currentPlayer = players[currentRevealIndex];
  const isLast = currentRevealIndex >= players.length - 1;

  const handleSeen = useCallback(() => {
    if (isLast) {
      router.push('/game');
    } else {
      advanceReveal();
    }
  }, [isLast, advanceReveal, router]);

  if (!currentPlayer) {
    router.replace('/game');
    return null;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="flex min-h-[70vh] sm:min-h-[60vh] flex-col items-center justify-center gap-8 py-6"
    >
      <p className="font-body text-base text-[var(--text-secondary)] text-center px-2">
        Pass the phone to <strong className="text-[var(--text-primary)]">{currentPlayer.name}</strong>
      </p>
      <div className="w-full flex justify-center px-2">
        <RoleRevealCard key={currentPlayer.id} player={currentPlayer} onSeen={handleSeen} autoHideSeconds={4} />
      </div>
      <p className="text-center font-body text-sm text-[var(--text-secondary)]">
        {currentRevealIndex + 1} of {players.length}
      </p>
    </motion.div>
  );
}
