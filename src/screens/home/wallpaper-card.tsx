import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Wallpaper } from '@/data/wallpapers';
import { colors, radius, spacing, type } from '@/theme';

type WallpaperCardProps = {
  wallpaper: Wallpaper;
  width: number;
  isFavorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
};

export function WallpaperCard({
  wallpaper,
  width,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: WallpaperCardProps) {
  const originLabel =
    wallpaper.origin === 'China'
      ? 'CHINESE ANIMATION · 国漫'
      : wallpaper.origin === 'Game'
        ? 'GAME'
        : 'JAPANESE ANIME';

  return (
    <View style={[styles.card, { width }]}>
      <Pressable
        accessibilityLabel={`Open ${wallpaper.title} wallpaper`}
        accessibilityRole="button"
        onPress={onOpen}
        style={({ pressed }) => [styles.cardAction, pressed && styles.cardPressed]}>
        <Image
          cachePolicy="memory-disk"
          contentFit="cover"
          source={{ uri: wallpaper.imageUrl }}
          style={StyleSheet.absoluteFill}
          transition={250}
        />
        <View style={styles.imageShade} />
        <View style={[styles.label, { backgroundColor: wallpaper.accent }]}>
          <Text numberOfLines={1} style={styles.origin}>
            {originLabel}
          </Text>
          <Text numberOfLines={1} style={styles.title}>
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
        style={({ pressed }) => [styles.favorite, pressed && styles.pressed]}>
        <Text style={styles.heart}>{isFavorite ? '♥' : '♡'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 0.62,
    overflow: 'hidden',
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceRaised,
  },
  cardAction: { flex: 1 },
  cardPressed: { opacity: 0.86 },
  imageShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.blackOverlay,
  },
  favorite: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  pressed: { transform: [{ scale: 0.92 }] },
  heart: { color: colors.text, fontSize: 26, lineHeight: 30 },
  label: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: 70,
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: spacing.md,
  },
  origin: {
    color: 'rgba(255, 255, 255, 0.76)',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  title: { ...type.subhead, color: colors.text, fontSize: 15, fontWeight: '800', textAlign: 'center' },
});
