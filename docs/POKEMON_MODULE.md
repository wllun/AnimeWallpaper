# Pokémon Module Flow

## Purpose

When a user selects Pokémon from the AnimeWalls home screen, open a dedicated Pokédex-style selector. The user chooses one Pokémon before seeing wallpapers, keeping the gallery focused and easy to browse.

## Screen flow

1. **Pokédex selector** — searchable three-column grid with a small icon, name, and Pokédex number for every Pokémon.
2. **Pokémon wallpaper gallery** — shows only wallpapers tagged with the selected Pokémon. Secondary filters can include Cute, Battle, and Minimal.
3. **Wallpaper preview** — previews the chosen artwork and lets the user select Lock screen or Home screen before applying it.

## Interaction rules

- Selecting the Pokémon category from Home opens the Pokédex selector.
- Search filters by Pokémon name or Pokédex number.
- Region chips filter the Pokédex without clearing the search query.
- Selecting a Pokémon opens a gallery whose header identifies that Pokémon and its type.
- No wallpaper containing a different Pokémon should appear in the filtered gallery.
- The back action from the gallery returns to the previous Pokédex position and filter state.
- Favorite state should remain consistent between the filtered gallery, Home, and Favorites.

## Mock screens

- `design/pokemon-pokedex-selector.png`
- `design/pokemon-wallpaper-gallery.png`
- `design/pokemon-wallpaper-preview.png`

The gallery and preview use abstract electric artwork as a safe placeholder. Production wallpapers must be original or properly licensed.
