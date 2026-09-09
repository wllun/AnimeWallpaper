# AnimeWalls

AnimeWalls is a React Native wallpaper browser built with Expo SDK 57, TypeScript, and Expo Router.

## Run locally

```bash
npm install
npm start
```

Scan the QR code with Expo Go, or press `a` for Android and `w` for web.

## Current sample

- Responsive anime wallpaper home feed.
- Japanese anime collections: Pokémon, Digimon, Yu-Gi-Oh!, and Bleach.
- Chinese animation (国漫) collections: 仙逆, 完美世界, 百炼成神, 吞噬星空, and 武庚纪.
- Interactive favorite toggles.
- Search navigation.
- Native Home, Explore, Favorites, and Settings tabs.
- Placeholder screens ready for the next development phase.
- Searchable Pokédex selector with region filters and cached Pokémon sprites.
- Pokémon-specific wallpaper galleries with mood filters.
- Wallpaper preview with lock/home selection, favorite, download, share, and apply actions.

## Project structure

```text
src/app/          Expo Router routes
src/components/   Shared interface components
src/data/         Sample wallpaper data
src/screens/      Screen implementations
src/theme/        Shared visual design tokens
assets/           App icons and bundled media
design/           Product mockups
docs/             Product and UX documentation
```

The wallpaper images are temporary Unsplash placeholders. Replace them with original or properly licensed anime artwork before release.
