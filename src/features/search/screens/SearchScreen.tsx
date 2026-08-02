import { router } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import RecentSearches from "../components/RecentSearches";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchEmpty from "../components/SearchEmpty";
import SearchResultsList from "../components/SearchResultsList";

import { useRecentSearches } from "../hooks/useRecentSearches";
import { useSearch } from "../hooks/useSearch";

import { Theme } from "@/components/theme";
import { Restaurant } from "@/types";
import { useColorScheme } from "nativewind";
import SearchSkeleton from "../components/SearchSkeleton";
import { useDebounce } from "../hooks/useDebounce";

const SearchScreen = () => {
  const [query, setQuery] = useState("");

  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  const debouncedQuery = useDebounce(query);

  const {
    recentSearches,
    saveRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useRecentSearches();

  const { data, isLoading, isFetching, refetch } = useSearch({
    page: 1,
    limit: 10,
    search: debouncedQuery,
  });

  const handleBackPress = () => {
    router.back();
  };

  const handleClearSearch = () => {
    setQuery("");
  };

  const handleRecentSearchPress = useCallback(
    (keyword: string) => {
      saveRecentSearch(keyword);
      setQuery(keyword);
    },
    [saveRecentSearch],
  );

  const handleRestaurantPress = useCallback(
    (restaurant: Restaurant) => {
      saveRecentSearch(query);

      router.push({
        pathname: "/restaurant/[id]" as any,
        params: {
          id: restaurant._id,
        },
      });
    },
    [query, saveRecentSearch],
  );

  const restaurants = data?.data ?? [];

  const isDebouncePending = query.trim() !== debouncedQuery.trim();
  const showLoading = isLoading || isDebouncePending;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onBackPress={handleBackPress}
        onClearPress={handleClearSearch}
      />

      {query.trim().length === 0 ? (
        <RecentSearches
          searches={recentSearches}
          onSearchPress={handleRecentSearchPress}
          onRemovePress={removeRecentSearch}
          onClearAllPress={clearRecentSearches}
        />
      ) : showLoading ? (
        <SearchSkeleton />
      ) : restaurants.length > 0 ? (
        <SearchResultsList
          restaurants={restaurants}
          onRestaurantPress={handleRestaurantPress}
          refreshing={isFetching}
          onRefresh={refetch}
        />
      ) : (
        <SearchEmpty />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
