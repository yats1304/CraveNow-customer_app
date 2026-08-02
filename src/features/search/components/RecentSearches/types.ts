import { RecentSearch } from "@/types";

export interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchPress: (keyword: string) => void;
  onRemovePress: (keyword: string) => void;
  onClearAllPress: () => void;
}

export interface RecentSearchItemProps {
  search: RecentSearch;
  onPress: (keyword: string) => void;
  onRemovePress: (keyword: string) => void;
}
