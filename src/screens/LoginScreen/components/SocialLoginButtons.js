import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from '../../../constants';

export const SocialLoginButtons = ({ onNaverPress, onKakaoPress, loading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>또는</Text>
        <View style={styles.line} />
      </View>

      {/* 네이버 로그인 */}
      <TouchableOpacity 
        style={[styles.button, styles.naverButton]}
        onPress={onNaverPress}
        disabled={loading}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.naverIcon}>N</Text>
        </View>
        <Text style={styles.naverText}>네이버로 시작하기</Text>
      </TouchableOpacity>

      {/* 카카오 로그인 */}
      <TouchableOpacity 
        style={[styles.button, styles.kakaoButton]}
        onPress={onKakaoPress}
        disabled={loading}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.kakaoIcon}>K</Text>
        </View>
        <Text style={styles.kakaoText}>카카오로 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  dividerText: {
    marginHorizontal: SPACING.lg,
    color: COLORS.gray400,
    fontSize: FONT_SIZE.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    left: SPACING.lg,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  naverIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  naverText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  kakaoIcon: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  kakaoText: {
    color: '#000000',
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
  },
});