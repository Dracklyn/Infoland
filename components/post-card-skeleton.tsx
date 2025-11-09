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

export function PostCardSkeleton() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      {/* Image Skeleton */}
      <SkeletonBox height={172} style={styles.imageSkeleton} />
      
      {/* Body Skeleton */}
      <View style={[styles.body, { backgroundColor: colors.cardBody }]}>
        {/* Title Skeleton */}
        <SkeletonBox height={20} width="90%" style={styles.titleSkeleton} />
        <SkeletonBox height={20} width="60%" style={styles.titleSkeletonShort} />
        
        {/* Excerpt Skeleton */}
        <SkeletonBox height={16} width="100%" style={styles.excerptSkeleton} />
        <SkeletonBox height={16} width="85%" style={styles.excerptSkeleton} />
        <SkeletonBox height={16} width="75%" style={styles.excerptSkeletonShort} />
        
        {/* Footer Skeleton */}
        <View style={styles.footer}>
          <SkeletonBox height={14} width={60} />
          <SkeletonBox height={16} width={16} style={styles.footerIcon} />
        </View>
      </View>
    </View>
  );
}

export function PostCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageSkeleton: {
    width: '100%',
  },
  body: {
    padding: 16,
  },
  titleSkeleton: {
    marginBottom: 8,
  },
  titleSkeletonShort: {
    marginBottom: 12,
  },
  excerptSkeleton: {
    marginBottom: 6,
  },
  excerptSkeletonShort: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerIcon: {
    borderRadius: 8,
  },
});

