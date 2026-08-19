# UX and Screen Specification

## Visual direction

- Dark, immersive background that allows colorful artwork to dominate.
- Violet and cyan accents for selection, focus, and primary actions.
- Large rounded cards, readable labels, and comfortable touch targets.
- Bottom navigation remains visible on the four main destinations.
- Artwork should keep a consistent portrait ratio, preferably 9:16 or 9:19.5.

The initial visual reference is `design/home-screen-mockup.png`.

## Home screen

### Layout order

1. Safe-area status region.
2. App title and optional profile/avatar button.
3. Search field.
4. **Choose your anime** category row.
5. Two-column wallpaper grid.
6. Bottom navigation.

### Interactions

- Tapping the search field opens Explore with the keyboard focused.
- Tapping a category filters the grid and visually selects that category.
- Tapping a wallpaper opens its detail screen.
- Tapping the heart toggles Favorite without opening the card.
- Pulling down refreshes the current feed.
- Reaching the bottom loads the next page without duplicating items.

### Card content

- Portrait thumbnail.
- Favorite button in the upper-right corner.
- Short title in a bottom gradient for legibility.
- Optional premium or animated badge, reserved for later releases.

## Wallpaper detail screen

- Full-height artwork preview with a back button and favorite action.
- Toggle between **Lock screen** and **Home screen** preview overlays.
- Artwork title, anime/category, artist, source, and license/attribution link.
- Primary **Set wallpaper** button.
- Secondary Download and Share actions.
- A related-wallpapers section below the primary controls.

## Apply-wallpaper sheet

Present three choices when supported:

- Home screen.
- Lock screen.
- Both screens.

If a platform does not permit direct application, explain the limitation, save the image, and open the closest system wallpaper flow available.

## Required UI states

| State | Expected behavior |
| --- | --- |
| Loading | Skeleton cards preserve layout and avoid content jumping |
| Empty category | Friendly message plus **View all wallpapers** action |
| No search results | Show the query, offer spelling/category suggestions, and allow clearing filters |
| Offline | Show cached content when available and a persistent offline indicator |
| Error | Explain what failed and provide a Retry action |
| Favorite saved | Animate the heart briefly and provide accessible confirmation |
| Downloading | Show progress and prevent duplicate requests |
| Applied | Confirm which screen or screens were updated |

## Accessibility

- Minimum touch target: 44 × 44 points or 48 × 48 dp.
- Body text contrast should meet WCAG AA.
- Do not rely on color alone to show the selected category or favorite state.
- Provide meaningful labels such as “Favorite Electric Partners wallpaper.”
- Respect larger text, reduced motion, and screen-reader navigation order.
- Keep text outside important artwork focal areas when possible.

## Suggested data model

```ts
type Wallpaper = {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  categories: string[];
  characters: string[];
  tags: string[];
  artistName: string;
  sourceUrl: string;
  license: string;
  attributionRequired: boolean;
  isPremium: boolean;
  createdAt: string;
};
```

## Home-screen acceptance criteria

- The first useful content appears without requiring sign-in.
- Category chips scroll horizontally and preserve the selected value.
- The feed supports pagination and pull-to-refresh.
- Favorite state persists after the app restarts.
- Images use placeholders and recover gracefully from failed loads.
- Safe areas work on notched devices and devices with gesture navigation.
- The screen supports common narrow and large phone widths.
