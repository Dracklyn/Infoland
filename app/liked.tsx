import { StyleSheet, ScrollView } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LikedPostsScreen() {
  return (
    <ThemedView style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.content}>
        <ThemedText style={styles.emptyText}>
          No liked posts yet. Start liking posts to see them here!
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.6,
  },
});

