'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Player } from '@/store/gameStore';
import { useHaptics } from '@/hooks/useHaptics';
import { useSound } from '@/hooks/useSound';
import { RoleBadge } from './RoleBadge';

interface RoleRevealCardProps {
  player: Player;
  onSeen: () => void;
  autoHideSeconds?: number;
}

export function RoleRevealCard({ player, onSeen, autoHideSeconds = 4 }: RoleRevealCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [autoHideDone, setAutoHideDone] = useState(false);
  const { medium } = useHaptics();
  const { reveal, cardFlip } = useSound();

  // Reset card state when moving to a new player so each person gets a fresh "tap to reveal"
  useEffect(() => {
    setFlipped(false);
    setAutoHideDone(false);
  }, [player.id]);

  const handleTap = useCallback(() => {
    if (flipped) return;
    setFlipped(true);
    medium();
    cardFlip();
    reveal();
  }, [flipped, medium, cardFlip, reveal]);

  const handleSeen = useCallback(() => {
    setAutoHideDone(true);
    onSeen();
  }, [onSeen]);

  return (
    <div className="perspective-[1000px] w-full max-w-[min(320px,90vw)]">
      <motion.div
        className="relative cursor-pointer select-none"
        style={{
          minHeight: '280px',
          transformStyle: 'preserve-3d',
        }}
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onTap={handleTap}
      >
        {/* Front: tap to reveal — no pointer events when flipped so back is clickable */}
        <div
          className="absolute inset-0 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] [backdrop-filter:blur(12px)] flex flex-col items-center justify-center gap-4 p-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            pointerEvents: flipped ? 'none' : 'auto',
          }}
        >
          <span className="font-body text-sm text-[var(--text-secondary)]">{player.name}</span>
          <span className="font-display text-center text-xl font-semibold text-[var(--text-primary)]">
            TAP TO REVEAL
          </span>
        </div>
        {/* Back: role + word — always receives pointer events when visible */}
        <div
          className="absolute inset-0 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 [backdrop-filter:blur(12px)] flex flex-col items-center justify-center gap-4"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            pointerEvents: flipped ? 'auto' : 'none',
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <span className="font-body text-sm text-[var(--text-secondary)]">
              {player.name}
            </span>
            {/* Undercover sees "Citizen" + their word so they don't know they're undercover */}
            <RoleBadge role={player.role === 'undercover' ? 'citizen' : player.role} />
            {player.word && (
              <p className="font-display text-center text-2xl font-bold text-[var(--primary-light)]">
                {player.word}
              </p>
            )}
            {player.role === 'mrwhite' && (
              <p className="text-center text-sm text-[var(--text-secondary)]">
                You see nothing. Guess the word when eliminated!
              </p>
            )}
            <AnimatePresence>
              {flipped && !autoHideDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 w-full flex justify-center"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSeen();
                    }}
                    className="min-h-[48px] min-w-[140px] rounded-xl bg-[var(--primary)] px-6 py-3 font-body text-sm font-semibold text-white shadow-lg hover:opacity-95 active:scale-[0.98] cursor-pointer"
                  >
                    I&apos;ve seen it
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
