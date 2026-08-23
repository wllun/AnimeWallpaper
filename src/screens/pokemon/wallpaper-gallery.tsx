import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { findPokemon, pokemonWallpapers } from '@/data/pokemon';
import { PokemonWallpaperCard } from '@/screens/pokemon/pokemon-wallpaper-card';
import { colors, radius, spacing, type } from '@/theme';

const moods = ['All', 'Cute', 'Battle', 'Minimal'] as const;

export function PokemonWallpaperGallery() {
  const router = useRouter();
  const { pokemonId } = useLocalSearchParams<{ pokemonId: string }>();
  const { width } = useWindowDimensions();
  const [mood, setMood] = useState<(typeof moods)[number]>('All');
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const selectedPokemon = findPokemon(pokemonId);
  const cardWidth = Math.max(148, Math.min(228, (width - spacing.xl * 2 - spacing.md) / 2));

  const visibleWallpapers = useMemo(
    () =>
      pokemonWallpapers.filter(
        (wallpaper) =>
          wallpaper.pokemonId === pokemonId && (mood === 'All' || wallpaper.mood === mood),
      ),
    [mood, pokemonId],
  );

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (!selectedPokemon) {
    return (
      <ScrollView
        contentContainerStyle={styles.invalidContent}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.screen}>
        <Text selectable style={styles.emptyTitle}>Pokémon not found</Text>
        <Pressable onPress={() => router.replace('/pokemon')} style={styles.retryButton}>
          <Text style={styles.retryText}>Return to Pokédex</Text>
        </Pressable>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.screen}>
      <Stack.Screen options={{ title: `${selectedPokemon.name} Wallpapers` }} />

      <View style={styles.summary}>
        <View style={[styles.summaryIcon, { backgroundColor: `${selectedPokemon.accent}20` }]}>
          <Image
            accessibilityLabel={`${selectedPokemon.name} icon`}
            cachePolicy="memory-disk"
            contentFit="contain"
            source={{ uri: selectedPokemon.iconUrl }}
            style={styles.pokemonIcon}
            transition={180}
          />
        </View>
        <View style={styles.summaryCopy}>
          <Text selectable style={styles.pokemonName}>{selectedPokemon.name}</Text>
          <Text selectable style={styles.number}>{selectedPokemon.number}</Text>
        </View>
        <View style={[styles.typePill, { borderColor: selectedPokemon.accent }]}>
          <Text selectable style={[styles.typeText, { color: selectedPokemon.accent }]}>
            {selectedPokemon.type}
          </Text>
        </View>
        <Text selectable style={styles.wallpaperCount}>
          {visibleWallpapers.length} wallpapers
        </Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.filters}
        showsHorizontalScrollIndicator={false}>
        {moods.map((item) => {
          const selected = item === mood;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={item}
              onPress={() => setMood(item)}
              style={({ pressed }) => [
                styles.filter,
                selected && styles.filterSelected,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {visibleWallpapers.length ? (
        <View style={styles.grid}>
          {visibleWallpapers.map((wallpaper) => (
            <PokemonWallpaperCard
              isFavorite={favorites.has(wallpaper.id)}
              key={wallpaper.id}
              onOpen={() =>
                router.push({
                  pathname: '/pokemon/[pokemonId]/[wallpaperId]',
                  params: { pokemonId, wallpaperId: wallpaper.id },
                })
              }
              onToggleFavorite={() => toggleFavorite(wallpaper.id)}
              wallpaper={wallpaper}
              width={cardWidth}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text selectable style={styles.emptyTitle}>No wallpapers yet</Text>
          <Text selectable style={styles.emptyText}>
            Only wallpapers tagged with {selectedPokemon.name} will appear here.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    gap: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.huge,
  },
  summary: {
    minHeight: 104,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
  },
  summaryIcon: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  pokemonIcon: { width: 70, height: 70 },
  summaryCopy: { flex: 1, minWidth: 90, gap: spacing.xs },
  pokemonName: { ...type.headline },
  number: { ...type.caption, fontVariant: ['tabular-nums'] },
  typePill: {
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.full,
  },
  typeText: { ...type.subhead, fontWeight: '800' },
  wallpaperCount: { ...type.caption, width: '100%', textAlign: 'right' },
  filters: { gap: spacing.sm, paddingRight: spacing.xl },
  filter: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  filterSelected: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  filterText: { ...type.subhead, fontWeight: '700' },
  filterTextSelected: { color: colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  pressed: { opacity: 0.76 },
  emptyState: { alignItems: 'center', gap: spacing.sm, paddingVertical: 72 },
  emptyTitle: { ...type.headline },
  emptyText: { ...type.subhead, maxWidth: 320, textAlign: 'center' },
  invalidContent: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, padding: spacing.xl },
  retryButton: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.full, backgroundColor: colors.accent },
  retryText: { ...type.headline },
});
