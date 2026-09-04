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
import { colors, radius, spacing, type } from '@/theme';

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

  function selectCategory(category: (typeof categories)[number]) {
    if (category === 'Pokémon') {
      router.push('/pokemon');
      return;
    }
    setSelectedCategory(category);
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
        <Text style={styles.searchText}>Search anime, donghua, or characters</Text>
      </Pressable>

      <View style={styles.sectionHeading}>
        <View>
          <Text selectable style={styles.eyebrow}>
            COLLECTIONS
          </Text>
          <Text selectable style={styles.heading}>
            Choose your series
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
              onPress={() => selectCategory(category)}
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
            onOpen={() => {
              if (wallpaper.category === 'Pokémon') {
                router.push('/pokemon');
                return;
              }
              Alert.alert(
                wallpaper.title,
                `This ${wallpaper.origin === 'China' ? 'Chinese animation' : 'Japanese anime'} module will be implemented next.`,
              );
            }}
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
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    gap: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 36,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { ...type.largeTitle, letterSpacing: -1.5 },
  brandAccent: { color: colors.accent },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.surfaceRaised,
  },
  avatarText: { color: colors.textMuted, fontWeight: '800' },
  search: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
  },
  searchPressed: { borderColor: colors.accent, backgroundColor: colors.surfaceRaised },
  searchIcon: { color: colors.textMuted, fontSize: 30, lineHeight: 32 },
  searchText: { ...type.body, color: colors.textMuted, flex: 1 },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  eyebrow: { color: '#7558E7', fontSize: 11, fontWeight: '800', letterSpacing: 1.8 },
  heading: { ...type.title, letterSpacing: -0.5 },
  count: { ...type.caption, paddingBottom: 3 },
  categories: { gap: 10, paddingRight: 20 },
  category: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  categorySelected: { borderColor: colors.accent, backgroundColor: colors.accent },
  categoryPressed: { opacity: 0.78 },
  categoryText: { ...type.subhead, fontSize: 15, fontWeight: '600' },
  categoryTextSelected: { color: colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
});
