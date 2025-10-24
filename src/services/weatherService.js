import { API_ENDPOINTS } from '../config/api';
import apiClient from './apiClient';

export const weatherService = {
  // 현재 날씨
  async getCurrentWeather(latitude, longitude) {
    return await apiClient.get(
      API_ENDPOINTS.WEATHER.CURRENT,
      {
        latitude,
        longitude,
      },
      false // 날씨 API는 인증 불필요
    );
  },

  // 시간대별 날씨
  async getHourlyWeather(latitude, longitude) {
    return await apiClient.get(
      API_ENDPOINTS.WEATHER.HOURLY,
      {
        latitude,
        longitude,
      },
      false // 날씨 API는 인증 불필요
    );
  },

  // 위치 기반 날씨
  async getWeatherByLocation(location) {
    return await apiClient.post(API_ENDPOINTS.WEATHER.LOCATION, { location }, false);
  },
};