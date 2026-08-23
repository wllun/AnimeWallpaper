import { DarkTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/theme';

const animeWallsTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.cyan,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={animeWallsTheme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerTitleStyle: { color: colors.text, fontWeight: '800' },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pokemon/index" options={{ title: 'Pokédex' }} />
        <Stack.Screen name="pokemon/[pokemonId]/index" options={{ title: 'Wallpapers' }} />
        <Stack.Screen
          name="pokemon/[pokemonId]/[wallpaperId]"
          options={{ headerShown: false }}
        />
      </Stack>
    </ThemeProvider>
  );
}
