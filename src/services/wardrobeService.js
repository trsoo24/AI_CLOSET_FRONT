import { API_ENDPOINTS } from '../config/api';
import apiClient from './apiClient';

export const wardrobeService = {
  // 옷 목록 조회
  async getItems(params = { page: 0, size: 20 }) {
    return await apiClient.get(API_ENDPOINTS.WARDROBE.ITEMS, params);
  },

  // 옷 상세 조회
  async getItem(itemId) {
    return await apiClient.get(API_ENDPOINTS.WARDROBE.ITEM(itemId));
  },

  // 옷 등록
  async createItem(itemData) {
    return await apiClient.post(API_ENDPOINTS.WARDROBE.ITEMS, itemData);
  },

  // 옷 수정
  async updateItem(itemId, itemData) {
    return await apiClient.put(API_ENDPOINTS.WARDROBE.ITEM(itemId), itemData);
  },

  // 옷 삭제
  async deleteItem(itemId) {
    return await apiClient.delete(API_ENDPOINTS.WARDROBE.ITEM(itemId));
  },

  // 카테고리별 조회
  async getItemsByCategory(category, params = {}) {
    return await apiClient.get(API_ENDPOINTS.WARDROBE.CATEGORY(category), params);
  },

  // 검색
  async searchItems(keyword, params = { page: 0, size: 20 }) {
    return await apiClient.get(API_ENDPOINTS.WARDROBE.SEARCH, {
      keyword,
      ...params,
    });
  },

  // 필터링
  async filterItems(filters) {
    return await apiClient.get(API_ENDPOINTS.WARDROBE.FILTER, filters);
  },

  // 통계
  async getStatistics() {
    return await apiClient.get(API_ENDPOINTS.WARDROBE.STATISTICS);
  },

  // 착용 기록
  async recordWear(itemId) {
    return await apiClient.post(API_ENDPOINTS.WARDROBE.WEAR(itemId));
  },
};