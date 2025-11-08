import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { Category, CategoryTabs } from '@/components/category-tabs';
import { PostsList } from '@/components/posts-list';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Top News');

  return (
    <ThemedView style={styles.container}>
      <AppHeader />
      <ThemedView noPadding style={styles.tabsContainer}>
        <CategoryTabs onCategoryChange={setSelectedCategory} />
      </ThemedView>
      <ThemedView style={styles.content}>
        <PostsList category={selectedCategory} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    width: '100%',
  },
  content: {
    flex: 1,
  },
});
