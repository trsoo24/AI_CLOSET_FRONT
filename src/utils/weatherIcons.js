export const getWeatherIcon = (skyCondition, time) => {
  const hour = parseInt(time?.split(':')[0] || 12);
  const isNight = hour >= 18 || hour < 6;

  const condition = skyCondition?.toLowerCase() || '';

  // 비 관련
  if (condition.includes('비') || condition.includes('rain')) {
    return '🌧️';
  }

  // 맑음 관련
  if (condition.includes('화창') || condition.includes('맑음') || condition.includes('clear')) {
    return isNight ? '🌙' : '☀️';
  }

  // 구름 관련
  if (condition.includes('대체로 맑음') || condition.includes('partly')) {
    return isNight ? '🌙' : '🌤️';
  }

  if (condition.includes('흐린') || condition.includes('구름') || condition.includes('cloudy')) {
    return '☁️';
  }

  // 눈 관련
  if (condition.includes('눈') || condition.includes('snow')) {
    return '❄️';
  }

  // 천둥/번개
  if (condition.includes('천둥') || condition.includes('번개') || condition.includes('thunder')) {
    return '⛈️';
  }

  // 안개
  if (condition.includes('안개') || condition.includes('fog')) {
    return '🌫️';
  }

  // 기본값
  return isNight ? '🌙' : '🌤️';
};

// 강수 확률에 따라 우산 추천
export const needsUmbrella = (rainProbability) => {
  const prob = parseInt(rainProbability);
  return prob >= 50;
};

// 온도에 따른 색상
export const getTempColor = (temp) => {
  const temperature = parseFloat(temp);

  if (temperature >= 30) return '#FF6B6B'; // 매우 더움 - 빨강
  if (temperature >= 25) return '#FFA94D'; // 더움 - 주황
  if (temperature >= 20) return '#FFD43B'; // 따뜻 - 노랑
  if (temperature >= 15) return '#74C0FC'; // 시원 - 연파랑
  if (temperature >= 10) return '#4DABF7'; // 쌀쌀 - 파랑
  return '#339AF0'; // 추움 - 진파랑
};
