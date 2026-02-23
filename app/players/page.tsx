'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGameStore } from '@/store/gameStore';
import { useSettingsStore } from '@/store/settingsStore';

const SUGGESTED_NAMES = ['Harry', 'Hermione', 'Ron', 'Draco', 'Luna', 'Neville', 'Ginny', 'Fred', 'George', 'Sirius', 'Dumbledore', 'Snape', 'McGonagall', 'Hagrid', 'Dobby', 'Voldemort'];

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function PlayersPage() {
  const router = useRouter();
  const settings = useGameStore((s) => s.settings);
  const setPlayers = useGameStore((s) => s.setPlayers);
  const assignRoles = useGameStore((s) => s.assignRoles);
  const lastPlayerNames = useSettingsStore((s) => s.lastPlayerNames);
  const setLastPlayerNames = useSettingsStore((s) => s.setLastPlayerNames);

  const count = settings?.playerCount ?? 6;
  const [names, setNames] = useState<string[]>(() => {
    if (lastPlayerNames?.length >= count) {
      return lastPlayerNames.slice(0, count);
    }
    if (lastPlayerNames?.length) {
      const base = [...lastPlayerNames];
      while (base.length < count) {
        base.push(SUGGESTED_NAMES[base.length % SUGGESTED_NAMES.length] ?? `Player ${base.length + 1}`);
      }
      return base.slice(0, count);
    }
    return Array.from({ length: count }, (_, i) => SUGGESTED_NAMES[i % SUGGESTED_NAMES.length] ?? `Player ${i + 1}`);
  });

  const updateName = useCallback((index: number, value: string) => {
    setNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const addPlayer = useCallback(() => {
    if (names.length >= 16) return;
    setNames((prev) => [...prev, `Player ${prev.length + 1}`]);
  }, [names.length]);

  const removePlayer = useCallback((index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveUp = useCallback((index: number) => {
    if (index <= 0) return;
    setNames((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const moveDown = useCallback((index: number) => {
    setNames((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  const randomize = useCallback(() => {
    setNames((prev) =>
      prev.map(() => SUGGESTED_NAMES[Math.floor(Math.random() * SUGGESTED_NAMES.length)])
    );
  }, []);

  const handleStart = useCallback(() => {
    const trimmed = names.slice(0, count).map((n) => n.trim() || 'Player');
    const final = trimmed.length >= 2 ? trimmed : [...trimmed, 'Player 2'];
    setLastPlayerNames(final);
    setPlayers(final);
    assignRoles();
    router.push('/reveal');
  }, [names, count, setLastPlayerNames, setPlayers, assignRoles, router]);

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
        <div className="flex items-center gap-2">
          <Link
            href="/setup"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display text-2xl font-semibold">Players</h1>
        </div>
        <Button variant="ghost" onClick={randomize}>
          Randomize
        </Button>
      </div>

      <Card className="p-4">
        <ul className="space-y-3">
          {names.slice(0, 16).map((name, i) => (
            <motion.li
              key={i}
              layout
              className="flex items-center gap-1"
            >
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="flex min-h-[22px] min-w-[36px] items-center justify-center rounded text-[var(--text-secondary)] hover:bg-[var(--bg-card)] disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ChevronUp size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i >= names.length - 1}
                  className="flex min-h-[22px] min-w-[36px] items-center justify-center rounded text-[var(--text-secondary)] hover:bg-[var(--bg-card)] disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => updateName(i, e.target.value)}
                placeholder={`Player ${i + 1}`}
                className="min-h-[48px] flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 font-body text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
              />
              <button
                type="button"
                onClick={() => removePlayer(i)}
                disabled={names.length <= 2}
                className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-[var(--danger)] disabled:opacity-40"
                aria-label="Remove player"
              >
                <Trash2 size={20} />
              </button>
            </motion.li>
          ))}
        </ul>
        {names.length < 16 && (
          <button
            type="button"
            onClick={addPlayer}
            className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
          >
            <Plus size={20} />
            Add player
          </button>
        )}
      </Card>

      <Button
        variant="primary"
        fullWidth
        onClick={handleStart}
        disabled={names.length < 2}
      >
        Start game — reveal roles
      </Button>
    </motion.div>
  );
}
