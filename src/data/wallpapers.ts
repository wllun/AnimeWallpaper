export type Wallpaper = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  accent: string;
};

export const categories = ['All', 'Pokémon', 'Digimon', 'Bleach', 'Naruto'] as const;

export const wallpapers: Wallpaper[] = [
  {
    id: 'electric-partners',
    title: 'Electric Partners',
    category: 'Pokémon',
    imageUrl:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85',
    accent: '#7754F8',
  },
  {
    id: 'digital-adventure',
    title: 'Digital Adventure',
    category: 'Digimon',
    imageUrl:
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85',
    accent: '#008EC4',
  },
  {
    id: 'soul-guardian',
    title: 'Soul Guardian',
    category: 'Bleach',
    imageUrl:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=85',
    accent: '#5031A9',
  },
  {
    id: 'ninja-sunset',
    title: 'Ninja Sunset',
    category: 'Naruto',
    imageUrl:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=900&q=85',
    accent: '#A22D6D',
  },
];
