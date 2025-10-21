// ✅ 재사용 가능한 카테고리 탭
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from '../../../constants';

export const CategoryTabs = ({ categories, selected, onSelect }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.list}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.tab,
                selected === category && styles.tabActive
              ]}
              onPress={() => onSelect(category)}
            >
              <Text style={[
                styles.text,
                selected === category && styles.textActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    paddingVertical: SPACING.md,
  },
  list: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  },
  tab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.full,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  textActive: {
    color: COLORS.secondary,
  },
});