import { useState } from 'react';
import { authService } from '../../../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      if (!email || !password) {
        setError('이메일과 비밀번호를 입력해주세요.');
        return { success: false };
      }

      const response = await authService.login(email, password);
      
      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.error || '로그인에 실패했습니다.');
        return { success: false };
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const loginWithNaver = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('=== 네이버 로그인 시작 ===');
      const response = await authService.loginWithNaver();
      console.log('=== 네이버 로그인 응답:', response);
      
      if (response.success) {
        return { success: true };
      } else {
        console.error('=== 네이버 로그인 실패:', response.error);
        setError(response.error);
        return { success: false };
      }
    } catch (err) {
      console.error('=== 네이버 로그인 예외:', err);
      console.error('에러 상세:', err.message, err.stack);
      setError('네이버 로그인에 실패했습니다.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const loginWithKakao = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('=== 카카오 로그인 시작 ===');
      const response = await authService.loginWithKakao();
      console.log('=== 카카오 로그인 응답:', response);
      
      if (response.success) {
        return { success: true };
      } else {
        console.error('=== 카카오 로그인 실패:', response.error);
        setError(response.error);
        return { success: false };
      }
    } catch (err) {
      console.error('=== 카카오 로그인 예외:', err);
      console.error('에러 상세:', err.message, err.stack);
      setError('카카오 로그인에 실패했습니다.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.signup(userData);
      
      if (response.success) {
        return { success: true };
      } else {
        setError(response.error || '회원가입에 실패했습니다.');
        return { success: false };
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
    loginWithNaver,
    loginWithKakao,
    signup,
  };
};