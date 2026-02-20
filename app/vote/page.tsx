'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { PlayerListItem } from '@/components/game/PlayerListItem';
import { VoteBar } from '@/components/game/VoteBar';
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
  const votes = useGameStore((s) => s.votes);
  const castVote = useGameStore((s) => s.castVote);
  const resolveVote = useGameStore((s) => s.resolveVote);
  const { light } = useHaptics();
  const { vote } = useSound();
  const [voterIndex, setVoterIndex] = useState(0);

  const alive = getAlivePlayers(players);
  const currentVoter = alive[voterIndex];
  const tally: Record<string, number> = {};
  alive.forEach((p) => (tally[p.id] = 0));
  Object.values(votes).forEach((targetId) => {
    if (tally[targetId] !== undefined) tally[targetId]++;
  });
  const totalVotes = Object.values(votes).length;
  const maxVotes = Math.max(...Object.values(tally), 1);
  const allVoted = totalVotes >= alive.length;

  const handleSelect = useCallback(
    (playerId: string) => {
      if (!currentVoter) return;
      castVote(currentVoter.id, playerId);
      light();
      vote();
      if (voterIndex < alive.length - 1) {
        setVoterIndex((i) => i + 1);
      }
    },
    [currentVoter, voterIndex, alive.length, castVote, light, vote]
  );

  const handleSubmit = useCallback(() => {
    if (totalVotes < alive.length) return;
    resolveVote();
    router.push('/elimination');
  }, [totalVotes, alive.length, resolveVote, router]);

  const selectedId = currentVoter ? votes[currentVoter.id] : '';

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pb-4"
    >
      <h1 className="font-display text-2xl font-semibold">Vote</h1>
      {!allVoted && currentVoter && (
        <p className="font-body text-sm text-[var(--text-secondary)]">
          Pass the phone to <strong className="text-[var(--primary-light)]">{currentVoter.name}</strong>. Tap a player to vote them out.
        </p>
      )}

      <div className="space-y-2">
        {alive.map((p) => (
          <PlayerListItem
            key={p.id}
            player={p}
            onSelect={currentVoter && !allVoted ? () => handleSelect(p.id) : undefined}
            selected={selectedId === p.id}
          />
        ))}
      </div>
      {!allVoted && currentVoter && (
        <p className="text-center font-body text-xs text-[var(--text-secondary)]">
          Voter {voterIndex + 1} of {alive.length}
        </p>
      )}

      {totalVotes > 0 && (
        <div className="space-y-3">
          <p className="font-body text-sm font-medium text-[var(--text-secondary)]">
            Vote tally
          </p>
          {alive.map((p) => (
            <VoteBar
              key={p.id}
              player={p}
              voteCount={tally[p.id] ?? 0}
              totalVotes={totalVotes}
              maxVotes={maxVotes}
            />
          ))}
        </div>
      )}

      {allVoted && (
        <Button variant="primary" fullWidth onClick={handleSubmit}>
          Confirm vote
        </Button>
      )}
    </motion.div>
  );
}
