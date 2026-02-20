import { useCallback } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

export function useHaptics() {
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);

  const light = useCallback(() => {
    if (!hapticsEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate(10);
    } catch {
      // ignore
    }
  }, [hapticsEnabled]);

  const medium = useCallback(() => {
    if (!hapticsEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate(25);
    } catch {
      // ignore
    }
  }, [hapticsEnabled]);

  const heavy = useCallback(() => {
    if (!hapticsEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate([20, 30, 20]);
    } catch {
      // ignore
    }
  }, [hapticsEnabled]);

  const success = useCallback(() => {
    if (!hapticsEnabled || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate([15, 20, 15, 20]);
    } catch {
      // ignore
    }
  }, [hapticsEnabled]);

  return { light, medium, heavy, success };
}
