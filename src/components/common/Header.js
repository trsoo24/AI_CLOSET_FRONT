import { Bell, Compass, Search } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../../constants';

export const Header = ({ 
  title, 
  showSearch = true, 
  showNotification = true,
  showExplore = false,
  onExplorePress,
  rightButton 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        {showSearch && (
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {showExplore && (
          <TouchableOpacity style={styles.iconButton} onPress={onExplorePress}>
            <Compass size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {showNotification && (
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
        {rightButton}
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
    gap: SPACING.md,
  },
  iconButton: {
    padding: SPACING.xs,
  },
});