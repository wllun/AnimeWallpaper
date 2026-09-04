export const categories = [
  'All',
  'Pokémon',
  'Digimon',
  'Yu-Gi-Oh!',
  'Bleach',
  '仙逆',
  '完美世界',
  '百炼成神',
  '吞噬星空',
] as const;

export type WallpaperCategory = Exclude<(typeof categories)[number], 'All'>;
export type AnimationOrigin = 'Japan' | 'China';

export type Wallpaper = {
  id: string;
  title: string;
  category: WallpaperCategory;
  origin: AnimationOrigin;
  imageUrl: string;
  accent: string;
};

export const wallpapers: Wallpaper[] = [
  {
    id: 'electric-partners',
    title: 'Electric Partners',
    category: 'Pokémon',
    origin: 'Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85',
    accent: '#7754F8',
  },
  {
    id: 'digital-adventure',
    title: 'Digital Adventure',
    category: 'Digimon',
    origin: 'Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    accent: '#008EC4',
  },
  {
    id: 'heart-of-the-cards',
    title: 'Heart of the Cards',
    category: 'Yu-Gi-Oh!',
    origin: 'Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    accent: '#C59B32',
  },
  {
    id: 'soul-guardian',
    title: 'Soul Guardian',
    category: 'Bleach',
    origin: 'Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=85',
    accent: '#5031A9',
  },
  {
    id: 'renegade-immortal',
    title: '仙逆',
    category: '仙逆',
    origin: 'China',
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
    accent: '#8A3FFC',
  },
  {
    id: 'perfect-world',
    title: '完美世界',
    category: '完美世界',
    origin: 'China',
    imageUrl:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85',
    accent: '#168AAD',
  },
  {
    id: 'apotheosis',
    title: '百炼成神',
    category: '百炼成神',
    origin: 'China',
    imageUrl:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=85',
    accent: '#D97706',
  },
  {
    id: 'swallowed-star',
    title: '吞噬星空',
    category: '吞噬星空',
    origin: 'China',
    imageUrl:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85',
    accent: '#2563EB',
  },
];
