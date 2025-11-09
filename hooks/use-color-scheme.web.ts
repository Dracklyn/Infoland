import { useThemePreference } from './use-theme-preference';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 * Now uses theme preference instead of system color scheme
 */
export function useColorScheme() {
  const { effectiveTheme } = useThemePreference();
  return effectiveTheme;
}
