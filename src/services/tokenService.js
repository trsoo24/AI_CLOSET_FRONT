import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
  async saveTokens(accessToken, refreshToken) {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
    } catch (error) {
      console.error('토큰 저장 실패:', error);
      throw error;
    }
  }

  async getAccessToken() {
    try {
      return await AsyncStorage.getItem('accessToken');
    } catch (error) {
      console.error('토큰 가져오기 실패:', error);
      return null;
    }
  }

  async getRefreshToken() {
    try {
      return await AsyncStorage.getItem('refreshToken');
    } catch (error) {
      console.error('리프레시 토큰 가져오기 실패:', error);
      return null;
    }
  }

  async clearTokens() {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('토큰 삭제 실패:', error);
      throw error;
    }
  }

  async hasValidToken() {
    const token = await this.getAccessToken();
    return !!token;
  }
}

export const tokenService = new TokenService();