import { create } from "zustand";
import {
  getPreferences,
  savePreferences,
  StoredPreferences,
} from "../storage/preferencesStorage";

/**
 * Estado y acciones del store de preferencias
 */
type PreferencesState = {
  theme: "light" | "dark";
  language: "es" | "en";
  isReady: boolean; // antes isHydrated

  setTheme: (theme: PreferencesState["theme"]) => void;
  setLanguage: (language: PreferencesState["language"]) => void;
  loadPreferences: () => Promise<void>;
};

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  theme: "light",
  language: "es",
  isReady: false,

  setTheme: (theme) => {
    set({ theme });

    const { language } = get();
    savePreferences({ theme, language });
  },

  setLanguage: (language) => {
    set({ language });

    const { theme } = get();
    savePreferences({ theme, language });
  },

  /**
   * Carga las preferencias guardadas al iniciar la app
   */
  loadPreferences: async () => {
    const stored = await getPreferences();

    if (stored) {
      set({
        theme: stored.theme,
        language: stored.language,
      });
    }

    set({ isReady: true });
  },
}));
