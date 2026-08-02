import Section from "@/components/Section";
import {
  BannerSkeleton,
  CategorySkeleton,
  RestaurantCardSkeleton,
} from "@/components/Skeleton";
import { Theme } from "@/components/theme";
import { TAB_BAR_CLEARANCE } from "@/constants/tab";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BannerCarousel } from "../components/BannerCarousel";
import CategoryList from "../components/CategoryList";
import CuisineList from "../components/CuisineList";
import HomeHeader from "../components/HomeHeader";
import PopularDishSection from "../components/PopularDishSection";
import RestaurantSection from "../components/RestaurantSection";
import SearchBar from "../components/SearchBar";
import { useHome } from "../hooks/useHome";

export default function HomeScreen() {
  const { user } = useAuth();
  const { data, isLoading, refetch, isRefetching } = useHome();

  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  const handleAddressPress = useCallback(() => {
    router.push("/(protected)" as any);
  }, []);

  const handleNotificationPress = useCallback(() => {
    router.push("/(protected)" as any);
  }, []);

  const handleSearchPress = useCallback(() => {
    router.navigate("/(protected)/search");
  }, []);

  const handleSeeAllRestaurants = useCallback(() => {
    router.push("/(protected)" as any);
  }, []);

  if (isLoading || !data) {
    return (
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        <HomeHeader
          userName={user?.name || "Foodie"}
          address="Detecting location..."
          onAddressPress={handleAddressPress}
          onNotificationPress={handleNotificationPress}
        />
        <SearchBar onPress={handleSearchPress} />
        <BannerSkeleton />
        <CategorySkeleton />
        <View className="px-4 mt-2">
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: TAB_BAR_CLEARANCE }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={theme.brandPrimary}
            colors={[theme.brandPrimary]}
          />
        }
      >
        <HomeHeader
          userName={user?.name || "Foodie"}
          address="Current Location"
          onAddressPress={handleAddressPress}
          onNotificationPress={handleNotificationPress}
        />

        <SearchBar onPress={handleSearchPress} />

        {/* Banners HeaderSection */}
        {data.banners?.data?.length ? (
          <Section title={data.banners.title || "Offers"}>
            <BannerCarousel banners={data.banners.data} />
          </Section>
        ) : null}

        {/* Cuisines HeaderSection */}
        {data.cuisines?.data?.length ? (
          <Section title={data.cuisines.title || "Popular Cuisines"}>
            <CuisineList cuisines={data.cuisines.data} />
          </Section>
        ) : null}

        {/* Categories HeaderSection */}
        {data.categories?.data?.length ? (
          <Section title={data.categories.title || "Categories"}>
            <CategoryList categories={data.categories.data} />
          </Section>
        ) : null}

        {/* Featured Restaurants HeaderSection */}
        {data.featuredRestaurants?.data?.length ? (
          <Section
            title={data.featuredRestaurants.title || "Featured Restaurants"}
            actionText="See All"
            onActionPress={handleSeeAllRestaurants}
          >
            <RestaurantSection restaurants={data.featuredRestaurants.data} />
          </Section>
        ) : null}

        {/* Nearby Restaurants HeaderSection */}
        {data.nearbyRestaurants?.data?.length ? (
          <Section
            title={data.nearbyRestaurants.title || "Near You"}
            actionText="See All"
            onActionPress={handleSeeAllRestaurants}
          >
            <RestaurantSection restaurants={data.nearbyRestaurants.data} />
          </Section>
        ) : null}

        {/* Featured Menu Items HeaderSection */}
        {data.featuredMenuItems?.data?.length ? (
          <Section
            title={data.featuredMenuItems.title || "Popular Dishes"}
            actionText="See All"
            onActionPress={handleSeeAllRestaurants}
          >
            <PopularDishSection items={data.featuredMenuItems.data} />
          </Section>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
