import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';

export function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.header, { paddingTop: Math.max(insets.top + 16, 28) }]} noPadding>
      <Image
        source={require('@/assets/images/info.png')}
        style={styles.logo}
        contentFit="cover"
      />
      {/* @ts-expect-error - React 19 type compatibility issue with React Native */}
      <View style={styles.searchContainer}>
        <Image
          source={require('@/assets/images/MagnifyingGlass.svg')}
          style={styles.searchIcon}
          contentFit="contain"
        />
        {/* @ts-expect-error - React 19 type compatibility issue with React Native */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search News"
          placeholderTextColor="#1D1B1B80"
        />
      </View>
      <Link href="/liked" asChild>
        <TouchableOpacity style={styles.likeButtonContainer}>
          <Image
            source={require('@/assets/images/like.svg')}
            style={styles.likeIcon}
            contentFit="contain"
          />
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 12,
    gap: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  searchContainer: {
    width: 229,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#3E59460D',
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 0,
  },
  searchInput: {
    fontSize: 12,
    textAlign: 'center',
    color: '#1D1B1B80',
    paddingLeft: 2,
    marginLeft: 0,
    flex: 1,
  },
  likeButtonContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F3EB',
    borderRadius: 10,
  },
  likeIcon: {
    width: 19,
    height: 19,
  },
});

