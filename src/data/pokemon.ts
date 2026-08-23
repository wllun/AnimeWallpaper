export type Pokemon = {
  id: string;
  name: string;
  number: string;
  type: string;
  region: 'Kanto' | 'Sinnoh';
  accent: string;
  iconUrl: string;
};

export type PokemonWallpaper = {
  id: string;
  pokemonId: string;
  title: string;
  mood: 'Cute' | 'Battle' | 'Minimal';
  imageUrl: string;
  accent: string;
};

const sprite = (number: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

export const pokemon: Pokemon[] = [
  { id: 'pikachu', name: 'Pikachu', number: '#0025', type: 'Electric', region: 'Kanto', accent: '#FACC15', iconUrl: sprite(25) },
  { id: 'charizard', name: 'Charizard', number: '#0006', type: 'Fire', region: 'Kanto', accent: '#F97316', iconUrl: sprite(6) },
  { id: 'bulbasaur', name: 'Bulbasaur', number: '#0001', type: 'Grass', region: 'Kanto', accent: '#65A30D', iconUrl: sprite(1) },
  { id: 'squirtle', name: 'Squirtle', number: '#0007', type: 'Water', region: 'Kanto', accent: '#38BDF8', iconUrl: sprite(7) },
  { id: 'eevee', name: 'Eevee', number: '#0133', type: 'Normal', region: 'Kanto', accent: '#D6A76C', iconUrl: sprite(133) },
  { id: 'gengar', name: 'Gengar', number: '#0094', type: 'Ghost', region: 'Kanto', accent: '#A855F7', iconUrl: sprite(94) },
  { id: 'lucario', name: 'Lucario', number: '#0448', type: 'Fighting', region: 'Sinnoh', accent: '#3B82F6', iconUrl: sprite(448) },
  { id: 'snorlax', name: 'Snorlax', number: '#0143', type: 'Normal', region: 'Kanto', accent: '#22D3EE', iconUrl: sprite(143) },
  { id: 'mew', name: 'Mew', number: '#0151', type: 'Psychic', region: 'Kanto', accent: '#F472B6', iconUrl: sprite(151) },
];

export const pokemonWallpapers: PokemonWallpaper[] = [
  {
    id: 'neon-spark',
    pokemonId: 'pikachu',
    title: 'Neon Spark',
    mood: 'Battle',
    imageUrl: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=88',
    accent: '#7C3AED',
  },
  {
    id: 'forest-friend',
    pokemonId: 'pikachu',
    title: 'Forest Friend',
    mood: 'Cute',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=88',
    accent: '#4D7C0F',
  },
  {
    id: 'thunder-rush',
    pokemonId: 'pikachu',
    title: 'Thunder Rush',
    mood: 'Battle',
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=88',
    accent: '#0369A1',
  },
  {
    id: 'golden-minimal',
    pokemonId: 'pikachu',
    title: 'Golden Minimal',
    mood: 'Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=88',
    accent: '#A16207',
  },
];

export function findPokemon(id: string) {
  return pokemon.find((item) => item.id === id);
}

export function findPokemonWallpaper(pokemonId: string, wallpaperId: string) {
  return pokemonWallpapers.find(
    (wallpaper) => wallpaper.pokemonId === pokemonId && wallpaper.id === wallpaperId,
  );
}
