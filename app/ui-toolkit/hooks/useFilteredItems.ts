import { matchSorter } from "match-sorter";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "./useDebounce";

export const useFilteredItemsByText = (allItems, properties, initialFilterText = "") => {
  const [filterText, setFilterText] = useState(initialFilterText);

  const debouncedFilterText = useDebouncedValue(filterText, 250);

  const filteredItems = useMemo(() => {
    return filterItems(allItems, debouncedFilterText, properties);
  }, [allItems, debouncedFilterText, properties]);

  return {
    filteredItems,
    setFilterText,
    filterText,
  };
};

export const filterItems = (allItems: any[], filterText: string, filterKeys: string[]) => {
  if (allItems && allItems.length) {
    if (!filterKeys.length || !filterText) {
      return allItems;
    }
    const items = matchSorter(allItems, filterText, {
      keys: filterKeys,
      threshold: matchSorter.rankings.CONTAINS,
    });
    return items;
  }

  return [];
};
