import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Wallpaper } from '@/data/wallpapers';

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
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${wallpaper.title} wallpaper`}
      onPress={onOpen}
      style={({ pressed }) => [styles.card, { width, opacity: pressed ? 0.86 : 1 }]}>
      <Image
        contentFit="cover"
        source={{ uri: wallpaper.imageUrl }}
        style={StyleSheet.absoluteFill}
        transition={250}
      />
      <View style={styles.imageShade} />
      <Pressable
        accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${wallpaper.title} ${
          isFavorite ? 'from' : 'to'
        } favorites`}
        accessibilityRole="button"
        hitSlop={10}
        onPress={(event) => {
          event.stopPropagation();
          onToggleFavorite();
        }}
        style={({ pressed }) => [styles.favorite, pressed && styles.pressed]}>
        <Text style={styles.heart}>{isFavorite ? '♥' : '♡'}</Text>
      </Pressable>
      <View style={[styles.label, { backgroundColor: wallpaper.accent }]}>
        <Text numberOfLines={1} style={styles.title}>
          {wallpaper.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 0.62,
    overflow: 'hidden',
    borderRadius: 22,
    borderCurve: 'continuous',
    backgroundColor: '#171B32',
  },
  imageShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7, 10, 25, 0.12)',
  },
  favorite: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(6, 8, 22, 0.75)',
  },
  pressed: { transform: [{ scale: 0.92 }] },
  heart: { color: '#FFFFFF', fontSize: 26, lineHeight: 30 },
  label: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: 58,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  title: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', textAlign: 'center' },
});
