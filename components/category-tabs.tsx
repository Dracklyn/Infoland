import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const CATEGORIES = ['Top News', 'Politics', 'Sports', 'Music', 'Comedy'] as const;

export type Category = typeof CATEGORIES[number];

interface CategoryTabsProps {
  onCategoryChange?: (category: Category) => void;
}

export function CategoryTabs({ onCategoryChange }: CategoryTabsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeCategory, setActiveCategory] = useState<Category>('Top News');

  const handleCategoryPress = (category: Category) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}>
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategoryPress(category)}
            style={styles.tab}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.tabText,
                {
                  fontFamily: Platform.select({
                    web: 'Merriweather, serif',
                    default: 'Merriweather-Bold',
                  }),
                  color: isActive ? colors.tint : colors.textSecondary,
                  opacity: isActive ? 1 : 0.5,
                },
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 50,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 24,
  },
  tab: {
    paddingVertical: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
