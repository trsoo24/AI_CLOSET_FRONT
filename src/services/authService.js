import { Platform } from 'react-native';
import { OAuthHandler } from '../utils/oauthHandler';
import { apiClient } from './apiClient';
import { tokenService } from './tokenService';

const API_URL = Platform.OS === 'web' 
  ? 'http://localhost:8080'
  : 'http://10.0.2.2:8080/api'; // 안드로이드 앱 테스트

class AuthService {
  async isLoggedIn() {
    return await tokenService.hasValidToken();
  }

  async logout() {
    await tokenService.clearTokens();
  }

  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      }, false); // 인증 불필요

      if (response.success && response.data) {
        // 토큰 저장
        await tokenService.saveTokens(
          response.data.accessToken,
          response.data.refreshToken
        );
        return { success: true, data: response.data };
      }

      return { success: false, error: response.error };
    } catch (error) {
      console.error('로그인 실패:', error);
      return { success: false, error: '로그인에 실패했습니다.' };
    }
  }

  // 회원가입
  async signup(userData) {
    try {
      const response = await apiClient.post('/auth/signup', userData, false);

      if (response.success) {
        return { success: true };
      }

      return { success: false, error: response.error };
    } catch (error) {
      console.error('회원가입 실패:', error);
      return { success: false, error: '회원가입에 실패했습니다.' };
    }
  }

  async loginWithNaver() {
    try {
      console.log('네이버 로그인 시작');
      const loginUrl = `${API_URL}/oauth2/authorization/naver`;
      
      if (Platform.OS === 'web') {
        // 전체 페이지 리다이렉트
        window.location.href = loginUrl;
        return { success: true };
      } else {
        // 모바일은 나중에 구현
        return { success: false, error: '모바일은 아직 지원하지 않습니다.' };
      }
    } catch (error) {
      console.error('네이버 로그인 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 🔄 수정: 카카오 로그인 (페이지 리다이렉트 방식)
  async loginWithKakao() {
    try {
      console.log('카카오 로그인 시작');
      const loginUrl = `${API_URL}/oauth2/authorization/kakao`;
      
      if (Platform.OS === 'web') {
        // 전체 페이지 리다이렉트
        window.location.href = loginUrl;
        return { success: true };
      } else {
        // 모바일은 나중에 구현
        return { success: false, error: '모바일은 아직 지원하지 않습니다.' };
      }
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      return { success: false, error: error.message };
    }
  }

  // 소셜 로그인 공통 처리
  async socialLogin(provider) {
    const loginUrl = `${API_URL}/oauth2/authorization/${provider}`;
    
    console.log('OAuth URL:', loginUrl);
    
    if (Platform.OS === 'web') {
      return await OAuthHandler.handleWebOAuth(loginUrl);
    } else {
      return await OAuthHandler.handleMobileOAuth(loginUrl);
    }
  }

  // Deep Link 처리 (모바일)
  async handleDeepLink(url) {
    return await OAuthHandler.handleDeepLink(url);
  }

  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/user/me');
      if (response.success) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      return null;
    }
  }
}

export const authService = new AuthService();