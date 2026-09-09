import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

import { wallpapers } from '@/data/wallpapers';
import { WallpaperCard } from '@/screens/home/wallpaper-card';
import { colors, radius, spacing, type } from '@/theme';

const MAX_CONTENT_WIDTH = 720;
const THREE_COLUMN_BREAKPOINT = 640;
const originTabs = [
  { label: 'All', value: 'All' },
  { label: 'Japanese', value: 'Japan' },
  { label: 'Chinese', value: 'China' },
] as const;

type OriginFilter = (typeof originTabs)[number]['value'];

export function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [originFilter, setOriginFilter] = useState<OriginFilter>('All');
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  const columnCount = width >= THREE_COLUMN_BREAKPOINT ? 3 : 2;
  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH) - spacing.xl * 2;
  const cardWidth = Math.min(
    220,
    (contentWidth - spacing.md * (columnCount - 1)) / columnCount,
  );
  const bottomContentInset = insets.bottom + 90;
  const visibleWallpapers = useMemo(
    () =>
      originFilter === 'All'
        ? wallpapers
        : wallpapers.filter((wallpaper) => wallpaper.origin === originFilter),
    [originFilter],
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
      contentContainerStyle={[styles.content, { paddingBottom: bottomContentInset }]}
      scrollIndicatorInsets={{ bottom: bottomContentInset }}
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

      <View accessibilityLabel="Catalog origin" style={styles.originTabs}>
        {originTabs.map((tab) => {
          const isSelected = originFilter === tab.value;

          return (
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected }}
              key={tab.value}
              onPress={() => setOriginFilter(tab.value)}
              style={({ pressed }) => [
                styles.originTab,
                isSelected && styles.originTabSelected,
                pressed && styles.originTabPressed,
              ]}>
              <Text style={[styles.originTabText, isSelected && styles.originTabTextSelected]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

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
  originTabs: {
    flexDirection: 'row',
    gap: spacing.xs,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  originTab: {
    minHeight: 44,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
  },
  originTabSelected: { backgroundColor: colors.accent },
  originTabPressed: { opacity: 0.78 },
  originTabText: { ...type.subhead, fontSize: 14, fontWeight: '700' },
  originTabTextSelected: { color: colors.text },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
});
