'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PlayerListItem } from '@/components/game/PlayerListItem';
import { useGameStore } from '@/store/gameStore';
import { getAlivePlayers } from '@/utils/winConditions';
import { useHaptics } from '@/hooks/useHaptics';
import { useSound } from '@/hooks/useSound';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function VotePage() {
  const router = useRouter();
  const players = useGameStore((s) => s.players);
  const chooseToEliminate = useGameStore((s) => s.chooseToEliminate);
  const { light } = useHaptics();
  const { vote } = useSound();

  const alive = getAlivePlayers(players);

  const handleSelect = useCallback(
    (playerId: string) => {
      chooseToEliminate(playerId);
      light();
      vote();
      router.push('/elimination');
    },
    [chooseToEliminate, light, vote, router]
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pb-4"
    >
      <h1 className="font-display text-2xl font-semibold">Eliminate</h1>
      <p className="font-body text-sm text-[var(--text-secondary)]">
        Who did the group decide to eliminate? Tap that player.
      </p>

      <div className="space-y-2">
        {alive.map((p) => (
          <PlayerListItem
            key={p.id}
            player={p}
            onSelect={() => handleSelect(p.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
