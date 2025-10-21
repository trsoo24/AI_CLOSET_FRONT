import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../../constants';
import { LoginForm } from './components/LoginForm';
import { SocialLoginButtons } from './components/SocialLoginButtons';
import { useAuth } from './hooks/useAuth';

export const LoginScreen = ({ onLoginSuccess, onSignupPress }) => {
  const { loading, error, login, loginWithNaver, loginWithKakao } = useAuth();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      onLoginSuccess?.();
    }
  };

  const handleNaverLogin = async () => {
    const result = await loginWithNaver();
    if (result.success) {
      onLoginSuccess?.();
    }
  };

  const handleKakaoLogin = async () => {
    const result = await loginWithKakao();
    if (result.success) {
      onLoginSuccess?.();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>CLOSETLY</Text>
          <Text style={styles.subtitle}>AI가 추천하는 나만의 스타일</Text>
        </View>

        <View style={styles.formContainer}>
          <LoginForm 
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />

          <SocialLoginButtons
            onNaverPress={handleNaverLogin}
            onKakaoPress={handleKakaoLogin}
            loading={loading}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.signupText}>아직 회원이 아니신가요?</Text>
          <TouchableOpacity onPress={onSignupPress}>
            <Text style={styles.signupLink}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl * 2,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray500,
  },
  formContainer: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xxl,
    gap: SPACING.xs,
  },
  signupText: {
    color: COLORS.gray500,
    fontSize: FONT_SIZE.sm,
  },
  signupLink: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
  },
});