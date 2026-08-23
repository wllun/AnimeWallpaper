import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Pokemon } from '@/data/pokemon';
import { colors, radius, shadows, spacing, type } from '@/theme';

type PokemonCardProps = {
  pokemon: Pokemon;
  width: number;
  onPress: () => void;
};

export function PokemonCard({ pokemon, width, onPress }: PokemonCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Open ${pokemon.name} wallpapers`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { width, borderColor: pressed ? pokemon.accent : colors.border },
        pressed && styles.cardPressed,
      ]}>
      <View style={[styles.iconBackground, { backgroundColor: `${pokemon.accent}1F` }]}>
        <Image
          accessibilityLabel={`${pokemon.name} icon`}
          cachePolicy="memory-disk"
          contentFit="contain"
          source={{ uri: pokemon.iconUrl }}
          style={styles.icon}
          transition={180}
        />
      </View>
      <Text selectable style={styles.name} numberOfLines={1}>
        {pokemon.name}
      </Text>
      <Text selectable style={styles.number}>
        {pokemon.number}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 166,
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
    boxShadow: shadows.card,
  },
  cardPressed: { opacity: 0.8, transform: [{ scale: 0.97 }] },
  iconBackground: {
    width: 92,
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  icon: { width: 84, height: 84 },
  name: { ...type.subhead, color: colors.text, fontWeight: '800' },
  number: { ...type.caption, fontVariant: ['tabular-nums'] },
});
