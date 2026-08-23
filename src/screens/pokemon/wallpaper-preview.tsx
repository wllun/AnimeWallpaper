import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { findPokemon, findPokemonWallpaper } from '@/data/pokemon';
import { colors, radius, shadows, spacing, type } from '@/theme';

type PreviewMode = 'Lock screen' | 'Home screen';

export function WallpaperPreview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { pokemonId, wallpaperId } = useLocalSearchParams<{
    pokemonId: string;
    wallpaperId: string;
  }>();
  const [previewMode, setPreviewMode] = useState<PreviewMode>('Lock screen');
  const [isFavorite, setIsFavorite] = useState(false);
  const selectedPokemon = findPokemon(pokemonId);
  const wallpaper = findPokemonWallpaper(pokemonId, wallpaperId);

  if (!selectedPokemon || !wallpaper) {
    return (
      <ScrollView
        contentContainerStyle={styles.invalidContent}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}>
        <Text selectable style={styles.title}>Wallpaper not found</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Go back</Text>
        </Pressable>
      </ScrollView>
    );
  }

  const previewHeight = Math.max(500, Math.min(680, height * 0.66));

  return (
    <ScrollView
      contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, spacing.xxl) }]}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.screen}>
      <View style={[styles.hero, { height: previewHeight }]}>
        <Image
          accessibilityLabel={`${wallpaper.title} wallpaper preview`}
          cachePolicy="memory-disk"
          contentFit="cover"
          source={{ uri: wallpaper.imageUrl }}
          style={StyleSheet.absoluteFill}
          transition={240}
        />
        <View style={styles.heroScrim} />
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.floatingButton,
            { top: insets.top + spacing.md, left: spacing.lg },
            pressed && styles.pressed,
          ]}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Pressable
          accessibilityLabel={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
          accessibilityRole="button"
          onPress={() => setIsFavorite((current) => !current)}
          style={({ pressed }) => [
            styles.floatingButton,
            { top: insets.top + spacing.md, right: spacing.lg },
            pressed && styles.pressed,
          ]}>
          <Text style={styles.favoriteIcon}>{isFavorite ? '♥' : '♡'}</Text>
        </Pressable>
      </View>

      <View style={styles.panel}>
        <View style={styles.wallpaperInfo}>
          <Text selectable style={styles.title}>{wallpaper.title}</Text>
          <Text selectable style={styles.metadata}>
            {selectedPokemon.name} • 1440 × 3200
          </Text>
        </View>

        <View accessibilityRole="tablist" style={styles.segmentedControl}>
          {(['Lock screen', 'Home screen'] as const).map((mode) => {
            const selected = mode === previewMode;
            return (
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                key={mode}
                onPress={() => setPreviewMode(mode)}
                style={({ pressed }) => [
                  styles.segment,
                  selected && styles.segmentSelected,
                  pressed && styles.pressed,
                ]}>
                <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>
                  {mode}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text selectable style={styles.attribution}>Artwork preview</Text>

        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert('Wallpaper ready', `${wallpaper.title} selected for your ${previewMode.toLowerCase()}.`)
          }
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Set wallpaper</Text>
        </Pressable>

        <View style={styles.secondaryActions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => Alert.alert('Download', 'Download support will be connected next.')}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <Text style={styles.secondaryButtonText}>⇩  Download</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => Alert.alert('Share', 'Share support will be connected next.')}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
            <Text style={styles.secondaryButtonText}>↗  Share</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { backgroundColor: colors.background },
  hero: { width: '100%', overflow: 'hidden', backgroundColor: colors.surfaceRaised },
  heroScrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(5, 7, 18, 0.1)' },
  floatingButton: {
    position: 'absolute',
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.overlay,
  },
  backIcon: { color: colors.text, fontSize: 42, lineHeight: 44 },
  favoriteIcon: { color: colors.text, fontSize: 28 },
  panel: {
    gap: spacing.xl,
    padding: spacing.xl,
    paddingTop: spacing.xxl,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
    boxShadow: shadows.card,
  },
  wallpaperInfo: { alignItems: 'center', gap: spacing.sm },
  title: { ...type.title, textAlign: 'center' },
  metadata: { ...type.subhead, fontVariant: ['tabular-nums'] },
  segmentedControl: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
  },
  segment: { flex: 1, minHeight: 52, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md },
  segmentSelected: { backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: colors.accent },
  segmentText: { ...type.subhead, fontWeight: '700' },
  segmentTextSelected: { color: colors.text },
  attribution: { ...type.caption, textAlign: 'center' },
  primaryButton: {
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.accent,
    boxShadow: shadows.glow,
  },
  primaryButtonText: { ...type.headline },
  secondaryActions: { flexDirection: 'row', gap: spacing.md },
  secondaryButton: {
    flex: 1,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceRaised,
  },
  secondaryButtonText: { ...type.subhead, color: colors.text, fontWeight: '700' },
  pressed: { opacity: 0.76 },
  invalidContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, padding: spacing.xl },
});
