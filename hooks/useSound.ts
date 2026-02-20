import { useCallback, useRef, useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

function createOscillator(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.15
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function useSound() {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const cardFlip = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      createOscillator(ctx, 200, 0.05, 'sine');
      createOscillator(ctx, 400, 0.1, 'sine', 0.08);
      createOscillator(ctx, 800, 0.15, 'sine', 0.05);
    } catch {
      // ignore
    }
  }, [soundEnabled, getCtx]);

  const vote = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      createOscillator(ctx, 600, 0.06, 'square', 0.08);
    } catch {
      // ignore
    }
  }, [soundEnabled, getCtx]);

  const eliminate = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      createOscillator(ctx, 220, 0.2, 'sine', 0.12);
      createOscillator(ctx, 174, 0.25, 'sine', 0.08);
      createOscillator(ctx, 146, 0.3, 'sine', 0.06);
    } catch {
      // ignore
    }
  }, [soundEnabled, getCtx]);

  const win = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        createOscillator(ctx, freq, 0.15 + i * 0.05, 'sine', 0.12);
      });
    } catch {
      // ignore
    }
  }, [soundEnabled, getCtx]);

  const tick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      createOscillator(ctx, 880, 0.03, 'sine', 0.06);
    } catch {
      // ignore
    }
  }, [soundEnabled, getCtx]);

  const reveal = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    try {
      createOscillator(ctx, 300, 0.1, 'sine', 0.08);
      createOscillator(ctx, 500, 0.2, 'sine', 0.06);
      createOscillator(ctx, 700, 0.25, 'sine', 0.04);
    } catch {
      // ignore
    }
  }, [soundEnabled, getCtx]);

  return { cardFlip, vote, eliminate, win, tick, reveal };
}
