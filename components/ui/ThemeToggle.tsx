'use client';

import { useSettingsStore } from '@/store/settingsStore';
import type { ThemeMode } from '@/store/settingsStore';
import { Moon, Sun, Smartphone } from 'lucide-react';
import { useCallback, useEffect } from 'react';

const themes: { value: ThemeMode; label: string; Icon: typeof Moon }[] = [
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'amoled', label: 'AMOLED', Icon: Smartphone },
];

export function ThemeToggle() {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const cycle = useCallback(() => {
    const idx = themes.findIndex((t) => t.value === theme);
    const next = themes[(idx + 1) % themes.length];
    setTheme(next.value);
  }, [theme, setTheme]);

  const current = themes.find((t) => t.value === theme);
  const Icon = current?.Icon ?? Moon;

  return (
    <button
      type="button"
      onClick={cycle}
      className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] transition-colors hover:bg-[var(--border)]"
      aria-label={`Theme: ${current?.label}. Click to change.`}
    >
      <Icon size={22} />
    </button>
  );
}
