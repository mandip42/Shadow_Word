'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { WordCategory } from '@/data/wordPairs';

interface WordPackCardProps {
  id: string;
  label: string;
  category: WordCategory | 'all' | 'custom';
  selected?: boolean;
  onSelect: () => void;
}

const categoryLabels: Record<string, string> = {
  all: 'All',
  custom: 'Custom',
  food: 'Food',
  drinks: 'Drinks',
  animals: 'Animals',
  sports: 'Sports',
  technology: 'Technology',
  nature: 'Nature',
  places: 'Places',
  movies: 'Movies',
  music: 'Music',
  professions: 'Professions',
  science: 'Science',
  history: 'History',
  fashion: 'Fashion',
  household: 'Household',
  transport: 'Transport',
  abstract: 'Abstract',
  bodyparts: 'Body',
  weather: 'Weather',
  emotions: 'Emotions',
  popculture: 'Pop culture',
};

export const WordPackCard = memo(function WordPackCard({
  id,
  label,
  category,
  selected = false,
  onSelect,
}: WordPackCardProps) {
  const displayLabel = categoryLabels[category] ?? label;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={`
        min-h-[48px] w-full rounded-xl border px-4 py-3 text-left transition-all duration-300
        ${selected
          ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary-light)]'
          : 'border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
        }
      `}
    >
      <span className="font-body font-medium">{displayLabel}</span>
    </motion.button>
  );
});
