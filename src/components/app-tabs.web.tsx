import { Tabs, TabList, TabSlot, TabTrigger, TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const tabs = [
  { name: 'home', href: '/' as const, label: 'Home', symbol: '⌂' },
  { name: 'explore', href: '/explore' as const, label: 'Explore', symbol: '⌕' },
  { name: 'favorites', href: '/favorites' as const, label: 'Favorites', symbol: '♡' },
  { name: 'settings', href: '/settings' as const, label: 'Settings', symbol: '⚙' },
];

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList asChild>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TabTrigger asChild href={tab.href} key={tab.name} name={tab.name}>
              <WebTab label={tab.label} symbol={tab.symbol} />
            </TabTrigger>
          ))}
        </View>
      </TabList>
    </Tabs>
  );
}

function WebTab({ isFocused, label, symbol, ...props }: TabTriggerSlotProps & {
  label: string;
  symbol: string;
}) {
  return (
    <Pressable {...props} style={[styles.tab, isFocused && styles.tabFocused]}>
      <Text style={[styles.symbol, isFocused && styles.textFocused]}>{symbol}</Text>
      <Text style={[styles.label, isFocused && styles.textFocused]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: { height: '100%' },
  tabBar: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    left: 16,
    minHeight: 64,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#10152A',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
  },
  tab: { minWidth: 84, alignItems: 'center', gap: 2, paddingHorizontal: 12, paddingVertical: 8 },
  tabFocused: { borderRadius: 18, backgroundColor: '#211B42' },
  symbol: { color: '#7C86A8', fontSize: 21 },
  label: { color: '#7C86A8', fontSize: 11, fontWeight: '700' },
  textFocused: { color: '#9A7BFF' },
});
