import { MAX_RECENT_SEARCHES, STORAGE_KEYS } from "@/constants";
import { RecentSearch } from "@/types";
import { logger } from "@/utils";
import { storage } from "./storage";

export const searchStorage = {
  getRecentSearches(): RecentSearch[] {
    try {
      const value = storage.getString(STORAGE_KEYS.RECENT_SEARCHES_KEY);

      const searches: RecentSearch[] = value ? JSON.parse(value) : [];

      return searches.sort((a, b) => b.searchedAt - a.searchedAt);
    } catch (error) {
      logger.error(
        "Search-Storage",
        "Failed to parse recent searches JSON from storage",
      );

      return [];
    }
  },

  saveRecentSearch(search: string): void {
    const keyword = search.trim();

    if (!keyword) {
      logger.warn("Search-Storage", "No keyword provided");
      return;
    }

    const searches = this.getRecentSearches();

    const updatedSearches: RecentSearch[] = [
      {
        keyword,
        searchedAt: Date.now(),
      },
      ...searches.filter(
        (item) => item.keyword.toLowerCase() !== keyword.toLowerCase(),
      ),
    ].slice(0, MAX_RECENT_SEARCHES);

    storage.set(
      STORAGE_KEYS.RECENT_SEARCHES_KEY,
      JSON.stringify(updatedSearches),
    );
    console.log("saved:", updatedSearches);
  },

  removeRecentSearch(search: string): void {
    const updatedSearches = this.getRecentSearches().filter(
      (item) => item.keyword.toLowerCase() !== search.toLowerCase(),
    );

    storage.set(
      STORAGE_KEYS.RECENT_SEARCHES_KEY,
      JSON.stringify(updatedSearches),
    );
  },

  clearRecentSearches(): void {
    storage.delete(STORAGE_KEYS.RECENT_SEARCHES_KEY);
  },
};
