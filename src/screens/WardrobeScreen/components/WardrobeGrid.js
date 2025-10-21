import { StyleSheet, View } from 'react-native';
import { SPACING } from '../../../constants';
import { WardrobeItem } from './WardrobeItem';

export const WardrobeGrid = ({ items, onItemPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {items.map((item) => (
          <WardrobeItem 
            key={item.id} 
            item={item} 
            onPress={onItemPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});