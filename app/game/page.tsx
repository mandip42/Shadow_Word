'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { PlayerListItem } from '@/components/game/PlayerListItem';
import { useGameStore } from '@/store/gameStore';
import { getAlivePlayers } from '@/utils/winConditions';
import { useSound } from '@/hooks/useSound';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function GamePage() {
  const router = useRouter();
  const players = useGameStore((s) => s.players);
  const currentRound = useGameStore((s) => s.currentRound);
  const currentSpeakerIndex = useGameStore((s) => s.currentSpeakerIndex);
  const settings = useGameStore((s) => s.settings);
  const gamePhase = useGameStore((s) => s.gamePhase);
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const [timerDone, setTimerDone] = useState(false);
  const { tick } = useSound();

  const alive = getAlivePlayers(players);
  const timerSeconds = settings?.timerSeconds ?? 0;
  const currentSpeaker = alive[speakerIndex];

  // Discussion starts from a random player each time; round 1 never starts with Ghost (they have no word)
  useEffect(() => {
    if (gamePhase !== 'discussion') return;
    setTimerDone(false);
    const currentAlive = getAlivePlayers(useGameStore.getState().players);
    if (currentAlive.length === 0) return;
    if (currentRound === 1) {
      const nonGhostIndices = currentAlive
        .map((p, i) => i)
        .filter((i) => currentAlive[i].role !== 'ghost');
      const start = nonGhostIndices.length > 0
        ? nonGhostIndices[Math.floor(Math.random() * nonGhostIndices.length)]
        : 0;
      setSpeakerIndex(start);
    } else {
      setSpeakerIndex(Math.floor(Math.random() * currentAlive.length));
    }
  }, [gamePhase, currentRound]);

  const handleNextSpeaker = useCallback(() => {
    if (speakerIndex >= alive.length - 1) {
      router.push('/vote');
    } else {
      setSpeakerIndex((i) => i + 1);
      setTimerDone(false);
    }
  }, [speakerIndex, alive.length, router]);

  const handleSkipToVote = useCallback(() => {
    router.push('/vote');
  }, [router]);

  if (gamePhase !== 'discussion' && gamePhase !== 'reveal') {
    if (gamePhase === 'ghost') router.replace('/ghost');
    else router.replace('/');
    return null;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pb-4"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold">Round {currentRound}</h1>
        {timerSeconds > 0 && (
          <CountdownTimer
            key={`${currentRound}-${speakerIndex}`}
            seconds={timerSeconds}
            onComplete={() => setTimerDone(true)}
            onTick={tick}
          />
        )}
      </div>

      <p className="font-body text-sm text-[var(--text-secondary)]">
        Give one clue without saying your word. Who&apos;s the most suspicious?
      </p>

      <div className="space-y-2">
        {alive.map((p, i) => (
          <PlayerListItem
            key={p.id}
            player={p}
            highlighted={i === speakerIndex}
          />
        ))}
      </div>

      {currentSpeaker && (
        <div className="rounded-xl border border-[var(--primary)] bg-[var(--primary)]/10 p-4">
          <p className="text-center font-body text-sm text-[var(--text-secondary)]">
            Now speaking
          </p>
          <p className="text-center font-display text-lg font-semibold text-[var(--primary-light)]">
            {currentSpeaker.name}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="ghost" fullWidth onClick={handleSkipToVote}>
          Skip to eliminate
        </Button>
        <Button variant="primary" fullWidth onClick={handleNextSpeaker}>
          {speakerIndex >= alive.length - 1 ? 'Choose who to eliminate' : 'Next speaker'}
        </Button>
      </div>
    </motion.div>
  );
}
