import { getConfigEntry } from "~/common/config.server";
import { createApiRequest } from "~/common/request.server";
import type { Bookmark } from "./bookmark.types";

const apiRequest = createApiRequest(getConfigEntry("API_URL"));

const getAll = async (): Promise<Bookmark[]> => {
  return await apiRequest.get("/bookmarks");
};

const get = async (id: string): Promise<Bookmark> => {
  return await apiRequest.get(`/bookmarks/${id}`);
};

const remove = async (id: string): Promise<any> => {
  return await apiRequest.remove(`/bookmarks/${id}`);
};

const save = async (bookmark: Bookmark): Promise<Bookmark> => {
  if (!bookmark.id) {
    return await apiRequest.post("/bookmarks", JSON.stringify(bookmark));
  } else {
    return await apiRequest.put(`/bookmarks/${bookmark.id}`, JSON.stringify(bookmark));
  }
};

export const bookmarkService = {
  getAll,
  get,
  save,
  remove,
};
