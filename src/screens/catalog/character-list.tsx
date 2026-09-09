import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { findCharacterCatalogSeries } from '@/data/character-catalog';
import { colors, radius, shadows, spacing, type } from '@/theme';

const MAX_CONTENT_WIDTH = 720;
const THREE_COLUMN_BREAKPOINT = 640;

export function CharacterList() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { seriesId } = useLocalSearchParams<{ seriesId: string }>();
  const series = findCharacterCatalogSeries(seriesId);

  if (!series) {
    return (
      <ScrollView
        contentContainerStyle={styles.invalidContent}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}>
        <Text selectable style={styles.heading}>Catalog not found</Text>
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
      <Stack.Screen options={{ title: series.title }} />

      <View style={[styles.summary, { borderColor: `${series.accent}80` }]}>
        <Text selectable style={styles.eyebrow}>
          {series.origin === 'China' ? 'CHINESE ANIMATION · 国漫' : 'JAPANESE ANIME'}
        </Text>
        <Text selectable style={styles.heading}>{series.title}</Text>
        <Text selectable style={styles.supportingText}>
          Choose a character to browse wallpapers.
        </Text>
      </View>

      <View style={styles.grid}>
        {series.characters.map((character) => (
          <Pressable
            accessibilityLabel={`Open ${character.name} wallpapers`}
            accessibilityRole="button"
            key={character.id}
            onPress={() =>
              router.push({
                pathname: '/catalog/[seriesId]/[characterId]',
                params: { seriesId, characterId: character.id },
              })
            }
            style={({ pressed }) => [
              styles.characterCard,
              { width: cardWidth, borderColor: pressed ? character.accent : colors.border },
              pressed && styles.pressed,
            ]}>
            <Image
              accessibilityLabel={`${character.name} character preview`}
              cachePolicy="memory-disk"
              contentFit="cover"
              source={{ uri: character.imageUrl }}
              style={StyleSheet.absoluteFill}
              transition={220}
            />
            <View style={styles.scrim} />
            <View style={[styles.cardLabel, { backgroundColor: `${character.accent}E6` }]}>
              <Text selectable numberOfLines={1} style={styles.characterName}>
                {character.name}
              </Text>
              <Text selectable style={styles.wallpaperCount}>
                {character.wallpapers.length} wallpapers
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
    gap: spacing.sm,
    padding: spacing.xl,
    borderWidth: 1,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
  },
  eyebrow: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  heading: { ...type.title },
  supportingText: { ...type.subhead },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  characterCard: {
    aspectRatio: 0.68,
    overflow: 'hidden',
    borderWidth: 1,
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
    minHeight: 76,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  characterName: { ...type.headline, textAlign: 'center' },
  wallpaperCount: { ...type.caption, color: 'rgba(255, 255, 255, 0.78)' },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
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
