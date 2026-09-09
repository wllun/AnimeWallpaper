import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  findCatalogCharacter,
  findCatalogWallpaper,
  findCharacterCatalogSeries,
} from '@/data/character-catalog';
import { colors, radius, shadows, spacing, type } from '@/theme';

export function CatalogWallpaperPreview() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { seriesId, characterId, wallpaperId } = useLocalSearchParams<{
    seriesId: string;
    characterId: string;
    wallpaperId: string;
  }>();
  const series = findCharacterCatalogSeries(seriesId);
  const character = findCatalogCharacter(seriesId, characterId);
  const wallpaper = findCatalogWallpaper(seriesId, characterId, wallpaperId);

  if (!series || !character || !wallpaper) {
    return (
      <View style={styles.invalidContent}>
        <Text selectable style={styles.title}>Wallpaper not found</Text>
        <Pressable onPress={() => router.back()} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  function setWallpaper() {
    Alert.alert(
      'Set wallpaper',
      process.env.EXPO_OS === 'web'
        ? 'Open this wallpaper on your phone to use your system wallpaper picker.'
        : 'System wallpaper integration will be connected when the final wallpaper asset is provided.',
    );
  }

  return (
    <View style={styles.screen}>
      <Image
        accessibilityLabel={`${wallpaper.title} wallpaper preview`}
        cachePolicy="memory-disk"
        contentFit="cover"
        source={{ uri: wallpaper.imageUrl }}
        style={StyleSheet.absoluteFill}
        transition={240}
      />
      <View style={styles.scrim} />

      <Pressable
        accessibilityLabel="Go back"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          { top: insets.top + spacing.md },
          pressed && styles.pressed,
        ]}>
        <Text style={styles.backIcon}>‹</Text>
      </Pressable>

      <View style={[styles.actionPanel, { paddingBottom: Math.max(insets.bottom, spacing.xl) }]}>
        <Text selectable style={styles.title}>{wallpaper.title}</Text>
        <Text selectable style={styles.metadata}>
          {series.title} · {character.name}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={setWallpaper}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>Set wallpaper</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'flex-end', backgroundColor: colors.background },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(5, 7, 18, 0.18)' },
  backButton: {
    position: 'absolute',
    left: spacing.lg,
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
  actionPanel: {
    gap: spacing.sm,
    padding: spacing.xl,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderCurve: 'continuous',
    backgroundColor: colors.overlay,
    boxShadow: shadows.card,
  },
  title: { ...type.title, textAlign: 'center' },
  metadata: { ...type.subhead, color: colors.textMuted, textAlign: 'center' },
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
  primaryButtonText: { ...type.headline, color: colors.text },
  pressed: { opacity: 0.78 },
  invalidContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
});
