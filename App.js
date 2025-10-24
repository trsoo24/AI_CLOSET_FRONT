import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { TabBar } from './src/components/common/TabBar';
import { LoginModal } from './src/components/common/LoginModal';
import { LoginRequired } from './src/components/common/LoginRequired';
import { useAuth } from './src/hooks/useAuth';
import { HomeScreen } from './src/screens/HomeScreen';
import { WardrobeScreen } from './src/screens/WardrobeScreen';
import { tokenService } from './src/services/tokenService';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, checking, login } = useAuth();
  const [processingOAuth, setProcessingOAuth] = useState(true);

  useEffect(() => {
    checkOAuthCallback();
  }, []);

  // OAuth 콜백 처리
  const checkOAuthCallback = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      if (accessToken && refreshToken) {
        console.log('OAuth 토큰 수신:', { accessToken, refreshToken });

        // 토큰 저장
        await tokenService.saveTokens(accessToken, refreshToken);

        // URL에서 토큰 제거 (보안)
        window.history.replaceState({}, document.title, '/');

        // 로그인 상태로 변경
        login();
      }
    } catch (error) {
      console.error('OAuth 콜백 처리 실패:', error);
    } finally {
      setProcessingOAuth(false);
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // 로그인 성공 핸들러
  const handleLoginSuccess = () => {
    login();
    setShowLoginModal(false);
  };

  const renderScreen = () => {
    // 홈 페이지는 로그인 없이 접근 가능
    if (activeTab === 'home') {
      return <HomeScreen />;
    }

    // 다른 페이지는 로그인 필요
    if (!isLoggedIn) {
      return <LoginRequired onLoginPress={() => setShowLoginModal(true)} />;
    }

    // 로그인된 상태에서 다른 페이지 렌더링
    switch (activeTab) {
      case 'wardrobe':
        return <WardrobeScreen />;
      case 'styling':
        return <HomeScreen />;
      case 'shop':
        return <HomeScreen />;
      case 'profile':
        return <HomeScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // OAuth 처리 중 또는 로그인 상태 확인 중
  if (processingOAuth || checking) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderScreen()}
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />

      <LoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});