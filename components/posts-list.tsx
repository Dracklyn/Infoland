// @ts-expect-error - React 19 type compatibility issue with expo-router Link export
import { Link } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { Category } from '@/components/category-tabs';
import { Post, PostCard } from '@/components/post-card';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const API_URL = 'https://infoland.ng/wp-json/wp/v2/posts';

// Map category names to WordPress category IDs
const CATEGORY_ID_MAP: Record<Category, number | null> = {
  'Top News': null, // null means no filter - show all posts
  'Politics': 6,
  'Sports': 5,
  'Music': 7,
  'Comedy': 8,
};

interface PostsListProps {
  category?: Category;
}

export function PostsList({ category }: PostsListProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      let url = `${API_URL}?per_page=10&page=${pageNum}`;
      
      // Add category filter if category is selected and not "Top News"
      if (category && CATEGORY_ID_MAP[category] !== null) {
        url += `&categories=${CATEGORY_ID_MAP[category]}`;
      }

      console.log('Fetching posts from:', url);
      const response = await fetch(url);
      
      console.log('Response status:', response.status, response.statusText);
      console.log('Response headers:', {
        totalPages: response.headers.get('X-WP-TotalPages'),
        total: response.headers.get('X-WP-Total'),
      });
      
      if (!response.ok) {
        console.error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
        return;
      }
      
      const data = await response.json();
      console.log('Fetched posts count:', data.length);
      
      // Check if there are more posts
      // Try to get total pages from header, fallback to checking if we got less than per_page
      const totalPagesHeader = response.headers.get('X-WP-TotalPages');
      const totalPages = totalPagesHeader 
        ? parseInt(totalPagesHeader, 10) 
        : (data.length < 10 ? pageNum : pageNum + 1);
      
      setHasMore(pageNum < totalPages && data.length > 0);
      
      if (append) {
        setPosts(prev => [...prev, ...data]);
      } else {
        setPosts(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [category]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchPosts(1, false);
  }, [category, fetchPosts]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage, true);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        {/* @ts-expect-error - React 19 type compatibility issue with React Native */}
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  if (error && posts.length === 0) {
    return (
      <ThemedView style={styles.centerContainer}>
        {/* Error state - showing dummy data as fallback */}
      </ThemedView>
    );
  }

  return (
    <>
      {/* @ts-ignore - React 19 type compatibility issue with React Native FlatList contentContainerStyle */}
      <FlatList<Post>
        data={posts}
        renderItem={({ item }: { item: Post }) => (
          <Link href={`/post-detail?postId=${item.id}`} asChild>
            <PostCard post={item} />
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
        {...({ contentContainerStyle: styles.listContent } as any)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ThemedView style={styles.footerContainer}>
              {/* @ts-expect-error - React 19 type compatibility issue with React Native */}
              <ActivityIndicator size="small" color={colors.tint} />
            </ThemedView>
          ) : null
        }
      />
    </>
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
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
