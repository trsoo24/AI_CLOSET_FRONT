import { Bell, Plus, Search } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from '../../../constants';

export const WardrobeHeader = ({ onAddPress, onSearchPress, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 옷장</Text>
      <View style={styles.rightContainer}>
        {onSearchPress && (
          <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
            <Search size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {onNotificationPress && (
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Bell size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Plus size={20} color={COLORS.secondary} />
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconButton: {
    padding: SPACING.xs,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  addButtonText: {
    color: COLORS.secondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
  },
});