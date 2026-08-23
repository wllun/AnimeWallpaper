import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { PokemonWallpaper } from '@/data/pokemon';
import { colors, radius, shadows, spacing, type } from '@/theme';

type PokemonWallpaperCardProps = {
  wallpaper: PokemonWallpaper;
  width: number;
  isFavorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
};

export function PokemonWallpaperCard({
  wallpaper,
  width,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: PokemonWallpaperCardProps) {
  return (
    <View style={[styles.card, { width }]}>
      <Pressable
        accessibilityLabel={`Open ${wallpaper.title}`}
        accessibilityRole="button"
        onPress={onOpen}
        style={({ pressed }) => [styles.cardAction, pressed && styles.pressed]}>
        <Image
          cachePolicy="memory-disk"
          contentFit="cover"
          source={{ uri: wallpaper.imageUrl }}
          style={StyleSheet.absoluteFill}
          transition={220}
        />
        <View style={styles.scrim} />
        <View style={[styles.label, { backgroundColor: `${wallpaper.accent}E6` }]}>
          <Text selectable numberOfLines={1} style={styles.title}>
            {wallpaper.title}
          </Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${wallpaper.title} ${
          isFavorite ? 'from' : 'to'
        } favorites`}
        accessibilityRole="button"
        hitSlop={10}
        onPress={onToggleFavorite}
        style={({ pressed }) => [styles.favorite, pressed && styles.favoritePressed]}>
        <Text style={styles.heart}>{isFavorite ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 0.6,
    overflow: 'hidden',
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceRaised,
    boxShadow: shadows.card,
  },
  cardAction: { flex: 1 },
  pressed: { opacity: 0.84, transform: [{ scale: 0.98 }] },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: colors.blackOverlay },
  favorite: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.overlay,
  },
  favoritePressed: { transform: [{ scale: 0.9 }] },
  heart: { color: colors.text, fontSize: 26 },
  label: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: 58,
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  title: { ...type.headline, textAlign: 'center' },
});
