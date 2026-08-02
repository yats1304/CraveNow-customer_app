import { memo } from "react";
import { FlatList, View } from "react-native";

import SectionHeader from "@/components/SectionHeader";

import RecentSearchItem from "./RecentSearchItem";
import { RecentSearchesProps } from "./types";

const RecentSearches = ({
  searches,
  onSearchPress,
  onRemovePress,
  onClearAllPress,
}: RecentSearchesProps) => {
  if (searches.length === 0) {
    return null;
  }

  return (
    <View className="px-4 pt-4">
      <SectionHeader
        title="Recent Searches"
        actionText="Clear All"
        onActionPress={onClearAllPress}
      />

      <FlatList
        scrollEnabled={false}
        data={searches}
        keyExtractor={(item) => item.keyword}
        renderItem={({ item }) => (
          <RecentSearchItem
            search={item}
            onPress={onSearchPress}
            onRemovePress={onRemovePress}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-neutral-200 dark:bg-neutral-800" />
        )}
      />
    </View>
  );
};

export default memo(RecentSearches);
