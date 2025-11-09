import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';

import { ThemeProvider, useThemePreference } from '@/hooks/use-theme-preference';

export const unstable_settings = {
  anchor: '(tabs)',
};

function AppContent() {
  const { effectiveTheme, isLoading } = useThemePreference();

  useEffect(() => {
    // Load Merriweather and Karla fonts for web (config plugin doesn't handle web fonts)
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      // Check for Merriweather
      const existingMerriweather = document.querySelector('link[href*="fonts.googleapis.com/css2?family=Merriweather"]');
      if (!existingMerriweather) {
        const merriweatherLink = document.createElement('link');
        merriweatherLink.href = 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap';
        merriweatherLink.rel = 'stylesheet';
        merriweatherLink.crossOrigin = 'anonymous';
        document.head.appendChild(merriweatherLink);
      }
      
      // Check for Karla
      const existingKarla = document.querySelector('link[href*="fonts.googleapis.com/css2?family=Karla"]');
      if (!existingKarla) {
        const karlaLink = document.createElement('link');
        karlaLink.href = 'https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap';
        karlaLink.rel = 'stylesheet';
        karlaLink.crossOrigin = 'anonymous';
        document.head.appendChild(karlaLink);
      }
    }
  }, []);

  // Don't render until theme preference is loaded
  if (isLoading) {
    return null;
  }

  return (
    <NavigationThemeProvider value={effectiveTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="post-detail" 
          options={{ 
            presentation: 'card', 
            title: 'Post',
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen name="liked" options={{ presentation: 'card', title: 'Liked Posts', headerBackTitle: 'Back' }} />
        <Stack.Screen 
          name="terms" 
          options={{ 
            presentation: 'card', 
            title: 'Terms of Service',
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen 
          name="privacy" 
          options={{ 
            presentation: 'card', 
            title: 'Privacy Policy',
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={effectiveTheme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
