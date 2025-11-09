import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useRNColorScheme } from 'react-native';
import * as SystemUI from 'expo-system-ui';

const THEME_STORAGE_KEY = '@infoland_theme_preference';
const NOTIFICATIONS_STORAGE_KEY = '@infoland_notifications_preference';
const NOTIFICATIONS_ENABLED_KEY = '@infoland_notifications_enabled';
const CATEGORY_STORAGE_KEY = '@infoland_category_preference';
const NOTIFICATION_CATEGORIES_KEY = '@infoland_notification_categories';

export type ThemePreference = 'light' | 'dark' | 'system';
export type NotificationPreference = 'all' | 'breaking' | 'none';
export type NotificationCategory = 'Top News' | 'Politics' | 'Music' | 'Sport' | 'Comedy';

interface ThemeContextType {
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => Promise<void>;
  effectiveTheme: 'light' | 'dark';
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const systemColorScheme = useRNColorScheme();
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        setThemePreferenceState(saved as ThemePreference);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = useCallback(async (preference: ThemePreference) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, preference);
      setThemePreferenceState(preference);
      
      // Update system UI
      if (preference === 'light') {
        await SystemUI.setBackgroundColorAsync('#FFFFFF');
      } else if (preference === 'dark') {
        await SystemUI.setBackgroundColorAsync('#000000');
      }
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }, []);

  const getEffectiveTheme = (): 'light' | 'dark' => {
    if (themePreference === 'system') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return themePreference;
  };

  // Memoize context value to ensure updates trigger re-renders
  const contextValue = useMemo(() => {
    const effectiveTheme = getEffectiveTheme();
    return {
      themePreference,
      setThemePreference: saveThemePreference,
      effectiveTheme,
      isLoading,
    };
  }, [themePreference, systemColorScheme, isLoading, saveThemePreference]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemePreference must be used within a ThemeProvider');
  }
  return context;
}

export function useNotificationsPreference() {
  const [notificationPreference, setNotificationPreferenceState] = useState<NotificationPreference>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotificationsPreference();
  }, []);

  const loadNotificationsPreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (saved && (saved === 'all' || saved === 'breaking' || saved === 'none')) {
        setNotificationPreferenceState(saved as NotificationPreference);
      }
    } catch (error) {
      console.error('Error loading notifications preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotificationsPreference = async (preference: NotificationPreference) => {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, preference);
      setNotificationPreferenceState(preference);
    } catch (error) {
      console.error('Error saving notifications preference:', error);
    }
  };

  return {
    notificationPreference,
    setNotificationPreference: saveNotificationsPreference,
    isLoading,
  };
}

export function useCategoryPreference() {
  const [categoryPreference, setCategoryPreferenceState] = useState<string>('Top News');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategoryPreference();
  }, []);

  const loadCategoryPreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(CATEGORY_STORAGE_KEY);
      if (saved) {
        setCategoryPreferenceState(saved);
      }
    } catch (error) {
      console.error('Error loading category preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCategoryPreference = async (category: string) => {
    try {
      await AsyncStorage.setItem(CATEGORY_STORAGE_KEY, category);
      setCategoryPreferenceState(category);
    } catch (error) {
      console.error('Error saving category preference:', error);
    }
  };

  return {
    categoryPreference,
    setCategoryPreference: saveCategoryPreference,
    isLoading,
  };
}

export function useNotificationCategories() {
  const [notificationCategories, setNotificationCategoriesState] = useState<NotificationCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotificationCategories();
  }, []);

  const loadNotificationCategories = async () => {
    try {
      const saved = await AsyncStorage.getItem(NOTIFICATION_CATEGORIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setNotificationCategoriesState(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading notification categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotificationCategories = async (categories: NotificationCategory[]) => {
    try {
      await AsyncStorage.setItem(NOTIFICATION_CATEGORIES_KEY, JSON.stringify(categories));
      setNotificationCategoriesState(categories);
    } catch (error) {
      console.error('Error saving notification categories:', error);
    }
  };

  return {
    notificationCategories,
    setNotificationCategories: saveNotificationCategories,
    isLoading,
  };
}

export function useNotificationsEnabled() {
  const [notificationsEnabled, setNotificationsEnabledState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNotificationsEnabled();
  }, []);

  const loadNotificationsEnabled = async () => {
    try {
      const saved = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
      if (saved !== null) {
        setNotificationsEnabledState(saved === 'true');
      }
    } catch (error) {
      console.error('Error loading notifications enabled:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNotificationsEnabled = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, enabled.toString());
      setNotificationsEnabledState(enabled);
    } catch (error) {
      console.error('Error saving notifications enabled:', error);
    }
  };

  return {
    notificationsEnabled,
    setNotificationsEnabled: saveNotificationsEnabled,
    isLoading,
  };
}
