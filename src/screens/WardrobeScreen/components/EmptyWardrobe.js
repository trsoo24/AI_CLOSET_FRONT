import { Shirt } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from '../../../constants';

export const EmptyWardrobe = ({ onAddPress }) => {
  return (
    <View style={styles.container}>
      <Shirt size={64} color={COLORS.gray300} />
      <Text style={styles.text}>아직 등록된 옷이 없어요</Text>
      <TouchableOpacity style={styles.button} onPress={onAddPress}>
        <Text style={styles.buttonText}>첫 옷 추가하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: SPACING.xl,
  },
  text: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray500,
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  button: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
  },
  buttonText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});