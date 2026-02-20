'use client';

import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export function InstallPrompt() {
  const { install, dismiss, showBanner } = useInstallPrompt();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-xl [backdrop-filter:blur(12px)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Install Shadow Word
            </span>
            <button
              type="button"
              onClick={dismiss}
              className="min-h-[48px] min-w-[48px] rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--border)]"
              aria-label="Dismiss"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mb-4 text-sm text-[var(--text-secondary)]">
            Add to your home screen to play offline and get the full app experience.
          </p>
          <div className="flex gap-2">
            <Button variant="primary" fullWidth onClick={() => install()} className="flex items-center justify-center gap-2">
              <Download size={18} />
              Install
            </Button>
            <Button variant="ghost" onClick={dismiss}>
              Not now
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
