import React, { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { AppConstants } from '../constants';
import { ThemeMode } from '../types';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useAppStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem(AppConstants.STORAGE_THEME_KEY) as ThemeMode | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}
