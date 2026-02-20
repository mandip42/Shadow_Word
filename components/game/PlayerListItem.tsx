'use client';

import { memo } from 'react';
import type { Player } from '@/store/gameStore';
import { RoleBadge } from './RoleBadge';
import { User } from 'lucide-react';

interface PlayerListItemProps {
  player: Player;
  showRole?: boolean;
  highlighted?: boolean;
  onSelect?: () => void;
  selected?: boolean;
}

export const PlayerListItem = memo(function PlayerListItem({
  player,
  showRole = false,
  highlighted = false,
  onSelect,
  selected = false,
}: PlayerListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!onSelect || player.isEliminated}
      className={`
        flex min-h-[48px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left
        transition-all duration-300 cursor-default
        ${player.isEliminated ? 'opacity-50 border-[var(--border)]' : 'border-[var(--border)]'}
        ${highlighted ? 'border-[var(--primary)] bg-[var(--primary)]/10' : ''}
        ${selected ? 'ring-2 ring-[var(--accent)]' : ''}
        ${onSelect && !player.isEliminated ? 'cursor-pointer hover:bg-[var(--bg-surface)] hover:border-[var(--primary)]/50' : ''}
      `}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-surface)]">
        <User size={20} className="text-[var(--text-secondary)]" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="font-body font-medium text-[var(--text-primary)] truncate block">
          {player.name}
        </span>
        {showRole && (
          <RoleBadge role={player.role} size="sm" />
        )}
      </div>
      {player.isEliminated && (
        <span className="text-xs text-[var(--text-secondary)]">Out</span>
      )}
    </button>
  );
});
