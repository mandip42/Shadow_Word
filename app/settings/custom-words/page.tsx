'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { loadCustomWordPairs, addCustomWordPair, removeCustomWordPair } from '@/utils/storage';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function CustomWordsPage() {
  const [pairs, setPairs] = useState(loadCustomWordPairs());
  const [wordA, setWordA] = useState('');
  const [wordB, setWordB] = useState('');
  const [category, setCategory] = useState('food');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  useEffect(() => {
    setPairs(loadCustomWordPairs());
  }, []);

  const handleAdd = () => {
    const a = wordA.trim();
    const b = wordB.trim();
    if (!a || !b) return;
    addCustomWordPair({ wordA: a, wordB: b, category, difficulty });
    setPairs(loadCustomWordPairs());
    setWordA('');
    setWordB('');
  };

  const handleRemove = (id: string) => {
    removeCustomWordPair(id);
    setPairs(loadCustomWordPairs());
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-md space-y-6"
    >
      <div className="flex items-center gap-2">
        <Link
          href="/settings"
          className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-display text-2xl font-semibold">Custom word pairs</h1>
      </div>

      <Card className="p-4 space-y-3">
        <input
          type="text"
          value={wordA}
          onChange={(e) => setWordA(e.target.value)}
          placeholder="Word A (Citizens)"
          className="min-h-[48px] w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 font-body text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
        />
        <input
          type="text"
          value={wordB}
          onChange={(e) => setWordB(e.target.value)}
          placeholder="Word B (Undercover)"
          className="min-h-[48px] w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 font-body text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="min-h-[48px] w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 font-body text-[var(--text-primary)]"
        >
          <option value="food">Food</option>
          <option value="drinks">Drinks</option>
          <option value="animals">Animals</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
          <option value="nature">Nature</option>
          <option value="places">Places</option>
          <option value="movies">Movies</option>
          <option value="music">Music</option>
          <option value="professions">Professions</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
          className="min-h-[48px] w-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-4 font-body text-[var(--text-primary)]"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <Button variant="primary" fullWidth onClick={handleAdd} className="flex items-center justify-center gap-2">
          <Plus size={18} />
          Add pair
        </Button>
      </Card>

      <div>
        <h2 className="font-body text-sm font-medium text-[var(--text-secondary)] mb-2">
          Your pairs ({pairs.length})
        </h2>
        {pairs.length === 0 ? (
          <p className="font-body text-sm text-[var(--text-secondary)]">None yet.</p>
        ) : (
          <ul className="space-y-2">
            {pairs.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3"
              >
                <span className="font-body text-[var(--text-primary)]">
                  {p.wordA} / {p.wordB}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(p.id)}
                  className="flex min-h-[48px] min-w-[48px] items-center justify-center text-[var(--danger)]"
                  aria-label="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
