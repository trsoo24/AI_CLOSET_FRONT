import { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const loggedIn = await authService.isLoggedIn();
    console.log('로그인 상태 확인:', loggedIn);
    setIsLoggedIn(loggedIn);
    setChecking(false);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
  };

  return { isLoggedIn, checking, login, logout };
};