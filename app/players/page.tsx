'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useGameStore } from '@/store/gameStore';

const SUGGESTED_NAMES = ['Harry', 'Hermione', 'Ron', 'Draco', 'Luna', 'Neville', 'Ginny', 'Fred', 'George', 'Sirius', 'Dumbledore', 'Snape', 'Voldemort','McGonagall', 'Hagrid', 'Dobby'];

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

  const count = settings?.playerCount ?? 6;
  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: count }, (_, i) => SUGGESTED_NAMES[i % SUGGESTED_NAMES.length] ?? `Player ${i + 1}`)
  );

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

  const randomize = useCallback(() => {
    setNames((prev) =>
      prev.map(() => SUGGESTED_NAMES[Math.floor(Math.random() * SUGGESTED_NAMES.length)])
    );
  }, []);

  const handleStart = useCallback(() => {
    const trimmed = names.slice(0, count).map((n) => n.trim() || 'Player');
    const final = trimmed.length >= 2 ? trimmed : [...trimmed, 'Player 2'];
    setPlayers(final);
    assignRoles();
    router.push('/reveal');
  }, [names, count, setPlayers, assignRoles, router]);

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
              className="flex items-center gap-2"
            >
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
