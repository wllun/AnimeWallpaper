import { ScrollView, StyleSheet, Text, View } from 'react-native';

type PlaceholderScreenProps = {
  symbol: string;
  title: string;
  description: string;
};

export function PlaceholderScreen({ symbol, title, description }: PlaceholderScreenProps) {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}
      style={styles.screen}>
      <View style={styles.symbolContainer}>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <Text selectable style={styles.title}>
        {title}
      </Text>
      <Text selectable style={styles.description}>
        {description}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#090B16' },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 32,
  },
  symbolContainer: {
    width: 88,
    height: 88,
    borderRadius: 28,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171B32',
  },
  symbol: { color: '#9C7CFF', fontSize: 44 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', textAlign: 'center' },
  description: {
    maxWidth: 420,
    color: '#9BA6C7',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
