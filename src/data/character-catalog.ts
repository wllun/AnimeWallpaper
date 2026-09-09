import type { WallpaperCategory } from '@/data/wallpapers';

export type CharacterWallpaper = {
  id: string;
  title: string;
  imageUrl: string;
  accent: string;
};

export type CatalogCharacter = {
  id: string;
  name: string;
  imageUrl: string;
  accent: string;
  wallpapers: CharacterWallpaper[];
};

export type CharacterCatalogSeries = {
  id: string;
  title: WallpaperCategory;
  origin: 'Japan' | 'China';
  accent: string;
  characters: CatalogCharacter[];
};

export const characterCatalog: CharacterCatalogSeries[] = [
  {
    id: 'bleach',
    title: 'Bleach',
    origin: 'Japan',
    accent: '#F97316',
    characters: [
      {
        id: 'ichigo',
        name: 'Ichigo',
        accent: '#F97316',
        imageUrl:
          'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=85',
        wallpapers: [
          {
            id: 'substitute-soul',
            title: 'Substitute Soul',
            imageUrl:
              'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=88',
            accent: '#F97316',
          },
          {
            id: 'bankai-night',
            title: 'Bankai Night',
            imageUrl:
              'https://images.unsplash.com/photo-1509023464722-18d996393ca8?auto=format&fit=crop&w=1200&q=88',
            accent: '#DC2626',
          },
          {
            id: 'orange-moon',
            title: 'Orange Moon',
            imageUrl:
              'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=88',
            accent: '#EA580C',
          },
        ],
      },
      {
        id: 'kenpachi',
        name: 'Kenpachi',
        accent: '#EAB308',
        imageUrl:
          'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=85',
        wallpapers: [
          {
            id: 'battle-instinct',
            title: 'Battle Instinct',
            imageUrl:
              'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=88',
            accent: '#EAB308',
          },
          {
            id: 'no-limits',
            title: 'No Limits',
            imageUrl:
              'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=88',
            accent: '#A16207',
          },
          {
            id: 'captains-fury',
            title: "Captain's Fury",
            imageUrl:
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88',
            accent: '#CA8A04',
          },
        ],
      },
    ],
  },
  {
    id: 'renegade-immortal',
    title: '仙逆',
    origin: 'China',
    accent: '#8B5CF6',
    characters: [
      {
        id: 'wang-lin',
        name: '王林',
        accent: '#8B5CF6',
        imageUrl:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
        wallpapers: [
          {
            id: 'immortal-path',
            title: '逆仙之路',
            imageUrl:
              'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=88',
            accent: '#8B5CF6',
          },
          {
            id: 'celestial-night',
            title: '星夜问道',
            imageUrl:
              'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=88',
            accent: '#6D28D9',
          },
          {
            id: 'lone-cultivator',
            title: '孤道长生',
            imageUrl:
              'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=88',
            accent: '#7C3AED',
          },
        ],
      },
    ],
  },
  {
    id: 'wu-geng-ji',
    title: '武庚纪',
    origin: 'China',
    accent: '#DC2626',
    characters: [
      {
        id: 'wu-geng',
        name: '武庚',
        accent: '#DC2626',
        imageUrl:
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
        wallpapers: [
          {
            id: 'crimson-rebellion',
            title: '逆天而行',
            imageUrl:
              'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=88',
            accent: '#DC2626',
          },
          {
            id: 'divine-resolve',
            title: '神力觉醒',
            imageUrl:
              'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=88',
            accent: '#B91C1C',
          },
          {
            id: 'warriors-dawn',
            title: '战士黎明',
            imageUrl:
              'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=88',
            accent: '#EA580C',
          },
        ],
      },
    ],
  },
];

export function findCharacterCatalogSeries(seriesId: string) {
  return characterCatalog.find((series) => series.id === seriesId);
}

export function findCharacterCatalogSeriesByTitle(title: WallpaperCategory) {
  return characterCatalog.find((series) => series.title === title);
}

export function findCatalogCharacter(seriesId: string, characterId: string) {
  return findCharacterCatalogSeries(seriesId)?.characters.find(
    (character) => character.id === characterId,
  );
}

export function findCatalogWallpaper(
  seriesId: string,
  characterId: string,
  wallpaperId: string,
) {
  return findCatalogCharacter(seriesId, characterId)?.wallpapers.find(
    (wallpaper) => wallpaper.id === wallpaperId,
  );
}
