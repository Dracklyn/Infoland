import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Post, PostCard } from '@/components/post-card';
import { PostDetailSkeleton } from '@/components/post-detail-skeleton';
import { PostCardSkeletonList } from '@/components/post-card-skeleton';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const API_URL = 'https://infoland.ng/wp-json/wp/v2/posts';

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError('Post ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const url = `${API_URL}/${postId}?_embed=true`;
        console.log('Fetching post from:', url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPost(data);
        
        // Set header title to post title
        const cleanTitle = data.title.rendered.replace(/<[^>]*>/g, '').trim();
        navigation.setOptions({ title: cleanTitle });
        
        // Extract category name from embedded terms
        const categories = data._embedded?.['wp:term']?.[0] || [];
        if (categories.length > 0) {
          // Get the first category name
          setCategoryName(categories[0].name);
        }
        
        // Fetch related posts
        fetchRelatedPosts(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async (currentPost: any) => {
      try {
        setLoadingRelated(true);
        // Get categories from the post (WordPress API returns categories as array of IDs)
        const categoryIds = currentPost.categories || [];
        
        if (categoryIds.length > 0) {
          // Fetch related posts from same categories, excluding current post
          const relatedUrl = `${API_URL}?categories=${categoryIds.join(',')}&exclude=${currentPost.id}&per_page=3&_embed=true`;
          console.log('Fetching related posts from:', relatedUrl);

          const response = await fetch(relatedUrl);

          if (response.ok) {
            const data = await response.json();
            setRelatedPosts(data);
          }
        } else {
          // If no categories, fetch recent posts excluding current post
          const relatedUrl = `${API_URL}?exclude=${currentPost.id}&per_page=3&_embed=true&orderby=date&order=desc`;
          console.log('Fetching recent posts as related:', relatedUrl);

          const response = await fetch(relatedUrl);

          if (response.ok) {
            const data = await response.json();
            setRelatedPosts(data);
          }
        }
      } catch (err) {
        console.error('Error fetching related posts:', err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchPost();
  }, [postId, navigation]);

  // Helper functions
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
      return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hr${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const handleSocialShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    if (!post) return;

    const postUrl = encodeURIComponent(post.link);
    const postTitle = encodeURIComponent(stripHtml(post.title.rendered));
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        // X (formerly Twitter) share URL
        shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
        break;
    }

    Linking.openURL(shareUrl).catch((err) => {
      console.error('Error opening share URL:', err);
    });
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
          showsVerticalScrollIndicator={false}>
          <PostDetailSkeleton />
        </ScrollView>
      </ThemedView>
    );
  }

  if (error || !post) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.centerContainer}>
          <ThemedText style={styles.errorText}>
            {error || 'Post not found'}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  // Get featured image URL
  const featuredImageUrl =
    post.yoast_head_json?.og_image?.[0]?.url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    null;

  const timeAgo = getTimeAgo(post.date);
  const cleanTitle = stripHtml(post.title.rendered);
  const cleanContent = stripHtml(post.content.rendered);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}>
        {/* Featured Image */}
        {featuredImageUrl && (
          <Image
            source={{ uri: featuredImageUrl }}
            style={styles.featuredImage}
            contentFit="cover"
          />
        )}

        {/* Body Section */}
        <View style={[styles.body, { backgroundColor: colors.cardBody }]}>
          {/* Category Name */}
          {categoryName && (
            <Text style={[styles.category, { color: '#3E5946' }]}>
              {categoryName}
            </Text>
          )}

          {/* Title */}
          <Text style={[styles.title, { color: '#1D1B1BE5' }]}>
            {cleanTitle}
          </Text>

          {/* Date */}
          <View style={styles.dateContainer}>
            <Image
              source={require('@/assets/images/time.svg')}
              style={styles.dateIcon}
              contentFit="contain"
            />
            <Text style={[styles.dateText, { color: '#1D1B1B80' }]}>{timeAgo}</Text>
          </View>

          {/* Content */}
          <Text 
            style={[
              styles.content, 
              { 
                color: '#1D1B1BE5',
                fontFamily: Platform.select({
                  web: 'Karla, sans-serif',
                  ios: 'Karla-Regular',
                  android: 'Karla-Regular',
                  default: 'Karla-Regular',
                }),
              }
            ]}>
            {cleanContent}
          </Text>

          {/* Footer Row */}
          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Image
                source={require('@/assets/images/time.svg')}
                style={styles.footerIcon}
                contentFit="contain"
              />
              <Text style={[styles.footerText, { color: '#1D1B1BE5' }]}>{timeAgo}</Text>
            </View>
            <View style={styles.footerItem}>
              <Image
                source={require('@/assets/images/like.svg')}
                style={styles.footerIcon}
                contentFit="contain"
              />
            </View>
          </View>

          {/* Social Share Buttons */}
          <View style={styles.socialShareContainer}>
            <Text style={[styles.socialShareTitle, { color: '#1D1B1BE5' }]}>Share</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton, styles.twitterButton]}
                onPress={() => handleSocialShare('twitter')}>
                <FontAwesome5 name="twitter" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, styles.facebookButton]}
                onPress={() => handleSocialShare('facebook')}>
                <FontAwesome5 name="facebook" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, styles.linkedinButton]}
                onPress={() => handleSocialShare('linkedin')}>
                <FontAwesome5 name="linkedin" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <View style={[styles.relatedSection, { backgroundColor: colors.cardBody }]}>
            <Text style={[styles.relatedTitle, { color: '#1D1B1BE5' }]}>
              Related Posts
            </Text>
            {loadingRelated ? (
              <PostCardSkeletonList count={2} />
            ) : (
              relatedPosts.map((relatedPost) => (
                <PostCard
                  key={relatedPost.id}
                  post={relatedPost}
                  onPress={() => {
                    router.push(`/post-detail?postId=${relatedPost.id}`);
                  }}
                />
              ))
            )}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: '#1D1B1BE5',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  featuredImage: {
    width: '100%',
    height: 250,
  },
  body: {
    padding: 16,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 28,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  dateIcon: {
    width: 14,
    height: 14,
  },
  dateText: {
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerIcon: {
    width: 16,
    height: 16,
  },
  footerText: {
    fontSize: 12,
  },
  socialShareContainer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  socialShareTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  twitterButton: {
    backgroundColor: '#000000', // X/Twitter black
  },
  facebookButton: {
    backgroundColor: '#1877F2', // Facebook blue
  },
  linkedinButton: {
    backgroundColor: '#0077B5', // LinkedIn blue
  },
  relatedSection: {
    padding: 16,
    marginTop: 20,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
