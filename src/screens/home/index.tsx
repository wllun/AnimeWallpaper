import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import { categories, wallpapers } from '@/data/wallpapers';
import { WallpaperCard } from '@/screens/home/wallpaper-card';

export function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('All');
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  const cardWidth = Math.max(146, Math.min(220, (width - 52) / 2));
  const visibleWallpapers = useMemo(
    () =>
      selectedCategory === 'All'
        ? wallpapers
        : wallpapers.filter((wallpaper) => wallpaper.category === selectedCategory),
    [selectedCategory],
  );

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      style={styles.screen}>
      <View style={styles.header}>
        <Text selectable style={styles.brand}>
          Anime<Text style={styles.brandAccent}>Walls</Text>
        </Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AW</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="search"
        onPress={() => router.push('/explore')}
        style={({ pressed }) => [styles.search, pressed && styles.searchPressed]}>
        <Text style={styles.searchIcon}>⌕</Text>
        <Text style={styles.searchText}>Search anime or characters</Text>
      </Pressable>

      <View style={styles.sectionHeading}>
        <View>
          <Text selectable style={styles.eyebrow}>
            COLLECTIONS
          </Text>
          <Text selectable style={styles.heading}>
            Choose your anime
          </Text>
        </View>
        <Text selectable style={styles.count}>
          {visibleWallpapers.length} wallpapers
        </Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.categories}
        showsHorizontalScrollIndicator={false}>
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={({ pressed }) => [
                styles.category,
                isSelected && styles.categorySelected,
                pressed && styles.categoryPressed,
              ]}>
              <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.grid}>
        {visibleWallpapers.map((wallpaper) => (
          <WallpaperCard
            isFavorite={favorites.has(wallpaper.id)}
            key={wallpaper.id}
            onOpen={() =>
              Alert.alert(wallpaper.title, 'The full wallpaper preview will be implemented next.')
            }
            onToggleFavorite={() => toggleFavorite(wallpaper.id)}
            wallpaper={wallpaper}
            width={cardWidth}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#090B16' },
  content: { gap: 24, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 36 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', letterSpacing: -1.5 },
  brandAccent: { color: '#8B5CFF' },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#825BFF',
    backgroundColor: '#181D38',
  },
  avatarText: { color: '#B7A4FF', fontWeight: '800' },
  search: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#343B63',
    borderRadius: 20,
    borderCurve: 'continuous',
    backgroundColor: '#11162A',
  },
  searchPressed: { borderColor: '#7C5CFF', backgroundColor: '#151B33' },
  searchIcon: { color: '#9EA9CA', fontSize: 30, lineHeight: 32 },
  searchText: { color: '#9EA9CA', fontSize: 16, flex: 1 },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  eyebrow: { color: '#7558E7', fontSize: 11, fontWeight: '800', letterSpacing: 1.8 },
  heading: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', letterSpacing: -0.5 },
  count: { color: '#6F7A9E', fontSize: 12, paddingBottom: 3 },
  categories: { gap: 10, paddingRight: 20 },
  category: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#343B63',
    borderRadius: 22,
    backgroundColor: '#0D1121',
  },
  categorySelected: { borderColor: '#8B6AFF', backgroundColor: '#704CF4' },
  categoryPressed: { opacity: 0.78 },
  categoryText: { color: '#A6AFCC', fontSize: 15, fontWeight: '600' },
  categoryTextSelected: { color: '#FFFFFF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
});
