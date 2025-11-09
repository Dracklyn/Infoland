import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Category } from '@/components/category-tabs';
import { CategoryDropdown } from '@/components/category-dropdown';
import { SettingsToggle } from '@/components/settings-toggle';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { NotificationCategory, useCategoryPreference, useNotificationCategories, useNotificationsEnabled, useThemePreference } from '@/hooks/use-theme-preference';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  
  const { themePreference, setThemePreference, isLoading: themeLoading } = useThemePreference();
  const { notificationsEnabled, setNotificationsEnabled, isLoading: notificationsEnabledLoading } = useNotificationsEnabled();
  const { notificationCategories, setNotificationCategories, isLoading: notificationCategoriesLoading } = useNotificationCategories();
  const { categoryPreference, setCategoryPreference, isLoading: categoryLoading } = useCategoryPreference();

  const CATEGORIES: Category[] = ['Top News', 'Politics', 'Sports', 'Music', 'Comedy'];
  const NOTIFICATION_CATEGORIES: NotificationCategory[] = ['Top News', 'Politics', 'Music', 'Sport', 'Comedy'];

  const handleNotificationsToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    // Clear categories when notifications are disabled
    if (!enabled) {
      setNotificationCategories([]);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top + 16, 28) }
        ]}
        showsVerticalScrollIndicator={false}>
        
        {/* Settings Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Customize your app experience
          </Text>
        </View>

        {/* Notifications Section */}
        <View style={[styles.section, { backgroundColor: colors.cardBody }]}>
          <View style={styles.sectionHeader}>
            <Image
              source={require('@/assets/images/info.png')}
              style={styles.sectionIcon}
              contentFit="contain"
            />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
          </View>
          
          {!notificationsEnabledLoading && (
            <SettingsToggle
              label="Push Notifications"
              description="Enable notifications for news updates"
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
            />
          )}

          {/* Notification Categories Dropdown - Only show when notifications are enabled */}
          {notificationsEnabled && (
            <View style={[styles.notificationCategorySection, { borderTopColor: colors.textSecondary + '30' }]}>
              <Text style={[styles.categorySectionTitle, { color: colors.text }]}>
                Notification Categories
              </Text>
              <Text style={[styles.sectionDescription, { color: colors.textSecondary, marginBottom: 12 }]}>
                Select which categories you want to receive notifications for
              </Text>
              {!notificationCategoriesLoading && (
                <CategoryDropdown
                  selectedCategories={notificationCategories}
                  onSelectionChange={setNotificationCategories}
                  options={NOTIFICATION_CATEGORIES}
                />
              )}
            </View>
          )}
        </View>

          {/* Appearance Section */}
          <View style={[styles.section, { backgroundColor: colors.cardBody, marginTop: 16 }]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: colors.tint + '20' }]}>
                <View style={[styles.themeIcon, { backgroundColor: colors.tint }]} />
              </View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
            </View>
            
            {!themeLoading && (
              <View style={styles.themeOptions}>
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    themePreference === 'light' && [
                      styles.themeOptionActive,
                      { backgroundColor: colors.tint + '15', borderColor: colors.tint }
                    ],
                    themePreference !== 'light' && { borderColor: 'transparent' }
                  ]}
                  onPress={() => setThemePreference('light')}>
                  <View style={[styles.themePreview, { backgroundColor: '#FFFFFF' }]} />
                  <Text style={[
                    styles.themeOptionLabel,
                    { color: themePreference === 'light' ? colors.tint : colors.textSecondary }
                  ]}>
                    Light
                  </Text>
                  {themePreference === 'light' && (
                    <View style={[styles.checkmark, { backgroundColor: colors.tint }]}>
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    themePreference === 'dark' && [
                      styles.themeOptionActive,
                      { backgroundColor: colors.tint + '15', borderColor: colors.tint }
                    ],
                    themePreference !== 'dark' && { borderColor: 'transparent' }
                  ]}
                  onPress={() => setThemePreference('dark')}>
                  <View style={[styles.themePreview, { backgroundColor: '#000000' }]} />
                  <Text style={[
                    styles.themeOptionLabel,
                    { color: themePreference === 'dark' ? colors.tint : colors.textSecondary }
                  ]}>
                    Dark
                  </Text>
                  {themePreference === 'dark' && (
                    <View style={[styles.checkmark, { backgroundColor: colors.tint }]}>
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.themeOption,
                    themePreference === 'system' && [
                      styles.themeOptionActive,
                      { backgroundColor: colors.tint + '15', borderColor: colors.tint }
                    ],
                    themePreference !== 'system' && { borderColor: 'transparent' }
                  ]}
                  onPress={() => setThemePreference('system')}>
                  <View style={styles.themePreviewSystem}>
                    <View style={[styles.themePreviewHalf, { backgroundColor: '#FFFFFF' }]} />
                    <View style={[styles.themePreviewHalf, { backgroundColor: '#000000' }]} />
                  </View>
                  <Text style={[
                    styles.themeOptionLabel,
                    { color: themePreference === 'system' ? colors.tint : colors.textSecondary }
                  ]}>
                    System
                  </Text>
                  {themePreference === 'system' && (
                    <View style={[styles.checkmark, { backgroundColor: colors.tint }]}>
                      <MaterialIcons name="check" size={14} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

        {/* App Info Section */}
        <View style={[styles.section, { backgroundColor: colors.cardBody, marginTop: 16 }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Version</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>1.0.0</Text>
          </View>
        </View>

        {/* Legal Section */}
        <View style={[styles.section, { backgroundColor: colors.cardBody, marginTop: 16 }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Legal</Text>
          </View>
          <Link href="/terms" asChild>
            <TouchableOpacity style={styles.legalRow}>
              <Text style={[styles.legalLabel, { color: colors.text }]}>Terms of Service</Text>
              <Text style={[styles.legalArrow, { color: colors.textSecondary }]}>›</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/privacy" asChild>
            <TouchableOpacity style={styles.legalRow}>
              <Text style={[styles.legalLabel, { color: colors.text }]}>Privacy Policy</Text>
              <Text style={[styles.legalArrow, { color: colors.textSecondary }]}>›</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  section: {
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  sectionIcon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeOptions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  themeOptionActive: {
    borderWidth: 2,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themePreview: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  themePreviewSystem: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  themePreviewHalf: {
    flex: 1,
  },
  themeOptionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 14,
  },
  notificationCategorySection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    marginTop: 8,
  },
  categorySection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    marginTop: 8,
  },
  categorySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryOptions: {
    gap: 8,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  categoryOptionActive: {
    borderWidth: 2,
  },
  categoryOptionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryCheckmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  legalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  legalLabel: {
    fontSize: 16,
  },
  legalArrow: {
    fontSize: 20,
  },
});
