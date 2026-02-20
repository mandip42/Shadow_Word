'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function HowToPlayPage() {
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
          href="/"
          className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-display text-2xl font-semibold">How to play</h1>
      </div>

      <Card className="p-4 space-y-4">
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--primary-light)]">
            Goal
          </h2>
          <p className="font-body text-sm text-[var(--text-secondary)]">
            One secret word pair is chosen (e.g. &quot;Coffee&quot; / &quot;Tea&quot;). Citizens see one word,
            Spy see the other. Ghost sees nothing. Give one spoken clue per round
            without saying your word. Vote to eliminate the most suspicious person.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--primary-light)]">
            Roles
          </h2>
          <ul className="list-disc pl-4 font-body text-sm text-[var(--text-secondary)] space-y-1">
            <li><strong className="text-[var(--success)]">Citizens</strong> — see Word A. Win if all Spy and Ghost are eliminated.</li>
            <li><strong className="text-[var(--danger)]">Spy</strong> — see Word B (similar but different). Win if they reach the final 2 alive.</li>
            <li><strong className="text-[var(--text-secondary)]">Ghost</strong> — sees nothing. Win by correctly guessing the Citizens&apos; word when voted out.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-[var(--primary-light)]">
            Flow
          </h2>
          <p className="font-body text-sm text-[var(--text-secondary)]">
            Pass the phone so each player can secretly see their role and word. Then discuss:
            each gives one clue per round. Vote to eliminate one player. If Ghost is
            eliminated, they get one guess for the Citizens&apos; word. Game ends when Citizens
            eliminate all others, or Spy/Ghost win.
          </p>
        </section>
      </Card>
    </motion.div>
  );
}
