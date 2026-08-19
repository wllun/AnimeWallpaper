# AnimeWalls Product Brief

## Product vision

AnimeWalls helps anime fans quickly find high-quality phone wallpapers that match their favorite genres and series. The experience should feel visual, fast, and focused on the artwork.

## Target users

- Anime fans who frequently personalize their phones.
- Users who want matching home-screen and lock-screen wallpaper sets.
- Users who prefer browsing by anime, character, mood, color, or popularity.

## Core user journey

1. Open the app and see featured and recently added wallpapers.
2. Select an anime category or search for a title or character.
3. Open a wallpaper to see a full-screen preview.
4. Favorite, download, share, or apply the wallpaper.
5. Choose **Home screen**, **Lock screen**, or **Both** when supported.

## MVP scope

### Included

- Category browsing.
- Search by anime, character, and tags.
- Two-column wallpaper feed.
- Wallpaper detail and device preview.
- Favorites stored locally.
- Download and share actions.
- Apply-wallpaper flow using platform-supported APIs.
- Loading, empty, offline, and error states.

### Later releases

- Accounts and cross-device favorite syncing.
- Personalized recommendations.
- Live or animated wallpapers.
- User uploads and creator profiles.
- Collections, playlists, and scheduled wallpaper rotation.
- Premium subscriptions or advertising.

## Primary navigation

| Tab | Purpose |
| --- | --- |
| Home | Featured categories and wallpaper feed |
| Explore | Search, filters, rankings, and new releases |
| Favorites | Saved wallpapers and collections |
| Settings | Theme, downloads, storage, attribution, and legal information |

## Initial category examples

Pokémon, Digimon, Bleach, Naruto, One Piece, Dragon Ball, Demon Slayer, Jujutsu Kaisen, My Hero Academia, and Attack on Titan.

These names are discovery metadata only. Artwork and branding must follow the rules in `CONTENT_GUIDELINES.md`.

## Success criteria

- A first-time user can find and open a wallpaper in three taps or fewer.
- The preview clearly demonstrates home-screen and lock-screen cropping.
- Applying or downloading a wallpaper always provides visible progress and confirmation.
- The interface remains usable with slow or unavailable networking.
- Every published artwork has a known source, usage right, and attribution record.

## Product decisions still open

- Final app name and visual identity.
- Native platform, Expo/React Native, Flutter, or separate iOS and Android apps.
- Whether wallpapers are bundled, served by a custom API, or supplied by licensed partners.
- Account, monetization, and moderation models.
