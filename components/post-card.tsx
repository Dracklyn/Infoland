import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  link: string;
  featured_media: number;
  yoast_head_json?: {
    og_image?: { url: string }[];
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

interface PostCardProps {
  post: Post;
  onPress?: () => void;
}

export function PostCard({ post, onPress }: PostCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Get featured image URL
  const featuredImageUrl =
    post.yoast_head_json?.og_image?.[0]?.url ||
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    null;

  // Calculate time since published
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

  // Strip HTML tags from excerpt
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const timeAgo = getTimeAgo(post.date);
  const cleanExcerpt = stripHtml(post.excerpt.rendered);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.cardBackground, shadowColor: colors.shadow }]}
      onPress={onPress}
      activeOpacity={0.8}>
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
        <Text style={[styles.title, { color: '#1D1B1BE5' }]} numberOfLines={3}>
          {stripHtml(post.title.rendered)}
        </Text>
        <Text 
          style={[
            styles.excerpt, 
            { 
              color: '#1D1B1BE5',
              fontFamily: Platform.select({
                web: 'Karla, sans-serif',
                ios: 'Karla-Regular',
                android: 'Karla-Regular',
                default: 'Karla-Regular',
              }),
            }
          ]} 
          numberOfLines={3}>
          {cleanExcerpt}
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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 172,
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 22,
  },
  excerpt: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

