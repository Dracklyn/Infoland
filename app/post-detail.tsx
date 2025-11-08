import { StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function PostDetailScreen() {
  const { postUrl } = useLocalSearchParams<{ postUrl: string }>();

  const handleOpenPost = async () => {
    if (postUrl) {
      await WebBrowser.openBrowserAsync(postUrl);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Post Details</ThemedText>
        <TouchableOpacity onPress={handleOpenPost} style={styles.button}>
          <ThemedText style={styles.linkText}>Open Full Post</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#E9F3EB',
  },
  linkText: {
    color: '#3E5946',
    fontSize: 16,
    fontWeight: '600',
  },
});
