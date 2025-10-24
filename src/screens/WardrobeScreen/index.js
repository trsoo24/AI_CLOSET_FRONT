import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SPACING } from '../../constants';
import { CategoryTabs } from './components/CategoryTabs';
import { EmptyWardrobe } from './components/EmptyWardrobe';
import { WardrobeGrid } from './components/WardrobeGrid';
import { WardrobeHeader } from './components/WardrobeHeader';
import { WardrobeStats } from './components/WardrobeStats';
import { useWardrobe } from './hooks/useWardrobe';

export const WardrobeScreen = () => {
  const {
    items,
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
  } = useWardrobe();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await handleRefresh();
    setRefreshing(false);
  }, [handleRefresh]);

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <WardrobeHeader
          onAddPress={handleAddPress}
          onSearchPress={handleSearchPress}
          onNotificationPress={handleNotificationPress}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>옷장을 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={styles.container}>
        <WardrobeHeader
          onAddPress={handleAddPress}
          onSearchPress={handleSearchPress}
          onNotificationPress={handleNotificationPress}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorHint}>아래로 당겨서 다시 시도해보세요</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WardrobeHeader
        onAddPress={handleAddPress}
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />

      <CategoryTabs
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategorySelect}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {items.length > 0 ? (
          <>
            <WardrobeStats
              totalItems={statistics.totalItems || items.length}
              monthlyWearCount={statistics.monthlyWearCount || 0}
            />
            <WardrobeGrid items={items} onItemPress={handleItemPress} />
          </>
        ) : (
          <EmptyWardrobe onAddPress={handleAddPress} />
        )}
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: SPACING.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.gray500,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl * 2,
  },
  errorText: {
    color: COLORS.error || COLORS.primary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  errorHint: {
    color: COLORS.gray400,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default WardrobeScreen;