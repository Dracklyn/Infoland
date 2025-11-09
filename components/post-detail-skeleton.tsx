import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function SkeletonBox({ width, height, style }: { width?: number | string; height: number; style?: any }) {
  const colorScheme = useColorScheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.8, { 
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Use a more visible gray color with better contrast
  // For light mode: darker gray on light background (#F8F8F8)
  // For dark mode: lighter gray on dark background
  const skeletonColor = colorScheme === 'dark' ? '#FFFFFF30' : '#CCCCCC';

  return (
    <Animated.View
      style={[
        {
          width: width || '100%',
          height,
          backgroundColor: skeletonColor,
          borderRadius: 4,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function PostDetailSkeleton() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={styles.container}>
      {/* Featured Image Skeleton */}
      <SkeletonBox height={250} style={styles.featuredImage} />
      
      {/* Body Skeleton */}
      <View style={[styles.body, { backgroundColor: colors.cardBody }]}>
        {/* Category Skeleton */}
        <SkeletonBox height={14} width={80} style={styles.category} />
        
        {/* Title Skeletons */}
        <SkeletonBox height={24} width="95%" style={styles.title} />
        <SkeletonBox height={24} width="70%" style={styles.titleShort} />
        
        {/* Date Skeleton */}
        <View style={styles.dateContainer}>
          <SkeletonBox height={14} width={14} style={styles.dateIcon} />
          <SkeletonBox height={14} width={60} />
        </View>
        
        {/* Content Skeletons */}
        <SkeletonBox height={16} width="100%" style={styles.content} />
        <SkeletonBox height={16} width="100%" style={styles.content} />
        <SkeletonBox height={16} width="100%" style={styles.content} />
        <SkeletonBox height={16} width="90%" style={styles.content} />
        <SkeletonBox height={16} width="85%" style={styles.content} />
        <SkeletonBox height={16} width="75%" style={styles.contentShort} />
        
        {/* Footer Skeleton */}
        <View style={styles.footer}>
          <SkeletonBox height={14} width={60} />
          <SkeletonBox height={16} width={16} style={styles.footerIcon} />
        </View>
        
        {/* Social Share Skeleton */}
        <View style={styles.socialContainer}>
          <SkeletonBox height={18} width={50} style={styles.socialTitle} />
          <View style={styles.socialButtons}>
            <SkeletonBox height={44} width="30%" style={styles.socialButton} />
            <SkeletonBox height={44} width="30%" style={styles.socialButton} />
            <SkeletonBox height={44} width="30%" style={styles.socialButton} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featuredImage: {
    width: '100%',
  },
  body: {
    padding: 16,
  },
  category: {
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
  },
  titleShort: {
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  dateIcon: {
    borderRadius: 7,
  },
  content: {
    marginBottom: 8,
  },
  contentShort: {
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
  footerIcon: {
    borderRadius: 8,
  },
  socialContainer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  socialTitle: {
    marginBottom: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    borderRadius: 8,
  },
});

