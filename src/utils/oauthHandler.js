import { Linking } from 'react-native';
import { tokenService } from '../services/tokenService';

export class OAuthHandler {
  static async handleWebOAuth(loginUrl) {
    const popup = window.open(loginUrl, 'OAuth Login', 'width=500,height=600');

    return new Promise((resolve, reject) => {
      const messageHandler = async (event) => {
        if (event.origin !== 'http://localhost:8080') return;

        if (event.data.type === 'OAUTH_SUCCESS') {
          const { accessToken, refreshToken } = event.data;
          await tokenService.saveTokens(accessToken, refreshToken);
          popup?.close();
          window.removeEventListener('message', messageHandler);
          resolve(true);
        } else if (event.data.type === 'OAUTH_ERROR') {
          popup?.close();
          window.removeEventListener('message', messageHandler);
          reject(new Error(event.data.message));
        }
      };

      window.addEventListener('message', messageHandler);

      // 팝업이 닫혔을 때 처리
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageHandler);
          reject(new Error('로그인이 취소되었습니다.'));
        }
      }, 1000);
    });
  }

  static async handleMobileOAuth(loginUrl) {
    await Linking.openURL(loginUrl);
    return true;
  }

  static async handleDeepLink(url) {
    try {
      const params = new URL(url).searchParams;
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      if (accessToken && refreshToken) {
        await tokenService.saveTokens(accessToken, refreshToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Deep Link 처리 실패:', error);
      return false;
    }
  }
}