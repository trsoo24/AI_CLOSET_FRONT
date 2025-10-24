import { useCallback, useEffect, useState } from 'react';
import { categories } from '../../../data/mockData';
import { wardrobeService } from '../../../services/wardrobeService';

export const useWardrobe = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({
    totalItems: 0,
    monthlyWearCount: 0,
  });

  // 옷장 아이템 로드
  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await wardrobeService.getItems();

      // API 응답 실패 처리
      if (!response || response.success === false) {
        setError(response?.error || '옷장 아이템을 불러오는데 실패했습니다.');
        setItems([]);
        setFilteredItems([]);
        return;
      }

      const itemsData = response.data?.content || response.data || [];
      setItems(itemsData);
      setFilteredItems(itemsData);
    } catch (err) {
      console.error('Failed to load wardrobe items:', err);
      setError(err.message || err.error || '옷장 아이템을 불러오는데 실패했습니다.');
      // 에러 발생시 빈 배열로 설정
      setItems([]);
      setFilteredItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 통계 로드
  const loadStatistics = useCallback(async () => {
    try {
      const response = await wardrobeService.getStatistics();

      // API 응답 실패 처리
      if (!response || response.success === false) {
        setStatistics({
          totalItems: items.length,
          monthlyWearCount: 0,
        });
        return;
      }

      setStatistics(response.data || { totalItems: 0, monthlyWearCount: 0 });
    } catch (err) {
      console.error('Failed to load statistics:', err);
      // 에러 발생시 items 배열의 길이를 사용
      setStatistics({
        totalItems: items.length,
        monthlyWearCount: 0,
      });
    }
  }, [items.length]);

  // 카테고리 변경시 필터링
  useEffect(() => {
    if (selectedCategory === '전체') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.category === selectedCategory);
      setFilteredItems(filtered);
    }
  }, [selectedCategory, items]);

  // 초기 로드
  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 아이템 로드 후 통계 로드
  useEffect(() => {
    if (items.length > 0) {
      loadStatistics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // 카테고리 선택 핸들러
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  // 아이템 추가 핸들러
  const handleAddPress = useCallback(() => {
    // TODO: 아이템 추가 화면으로 이동
    console.log('Add item pressed');
  }, []);

  // 검색 핸들러
  const handleSearchPress = useCallback(() => {
    // TODO: 검색 화면으로 이동
    console.log('Search pressed');
  }, []);

  // 알림 핸들러
  const handleNotificationPress = useCallback(() => {
    // TODO: 알림 화면으로 이동
    console.log('Notification pressed');
  }, []);

  // 아이템 클릭 핸들러
  const handleItemPress = useCallback((item) => {
    // TODO: 아이템 상세 화면으로 이동
    console.log('Item pressed:', item);
  }, []);

  // 새로고침 핸들러
  const handleRefresh = useCallback(async () => {
    await loadItems();
    await loadStatistics();
  }, [loadItems, loadStatistics]);

  return {
    items: filteredItems,
    categories,
    selectedCategory,
    loading,
    error,
    statistics,
    handleCategorySelect,
    handleAddPress,
    handleSearchPress,
    handleNotificationPress,
    handleItemPress,
    handleRefresh,
  };
};
