import { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { PostCard, Post } from '@/components/post-card';
import { Colors } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { dummyPosts } from '@/data/dummy-posts';

const API_URL = 'https://infoland.ng/wp-json/wp/v2/posts';

interface PostsListProps {
  category?: string;
}

export function PostsList({ category }: PostsListProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Using dummy data instead of API call due to CORS issues
    // Simulate loading delay
    const timer = setTimeout(() => {
      setPosts(dummyPosts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  // Uncomment below to use real API when CORS is fixed
  /*
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${API_URL}?_embed=true`;
      if (category) {
        url += `&categories=${category}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        {/* Error state - can be improved with error message */}
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Link href={`/post-detail?postUrl=${encodeURIComponent(item.link)}`} asChild>
          <PostCard post={item} />
        </Link>
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});
