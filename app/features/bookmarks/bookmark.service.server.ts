import { getConfigEntry } from "~/common/config.server";
import { jsonRequest } from "~/ui-toolkit/utils/request.utils";
import type { Bookmark } from "./bookmark.types";

const baseUrl = getConfigEntry("API_URL");
const getFullUrl = (path: string) => `${baseUrl}/${path}`;

const apiRoutes = {
  getBookmark: (id: string) => {
    return `/bookmarks/${id}`;
  },
  deleteBookmark: (id: string) => {
    return `/bookmarks/${id}`;
  },
  getBookmarks: () => {
    return `/bookmarks`;
  },
  createBookmark: () => {
    return `/bookmarks`;
  },
  updateBookmark: (id: string) => {
    return `/bookmarks/${id}`;
  },
};

const getAll = async (): Promise<Bookmark[]> => {
  const bookmarks = await jsonRequest(getFullUrl(apiRoutes.getBookmarks()));

  return bookmarks;
};

const get = async (id: string): Promise<Bookmark> => {
  const bookmark = await jsonRequest(getFullUrl(apiRoutes.getBookmark(id)));

  return bookmark;
};

const remove = async (id: string) => {
  await jsonRequest(getFullUrl(apiRoutes.deleteBookmark(id)), {
    method: "DELETE",
  });
};

const save = async (bookmark: Bookmark): Promise<Bookmark> => {
  const isNew = bookmark.id ? false : true;
  const path = isNew
    ? apiRoutes.createBookmark()
    : apiRoutes.updateBookmark(bookmark.id);
  const method = isNew ? "POST" : "PUT";

  const updatedBookmark = await jsonRequest(getFullUrl(path), {
    method,
    body: JSON.stringify(bookmark),
  });

  return updatedBookmark;
};

export const bookmarkService = {
  getAll,
  get,
  save,
  remove,
};
