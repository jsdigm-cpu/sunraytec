import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { HeroTheme } from '../types/heroTheme';
import { DEFAULT_HERO_THEME } from '../types/heroTheme';
import { supabase } from '../lib/supabase';

interface HeroThemeContextValue {
  theme: HeroTheme;
  setTheme: (theme: HeroTheme) => void;
  saveTheme: (theme: HeroTheme) => Promise<string | null>;
}

const HeroThemeContext = createContext<HeroThemeContextValue>({
  theme: DEFAULT_HERO_THEME,
  setTheme: () => {},
  saveTheme: async () => null,
});

export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HeroTheme>(DEFAULT_HERO_THEME);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'hero_theme')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value) setTheme({ ...DEFAULT_HERO_THEME, ...(data.value as Partial<HeroTheme>) });
      });
  }, []);

  const saveTheme = async (nextTheme: HeroTheme): Promise<string | null> => {
    setTheme(nextTheme);
    if (!supabase) return null;
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'hero_theme', value: nextTheme, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    return error ? error.message : null;
  };

  return (
    <HeroThemeContext.Provider value={{ theme, setTheme, saveTheme }}>
      {children}
    </HeroThemeContext.Provider>
  );
}

export const useHeroTheme = () => useContext(HeroThemeContext);
