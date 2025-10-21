// API 기본 URL
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080',
  TIMEOUT: 10000, // 10초
};

// API 엔드포인트
export const API_ENDPOINTS = {
  // 인증
  AUTH: {
    SIGNUP: '/api/auth/signup',
    LOGIN: '/api/auth/login',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
  
  // 사용자
  USER: {
    ME: '/api/users/me',
    UPDATE: '/api/users/me',
    PASSWORD: '/api/users/me/password',
  },
  
  // 날씨
  WEATHER: {
    CURRENT: '/api/weather/current',
    HOURLY: '/api/weather/hourly',
    LOCATION: '/api/weather/location',
  },
  
  // 옷장
  WARDROBE: {
    ITEMS: '/api/wardrobe/items',
    ITEM: (id) => `/api/wardrobe/items/${id}`,
    CATEGORY: (category) => `/api/wardrobe/items/category/${category}`,
    SEARCH: '/api/wardrobe/items/search',
    FILTER: '/api/wardrobe/items/filter',
    STATISTICS: '/api/wardrobe/statistics',
    WEAR: (id) => `/api/wardrobe/items/${id}/wear`,
    IMAGE: (id) => `/api/wardrobe/items/${id}/image`,
  },
  
  // AI 코디 추천
  STYLING: {
    RECOMMENDATIONS: '/api/styling/recommendations',
    CONCEPTS: (concept) => `/api/styling/concepts/${concept}`,
    TIPS: (itemId) => `/api/styling/tips/${itemId}`,
    WEATHER_BASED: '/api/styling/weather-based',
  },
  
  // 코디
  OUTFITS: {
    LIST: '/api/outfits',
    MY: '/api/outfits/my',
    DETAIL: (id) => `/api/outfits/${id}`,
    SHARE: (id) => `/api/outfits/${id}/share`,
    ITEMS: (id) => `/api/outfits/${id}/items`,
  },
  
  // 커뮤니티
  COMMUNITY: {
    FEED: '/api/community/feed',
    TRENDING: '/api/community/trending',
    LIKE: (id) => `/api/community/outfits/${id}/like`,
    COMMENTS: (id) => `/api/community/outfits/${id}/comments`,
    USER_OUTFITS: (userId) => `/api/community/users/${userId}/outfits`,
  },
  
  // 쇼핑
  SHOP: {
    PRODUCTS: '/api/shop/products',
    PRODUCT: (id) => `/api/shop/products/${id}`,
    SEARCH: '/api/shop/products/search',
    RECOMMENDATIONS: '/api/shop/recommendations',
    CART: '/api/shop/cart',
    WISHLIST: '/api/shop/wishlist',
  },
};