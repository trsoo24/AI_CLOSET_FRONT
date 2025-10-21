import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../../../constants';

export const WardrobeStats = ({ totalItems, monthlyWearCount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.countText}>총 {totalItems}개의 아이템</Text>
        {monthlyWearCount > 0 && (
          <Text style={styles.statsText}>이번 달 {monthlyWearCount}번 착용</Text>
        )}
      </View>
      <Text style={styles.tipText}>💡 옷을 클릭하면 AI 코디 팁을 볼 수 있어요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  countText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  statsText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
  },
  tipText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
    marginBottom: SPACING.md,
  },
});