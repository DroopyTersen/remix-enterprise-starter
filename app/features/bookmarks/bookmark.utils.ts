import { filterItems } from "~/ui-toolkit/hooks/useFilteredItems";
import { Bookmark } from "./bookmark.types";

export const FILTER_KEYS = ["title", "url", "description"];

export const filterBookmarks = (bookmarks: Bookmark[], filterText: string) => {
  return filterItems(bookmarks, filterText, FILTER_KEYS);
};
