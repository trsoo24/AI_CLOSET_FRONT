import { useEffect } from 'react';
import { Linking } from 'react-native';
import { authService } from '../services/authService';

export const useDeepLink = (onLoginSuccess) => {
  useEffect(() => {
    const handleDeepLink = async ({ url }) => {
      if (url && url.includes('oauth/callback')) {
        const success = await authService.handleDeepLink(url);
        if (success) {
          onLoginSuccess();
        }
      }
    };

    // URL 이벤트 리스너 등록
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // 앱이 닫힌 상태에서 Deep Link로 열렸을 때
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription?.remove();
    };
  }, [onLoginSuccess]);
};