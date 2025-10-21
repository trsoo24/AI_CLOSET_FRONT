import { Home, Shirt, ShoppingBag, Sparkles, User } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants';

const TAB_CONFIG = [
  { id: 'home', label: '홈', Icon: Home },
  { id: 'wardrobe', label: '옷장', Icon: Shirt },
  { id: 'styling', label: 'AI코디', Icon: Sparkles },
  { id: 'shop', label: '쇼핑', Icon: ShoppingBag },
  { id: 'profile', label: 'MY', Icon: User },
];

export const TabBar = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {TAB_CONFIG.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabChange(tab.id)}
          >
            <tab.Icon 
              size={22} 
              color={isActive ? COLORS.primary : COLORS.gray400} 
            />
            <Text style={[
              styles.label,
              isActive && styles.labelActive
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    height: 64,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: COLORS.gray400,
    marginTop: 4,
  },
  labelActive: {
    color: COLORS.primary,
    fontWeight: '500',
  },
});