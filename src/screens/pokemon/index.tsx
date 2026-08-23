import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

import { pokemon } from '@/data/pokemon';
import { PokemonCard } from '@/screens/pokemon/pokemon-card';
import { colors, radius, spacing, type } from '@/theme';

const regions = ['All', 'Kanto', 'Johto', 'Hoenn', 'Sinnoh'] as const;

export function PokemonSelector() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<(typeof regions)[number]>('All');

  const contentWidth = Math.min(width, 720);
  const cardWidth = Math.max(104, (contentWidth - spacing.xl * 2 - spacing.md * 2) / 3);
  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return pokemon.filter((item) => {
      const matchesRegion = region === 'All' || item.region === region;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.number.replace('#', '').includes(normalizedQuery.replace('#', ''));
      return matchesRegion && matchesQuery;
    });
  }, [query, region]);

  return (
    <FlatList
      columnWrapperStyle={styles.row}
      contentContainerStyle={[styles.content, { maxWidth: contentWidth }]}
      contentInsetAdjustmentBehavior="automatic"
      data={filteredPokemon}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text selectable style={styles.emptyTitle}>No Pokémon found</Text>
          <Text selectable style={styles.emptyText}>Try another name, number, or region.</Text>
        </View>
      }
      ListHeaderComponent={
        <View style={styles.headerContent}>
          <View style={styles.intro}>
            <Text selectable style={styles.title}>Choose a Pokémon</Text>
            <Text selectable style={styles.subtitle}>Select one to explore its wallpapers</Text>
          </View>

          <View style={styles.search}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              accessibilityLabel="Search Pokémon"
              autoCapitalize="none"
              onChangeText={setQuery}
              placeholder="Search Pokémon"
              placeholderTextColor={colors.textFaint}
              returnKeyType="search"
              style={styles.searchInput}
              value={query}
            />
          </View>

          <FlatList
            contentContainerStyle={styles.regionList}
            data={regions}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = item === region;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  onPress={() => setRegion(item)}
                  style={({ pressed }) => [
                    styles.regionChip,
                    isSelected && styles.regionChipSelected,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={[styles.regionText, isSelected && styles.regionTextSelected]}>
                    {item}
                  </Text>
                </Pressable>
              );
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
      numColumns={3}
      renderItem={({ item }) => (
        <PokemonCard
          onPress={() =>
            router.push({ pathname: '/pokemon/[pokemonId]', params: { pokemonId: item.id } })
          }
          pokemon={item}
          width={cardWidth}
        />
      )}
      showsVerticalScrollIndicator={false}
      style={styles.screen}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    width: '100%',
    alignSelf: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.huge,
  },
  headerContent: { gap: spacing.xl, paddingBottom: spacing.sm },
  intro: { gap: spacing.xs },
  title: { ...type.title },
  subtitle: { ...type.subhead, fontSize: 16 },
  search: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderCurve: 'continuous',
    backgroundColor: colors.surface,
  },
  searchIcon: { color: colors.textMuted, fontSize: 28 },
  searchInput: { ...type.body, flex: 1, minHeight: 52 },
  regionList: { gap: spacing.sm, paddingRight: spacing.xl },
  regionChip: {
    minHeight: 42,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
  regionChipSelected: { borderColor: colors.accent, backgroundColor: colors.accent },
  regionText: { ...type.subhead, fontWeight: '700' },
  regionTextSelected: { color: colors.text },
  row: { gap: spacing.md },
  pressed: { opacity: 0.76 },
  emptyState: { alignItems: 'center', gap: spacing.sm, paddingVertical: 64 },
  emptyTitle: { ...type.headline },
  emptyText: { ...type.subhead, textAlign: 'center' },
});
