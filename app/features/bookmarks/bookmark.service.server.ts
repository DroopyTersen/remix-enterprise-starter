import { getConfigEntry } from "~/common/config.server";
import { createApiRequest } from "~/common/request.server";
import type { Bookmark } from "./bookmark.types";

const apiRequest = createApiRequest(getConfigEntry("API_URL"));

const getAll = async () => {
  let result = await apiRequest.get<Bookmark[]>("/bookmarks");
  return result?.data;
};

const get = async (id: string) => {
  let result = await apiRequest.get<Bookmark>(`/bookmarks/${id}`);

  return result.data;
};

const remove = async (id: string) => {
  return apiRequest.remove(`/bookmarks/${id}`);
};

const save = async (bookmark: Bookmark) => {
  let result = bookmark.id
    ? await apiRequest.put<Bookmark>(`/bookmarks/${bookmark.id}`, bookmark)
    : await apiRequest.post<Bookmark>("/bookmarks", bookmark);

  return result?.data;
};

export const bookmarkService = {
  getAll,
  get,
  save,
  remove,
};
