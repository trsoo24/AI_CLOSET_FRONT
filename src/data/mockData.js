export const weatherData = {
  location: '서울특별시 강남구',
  currentTemp: '24°C',
  condition: '맑음',
  comment: '가벼운 니트 한 장이면 완벽한 날씨예요!',
  hourly: [
    { time: '09:00', temp: '18°', icon: '☀️' },
    { time: '12:00', temp: '23°', icon: '☀️' },
    { time: '15:00', temp: '24°', icon: '🌤️' },
    { time: '18:00', temp: '20°', icon: '🌥️' },
    { time: '21:00', temp: '17°', icon: '🌙' },
  ],
};

export const stylingConcepts = [
  { id: 'all', name: '전체', icon: '✨' },
  { id: 'casual', name: '캐주얼', icon: '👕' },
  { id: 'date', name: '데이트', icon: '💕' },
  { id: 'meeting', name: '모임', icon: '🍻' },
  { id: 'street', name: '스트릿', icon: '🎨' },
  { id: 'office', name: '오피스', icon: '💼' },
];

export const aiStylings = {
  casual: [
    { 
      id: 1, 
      title: '편안한 데일리 룩', 
      concept: 'casual',
      items: ['화이트 티셔츠', '블루 데님', '화이트 스니커즈'],
      season: '봄/가을',
      likes: 247
    },
  ],
  date: [
    { 
      id: 3, 
      title: '로맨틱 데이트 룩', 
      concept: 'date',
      items: ['플라워 원피스', '화이트 가디건', '샌들'],
      season: '봄/여름',
      likes: 512
    },
  ],
  street: [
    { 
      id: 5, 
      title: '힙한 스트릿 룩', 
      concept: 'street',
      items: ['오버핏 후디', '카고팬츠', '청키 스니커즈'],
      season: '사계절',
      likes: 678
    },
  ],
};

export const myClothes = [
  {
    id: 1,
    name: '화이트 기본 티셔츠',
    category: '상의',
    season: '사계절',
    color: 'white',
    aiTip: {
      title: '화이트 티셔츠 활용 꿀팁',
      tips: [
        '블루 데님과 매치하면 깔끔한 캐주얼 룩',
        '블랙 슬랙스와 함께 세미 정장 스타일',
        '카키 카고팬츠로 밀리터리 무드 연출',
      ],
      recommendation: [
        { type: 'owned', name: '블루 데님', category: '하의' },
        { type: 'shop', name: '와이드 슬랙스', price: 45900 },
      ],
    },
  },
  {
    id: 2,
    name: '블루 데님 팬츠',
    category: '하의',
    season: '사계절',
    color: 'blue',
    aiTip: {
      title: '데님 팬츠 스타일링',
      tips: [
        '화이트/그레이 상의로 클래식한 무드',
        '스니커즈로 캐주얼하게, 로퍼로 세련되게',
      ],
      recommendation: [
        { type: 'owned', name: '화이트 티셔츠', category: '상의' },
        { type: 'shop', name: '베이직 니트', price: 39000 },
      ],
    },
  },
];

export const communityPosts = [
  {
    id: 1,
    user: { name: '유경' },
    outfit: {
      title: '오늘의 데일리 룩',
      concept: 'casual',
      items: ['니트', '데님', '스니커즈'],
    },
    likes: 234,
    comments: 12,
    createdAt: '2시간 전',
  },
];

export const userProfile = {
  name: '유경',
  email: 'kuk9931@naver.com',
  totalOutfits: 48,
  savedStylings: 12,
  sharedOutfits: 3,
  followers: 234,
  following: 189,
};

export const categories = [
  '전체', '상의', '하의', '아우터', '원피스', '신발', '가방', '액세서리'
];

export const aiRecommendations = [
  { id: 1, title: '데일리 캐주얼 룩', items: 3 },
  { id: 2, title: '오피스 시크 룩', items: 4 },
];

export const personalizedItems = [
  { id: 1, name: '베이직 니트', price: 42900, brand: '브랜드A' },
  { id: 2, name: '와이드 슬랙스', price: 58000, brand: '브랜드B' },
  { id: 3, name: '롱 코트', price: 128000, brand: '브랜드C' },
  { id: 4, name: '스웨터', price: 45900, brand: '브랜드D' },
];

export const trendingItems = [
  { id: 1, name: '베이직 롱 코트', desc: '클래식한 디자인', price: 128000 },
  { id: 2, name: '오버핏 니트', desc: '데일리 룩에 완벽', price: 65000 },
];

export const profileMenuItems = [
  { id: 1, icon: 'shopping-bag', label: '주문/배송 조회', count: '2' },
  { id: 2, icon: 'heart', label: '찜한 상품', count: '24' },
  { id: 3, icon: 'shirt', label: '내 옷장', count: '48' },
  { id: 4, icon: 'sparkles', label: '저장한 코디', count: '12', badge: '3개 공유중' },
  { id: 5, icon: 'calendar', label: '착용 기록', count: '' },
];