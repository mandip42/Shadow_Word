'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGameStore } from '@/store/gameStore';
import { suggestedSpyCount } from '@/store/gameStore';
import type { GameSettings, WordCategoryFilter } from '@/store/gameStore';
import { WordPackCard } from '@/components/game/WordPackCard';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const CATEGORIES: { id: WordCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'animals', label: 'Animals' },
  { id: 'sports', label: 'Sports' },
  { id: 'technology', label: 'Technology' },
  { id: 'nature', label: 'Nature' },
  { id: 'places', label: 'Places' },
  { id: 'movies', label: 'Movies' },
  { id: 'music', label: 'Music' },
  { id: 'professions', label: 'Professions' },
  { id: 'science', label: 'Science' },
  { id: 'history', label: 'History' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'household', label: 'Household' },
  { id: 'transport', label: 'Transport' },
  { id: 'abstract', label: 'Abstract' },
  { id: 'bodyparts', label: 'Body' },
  { id: 'weather', label: 'Weather' },
  { id: 'emotions', label: 'Emotions' },
  { id: 'popculture', label: 'Pop culture' },
];

export default function SetupPage() {
  const router = useRouter();
  const initGame = useGameStore((s) => s.initGame);
  const [playerCount, setPlayerCount] = useState(6);
  const [spyCount, setSpyCount] = useState(1);
  const [ghostEnabled, setGhostEnabled] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState<0 | 30 | 60 | 90>(0);
  const [wordPackFilter, setWordPackFilter] = useState<WordCategoryFilter>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'easy' | 'medium' | 'hard' | 'any'>('any');

  const suggested = suggestedSpyCount(playerCount);
  const effectiveSpy = ghostEnabled ? Math.max(1, spyCount) : spyCount;

  const handleStart = useCallback(() => {
    const settings: GameSettings = {
      playerCount,
      spyCount: effectiveSpy,
      ghostEnabled,
      timerSeconds,
      wordPackFilter,
      difficultyFilter,
    };
    initGame(settings);
    router.push('/players');
  }, [playerCount, effectiveSpy, ghostEnabled, timerSeconds, wordPackFilter, difficultyFilter, initGame, router]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full space-y-6 pb-4"
    >
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-display text-2xl font-semibold">Game Setup</h1>
      </div>

      <Card className="p-4">
        <label className="mb-2 block font-body text-sm font-medium text-[var(--text-secondary)]">
          Players (2–16)
        </label>
        <input
          type="range"
          min={2}
          max={16}
          value={playerCount}
          onChange={(e) => {
            const n = Number(e.target.value);
            setPlayerCount(n);
            setSpyCount(suggestedSpyCount(n));
          }}
          className="w-full accent-[var(--primary)]"
        />
        <p className="mt-1 text-center font-body text-lg font-semibold text-[var(--primary-light)]">
          {playerCount}
        </p>
      </Card>

      <Card className="p-4">
        <label className="mb-2 block font-body text-sm font-medium text-[var(--text-secondary)]">
          Spy count (suggested: {suggested})
        </label>
        <input
          type="range"
          min={1}
          max={Math.min(4, Math.floor(playerCount / 2))}
          value={spyCount}
          onChange={(e) => setSpyCount(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
        <p className="mt-1 text-center font-body text-lg font-semibold">{spyCount}</p>
      </Card>

      <Card className="flex items-center justify-between p-4">
        <span className="font-body text-[var(--text-primary)]">Ghost</span>
        <button
          type="button"
          role="switch"
          aria-checked={ghostEnabled}
          onClick={() => setGhostEnabled((b) => !b)}
          className={`relative h-8 w-14 rounded-full transition-colors ${
            ghostEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-transform ${
              ghostEnabled ? 'left-7' : 'left-1'
            }`}
          />
        </button>
      </Card>

      <Card className="p-4">
        <label className="mb-2 block font-body text-sm font-medium text-[var(--text-secondary)]">
          Discussion timer
        </label>
        <select
          value={timerSeconds}
          onChange={(e) => setTimerSeconds(Number(e.target.value) as 0 | 30 | 60 | 90)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 font-body text-[var(--text-primary)]"
        >
          <option value={0}>Off</option>
          <option value={30}>30 seconds</option>
          <option value={60}>60 seconds</option>
          <option value={90}>90 seconds</option>
        </select>
      </Card>

      <Card className="p-4">
        <label className="mb-2 block font-body text-sm font-medium text-[var(--text-secondary)]">
          Word pack
        </label>
        <div className="max-h-40 space-y-2 overflow-y-auto">
          {CATEGORIES.map((cat) => (
            <WordPackCard
              key={cat.id}
              id={cat.id}
              label={cat.label}
              category={cat.id === 'all' ? 'all' : (cat.id as import('@/data/wordPairs').WordCategory)}
              selected={wordPackFilter === cat.id}
              onSelect={() => setWordPackFilter(cat.id)}
            />
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <label className="mb-2 block font-body text-sm font-medium text-[var(--text-secondary)]">
          Difficulty
        </label>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value as 'easy' | 'medium' | 'hard' | 'any')}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-3 font-body text-[var(--text-primary)]"
        >
          <option value="any">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </Card>

      <Button variant="primary" fullWidth onClick={handleStart}>
        Continue to players
      </Button>
    </motion.div>
  );
}
