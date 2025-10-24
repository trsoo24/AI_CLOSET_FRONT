import { Cloud, MapPin, Shirt, Sparkles, TrendingUp } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/common/Header';
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from '../constants';
import { aiRecommendations, personalizedItems, trendingItems } from '../data/mockData';
import { wardrobeService } from '../services/wardrobeService';
import { weatherService } from '../services/weatherService';
import { getTempColor, getWeatherIcon, needsUmbrella } from '../utils/weatherIcons';

export const HomeScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    // 날씨 데이터 불러오기
    try {
      const weatherResponse = await weatherService.getCurrentWeather(37.5665, 126.9780);
      if (weatherResponse.success) {
        const rawData = weatherResponse.data;

        // API 응답을 화면에 필요한 형식으로 변환
        const transformedData = {
          location: rawData.location,
          currentTemp: rawData.currentTemp,
          minTemp: rawData.minTemp,
          maxTemp: rawData.maxTemp,
          condition: rawData.skyCondition,
          comment: rawData.clothingAdvice,
          rainProbability: rawData.rainProbability,
          needsUmbrella: needsUmbrella(rawData.rainProbability),
          // hourlyForecasts를 hourly 형식으로 변환
          hourly: rawData.hourlyForecasts?.map(forecast => ({
            time: forecast.time,
            temp: forecast.temperature,
            icon: getWeatherIcon(forecast.skyCondition, forecast.time),
            rainProb: forecast.rainProbability,
          })) || [],
        };

        setWeatherData(transformedData);
      } else {
        console.error('날씨 데이터 로드 실패:', weatherResponse.error);
      }
    } catch (error) {
      console.error('날씨 API 호출 오류:', error);
    }

    // 옷장 데이터 불러오기 (선택사항, 인증 필요)
    try {
      const wardrobeResponse = await wardrobeService.getItems({ page: 0, size: 10 });
      if (wardrobeResponse && wardrobeResponse.success) {
        setMyItems(wardrobeResponse.data.content || []);
      } else if (wardrobeResponse && wardrobeResponse.status === 401) {
        // 로그인이 필요한 경우 조용히 처리 (홈페이지는 로그인 없이 접근 가능)
        console.log('옷장 데이터는 로그인 후 이용 가능합니다.');
      } else {
        console.error('옷장 데이터 로드 실패:', wardrobeResponse?.error);
      }
    } catch (error) {
      // 401 에러는 정상적인 경우이므로 조용히 처리
      if (error.status === 401 || error.code === 'UNAUTHORIZED') {
        console.log('옷장 데이터는 로그인 후 이용 가능합니다.');
      } else {
        console.error('옷장 API 호출 오류:', error);
      }
    }

    setLoading(false);
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10 }}>데이터를 불러오는 중...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Header 
        title="CLOSETLY" 
        showExplore={true}
        onExplorePress={() => console.log('탐색')}
      />
      <ScrollView style={styles.scrollView}>
        {/* 날씨 카드 */}
        <View style={styles.weatherCard}>
          <View style={styles.locationRow}>
            <MapPin size={16} color={COLORS.secondary} />
            <Text style={styles.location}>
              {weatherData?.location || '서울특별시 강남구'}
            </Text>
          </View>
          <View style={styles.weatherTop}>
            <View style={styles.tempContainer}>
              <Cloud size={32} color={COLORS.secondary} />
              <Text style={[styles.temp, { color: getTempColor(weatherData?.currentTemp || '24°C') }]}>
                {weatherData?.currentTemp || '24°C'}
              </Text>
            </View>
            <Text style={styles.condition}>
              {weatherData?.condition || '맑음'}
            </Text>
          </View>
          <Text style={styles.comment}>
            {weatherData?.comment || '가벼운 니트 한 장이면 완벽한 날씨예요!'}
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
            {(weatherData?.hourlyForecasts || [
              { time: '09:00', temp: '18°', icon: '☀️' },
              { time: '12:00', temp: '23°', icon: '☀️' },
              { time: '15:00', temp: '24°', icon: '🌤️' },
              { time: '18:00', temp: '20°', icon: '🌥️' },
              { time: '21:00', temp: '17°', icon: '🌙' },
            ]).map((hour, i) => (
              <View key={i} style={styles.hourlyItem}>
                <Text style={styles.hourlyTime}>{hour.time}</Text>
                <Text style={styles.hourlyIcon}>{hour.icon}</Text>
                <Text style={[styles.hourlyTemp, { color: getTempColor(hour.temp) }]}>
                  {hour.temp}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* AI 추천 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Sparkles size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>AI 코디 추천</Text>
          </View>
          <View style={styles.twoColumns}>
            {aiRecommendations.map((item) => (
              <View key={item.id} style={styles.column}>
                <View style={styles.aiCard}>
                  <View style={styles.aiImage}>
                    <Shirt size={64} color={COLORS.gray300} />
                  </View>
                  <View style={styles.aiInfo}>
                    <Text style={styles.aiTitle}>{item.title}</Text>
                    <Text style={styles.aiSubtitle}>내 옷장 아이템 {item.items}개</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 개인 추천 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>유경님을 위한 추천</Text>
          <View style={styles.twoColumns}>
            {personalizedItems.map((item) => (
              <View key={item.id} style={styles.column}>
                <View style={styles.productCard}>
                  <View style={styles.productImage}>
                    <Shirt size={48} color={COLORS.gray300} />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.brand}>{item.brand}</Text>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 트렌딩 */}
        <View style={[styles.section, { marginBottom: 24 }]}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>지금 인기있는</Text>
          </View>
          {trendingItems.map((item) => (
            <View key={item.id} style={styles.trendingItem}>
              <View style={styles.trendingImage}>
                <Shirt size={40} color={COLORS.gray300} />
              </View>
              <View style={styles.trendingInfo}>
                <Text style={styles.trendingName}>{item.name}</Text>
                <Text style={styles.trendingDesc}>{item.desc}</Text>
                <Text style={styles.trendingPrice}>{item.price.toLocaleString()}원</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollView: {
    flex: 1,
  },
  weatherCard: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    backgroundColor: COLORS.gray900,
    borderRadius: BORDER_RADIUS.lg,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  location: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.secondary,
    opacity: 0.8,
  },
  weatherTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  condition: {
    fontSize: FONT_SIZE.md,
    color: COLORS.secondary,
    opacity: 0.9,
  },
  comment: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.secondary,
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  hourlyScroll: {
    marginTop: SPACING.sm,
  },
  hourlyItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    marginRight: SPACING.sm,
    minWidth: 60,
  },
  hourlyTime: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.secondary,
    opacity: 0.8,
    marginBottom: SPACING.xs,
  },
  hourlyIcon: {
    fontSize: 20,
    marginBottom: SPACING.xs,
  },
  hourlyTemp: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
  },
  twoColumns: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  column: {
    flex: 1,
  },
  aiCard: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  aiImage: {
    aspectRatio: 3 / 4,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInfo: {
    padding: SPACING.md,
  },
  aiTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  aiSubtitle: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  productCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  productImage: {
    aspectRatio: 3 / 4,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: SPACING.md,
  },
  brand: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginBottom: SPACING.xs,
  },
  productName: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
  },
  trendingItem: {
    flexDirection: 'row',
    gap: SPACING.md,
    backgroundColor: COLORS.secondary,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.gray100,
    marginBottom: SPACING.md,
  },
  trendingImage: {
    width: 96,
    height: 96,
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  trendingName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  trendingDesc: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginBottom: SPACING.sm,
  },
  trendingPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
  },
});