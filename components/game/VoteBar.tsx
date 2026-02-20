'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Player } from '@/store/gameStore';

interface VoteBarProps {
  player: Player;
  voteCount: number;
  totalVotes: number;
  maxVotes: number;
}

export const VoteBar = memo(function VoteBar({
  player,
  voteCount,
  totalVotes,
  maxVotes,
}: VoteBarProps) {
  const width = maxVotes > 0 ? (voteCount / maxVotes) * 100 : 0;

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-body text-[var(--text-primary)] truncate max-w-[60%]">
          {player.name}
        </span>
        <span className="text-[var(--text-secondary)]">
          {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[var(--border)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
});
