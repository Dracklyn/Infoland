import { useContext, createContext } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useThemePreference } from './use-theme-preference';

const ThemeContext = createContext<'light' | 'dark' | null>(null);

export function useColorScheme() {
  const { effectiveTheme } = useThemePreference();
  return effectiveTheme;
}
