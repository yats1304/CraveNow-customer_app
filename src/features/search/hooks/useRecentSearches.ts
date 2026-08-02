import { useCallback, useEffect, useState } from "react";

import { searchStorage } from "@/services/storage";
import { RecentSearch } from "@/types";

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const loadRecentSearches = useCallback(() => {
    setRecentSearches(searchStorage.getRecentSearches());
  }, []);

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  const saveRecentSearch = useCallback(
    (keyword: string) => {
      searchStorage.saveRecentSearch(keyword);

      loadRecentSearches();
    },
    [loadRecentSearches],
  );

  const removeRecentSearch = useCallback(
    (keyword: string) => {
      searchStorage.removeRecentSearch(keyword);

      loadRecentSearches();
    },
    [loadRecentSearches],
  );

  const clearRecentSearches = useCallback(() => {
    searchStorage.clearRecentSearches();

    setRecentSearches([]);
  }, []);

  return {
    recentSearches,
    saveRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    reloadRecentSearches: loadRecentSearches,
  };
};
