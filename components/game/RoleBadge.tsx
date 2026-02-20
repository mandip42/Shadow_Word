'use client';

import type { Player } from '@/store/gameStore';

type Role = Player['role'];

interface RoleBadgeProps {
  role: Role;
  size?: 'sm' | 'md';
}

const roleConfig: Record<Role, { label: string; className: string }> = {
  citizen: {
    label: 'Citizen',
    className: 'bg-[var(--success)]/20 text-[var(--success)] border-[var(--success)]/40',
  },
  undercover: {
    label: 'Undercover',
    className: 'bg-[var(--danger)]/20 text-[var(--danger)] border-[var(--danger)]/40',
  },
  mrwhite: {
    label: 'Mr. White',
    className: 'bg-[var(--text-secondary)]/20 text-[var(--text-secondary)] border-[var(--border)]',
  },
};

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const { label, className } = roleConfig[role];
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 font-body font-semibold ${className} ${
        size === 'sm' ? 'text-xs py-1' : 'py-2 text-sm'
      }`}
    >
      {label}
    </span>
  );
}
