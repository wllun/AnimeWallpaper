import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { findCatalogCharacter, findCharacterCatalogSeries } from '@/data/character-catalog';
import { colors, radius, shadows, spacing, type } from '@/theme';

const MAX_CONTENT_WIDTH = 720;
const THREE_COLUMN_BREAKPOINT = 640;

export function CharacterWallpapers() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { seriesId, characterId } = useLocalSearchParams<{
    seriesId: string;
    characterId: string;
  }>();
  const series = findCharacterCatalogSeries(seriesId);
  const character = findCatalogCharacter(seriesId, characterId);

  if (!series || !character) {
    return (
      <ScrollView
        contentContainerStyle={styles.invalidContent}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}>
        <Text selectable style={styles.heading}>Character not found</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Go back</Text>
        </Pressable>
      </ScrollView>
    );
  }

  const columnCount = width >= THREE_COLUMN_BREAKPOINT ? 3 : 2;
  const contentWidth = Math.min(width, MAX_CONTENT_WIDTH) - spacing.xl * 2;
  const cardWidth = Math.min(
    220,
    (contentWidth - spacing.md * (columnCount - 1)) / columnCount,
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom + spacing.xl, spacing.huge) },
      ]}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.screen}>
      <Stack.Screen options={{ title: `${character.name} Wallpapers` }} />

      <View style={styles.summary}>
        <View style={[styles.avatar, { borderColor: character.accent }]}>
          <Image
            accessibilityLabel={`${character.name} character preview`}
            cachePolicy="memory-disk"
            contentFit="cover"
            source={{ uri: character.imageUrl }}
            style={StyleSheet.absoluteFill}
            transition={180}
          />
        </View>
        <View style={styles.summaryCopy}>
          <Text selectable style={styles.heading}>{character.name}</Text>
          <Text selectable style={styles.supportingText}>{series.title}</Text>
          <Text selectable style={styles.wallpaperCount}>
            {character.wallpapers.length} wallpapers
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        {character.wallpapers.map((wallpaper) => (
          <Pressable
            accessibilityLabel={`Open ${wallpaper.title} wallpaper`}
            accessibilityRole="button"
            key={wallpaper.id}
            onPress={() =>
              router.push({
                pathname: '/catalog/[seriesId]/[characterId]/[wallpaperId]',
                params: { seriesId, characterId, wallpaperId: wallpaper.id },
              })
            }
            style={({ pressed }) => [
              styles.wallpaperCard,
              { width: cardWidth },
              pressed && styles.pressed,
            ]}>
            <Image
              accessibilityLabel={`${wallpaper.title} wallpaper`}
              cachePolicy="memory-disk"
              contentFit="cover"
              source={{ uri: wallpaper.imageUrl }}
              style={StyleSheet.absoluteFill}
              transition={220}
            />
            <View style={styles.scrim} />
            <View style={[styles.cardLabel, { backgroundColor: `${wallpaper.accent}E6` }]}>
              <Text selectable numberOfLines={1} style={styles.wallpaperTitle}>
                {wallpaper.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignSelf: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  summary: {
    minHeight: 108,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 82,
    height: 82,
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceRaised,
  },
  summaryCopy: { flex: 1, gap: spacing.xs },
  heading: { ...type.title },
  supportingText: { ...type.subhead },
  wallpaperCount: { ...type.caption },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  wallpaperCard: {
    aspectRatio: 0.6,
    overflow: 'hidden',
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceRaised,
    boxShadow: shadows.card,
  },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: colors.blackOverlay },
  cardLabel: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: 62,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  wallpaperTitle: { ...type.headline, textAlign: 'center' },
  pressed: { opacity: 0.84, transform: [{ scale: 0.98 }] },
  invalidContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  primaryButton: {
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.accent,
  },
  primaryButtonText: { ...type.headline },
});
