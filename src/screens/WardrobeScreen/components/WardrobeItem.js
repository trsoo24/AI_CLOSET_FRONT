// ✅ UI 컴포넌트만 담당
import { Shirt } from 'lucide-react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, SPACING } from '../../../constants';

export const WardrobeItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      {item.imageUrl ? (
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Shirt size={40} color={COLORS.gray300} />
        </View>
      )}
      <View style={styles.overlay}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        {item.wearCount > 0 && (
          <Text style={styles.wearCount}>👕 {item.wearCount}회</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '31.5%',
    aspectRatio: 0.75,
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.gray100,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: SPACING.sm,
  },
  name: {
    fontSize: 10,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  wearCount: {
    fontSize: 9,
    color: COLORS.secondary,
    opacity: 0.8,
    marginTop: 2,
  },
});