import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'dark' | 'light' | 'amoled';

export interface SettingsState {
  theme: ThemeMode;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  onboardingDone: boolean;
  installPromptDismissed: boolean;
}

export interface SettingsActions {
  setTheme: (theme: ThemeMode) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setOnboardingDone: (done: boolean) => void;
  setInstallPromptDismissed: (dismissed: boolean) => void;
}

const initialState: SettingsState = {
  theme: 'dark',
  soundEnabled: true,
  hapticsEnabled: true,
  onboardingDone: false,
  installPromptDismissed: false,
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme(theme) {
        set({ theme });
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme);
        }
      },
      setSoundEnabled(soundEnabled) {
        set({ soundEnabled });
      },
      setHapticsEnabled(hapticsEnabled) {
        set({ hapticsEnabled });
      },
      setOnboardingDone(onboardingDone) {
        set({ onboardingDone });
      },
      setInstallPromptDismissed(installPromptDismissed) {
        set({ installPromptDismissed });
      },
    }),
    {
      name: 'shadow-word-settings',
      partialize: (s) => ({
        theme: s.theme,
        soundEnabled: s.soundEnabled,
        hapticsEnabled: s.hapticsEnabled,
        onboardingDone: s.onboardingDone,
        installPromptDismissed: s.installPromptDismissed,
      }),
    }
  )
);
