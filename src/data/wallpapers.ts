export const catalogTitles = [
  'Pokémon',
  'Digimon',
  'Yu-Gi-Oh!',
  'Bleach',
  '仙逆',
  '完美世界',
  '百炼成神',
  '吞噬星空',
  '武庚纪',
  '原神',
  '鸣潮',
] as const;

export type WallpaperCategory = (typeof catalogTitles)[number];
export type CatalogOrigin = 'Japan' | 'China' | 'Game';

export type Wallpaper = {
  id: string;
  title: string;
  category: WallpaperCategory;
  origin: CatalogOrigin;
  imageUrl: string;
  accent: string;
};

export const wallpapers: Wallpaper[] = [
  {
    id: 'electric-partners',
    title: 'Pokémon',
    category: 'Pokémon',
    origin: 'Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85',
    accent: '#7754F8',
  },
  {
    id: 'digital-adventure',
    title: 'Digimon',
    category: 'Digimon',
    origin: 'Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    accent: '#008EC4',
  },
  {
    id: 'heart-of-the-cards',
    title: 'Yu-Gi-Oh!',
    category: 'Yu-Gi-Oh!',
    origin: 'Japan',
    imageUrl:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    accent: '#C59B32',
  },
  {
    id: 'soul-guardian',
    title: 'Bleach',
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
  {
    id: 'wu-geng-ji',
    title: '武庚纪',
    category: '武庚纪',
    origin: 'China',
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
    accent: '#B91C1C',
  },
  {
    id: 'genshin-impact',
    title: '原神',
    category: '原神',
    origin: 'Game',
    imageUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85',
    accent: '#7C3AED',
  },
  {
    id: 'wuthering-waves',
    title: '鸣潮',
    category: '鸣潮',
    origin: 'Game',
    imageUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85',
    accent: '#0F766E',
  },
];
