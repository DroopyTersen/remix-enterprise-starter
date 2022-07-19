import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remixUtils.server";
import { createBookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { filterBookmarks } from "~/features/bookmarks/bookmark.utils";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";

export const loader: LoaderFunction = async ({ request }) => {
  let { access_token } = await requireAuthenticatedLoader(request);
  let url = new URL(request.url);
  let bookmarkService = createBookmarkService(access_token);
  let filterText = url.searchParams.get("filter") || "";
  let bookmarks = await bookmarkService.getAll();
  if (filterText) {
    bookmarks = filterBookmarks(bookmarks, filterText);
  }
  return { bookmarks, filter: filterText };
};

export default function BookmarksLayout() {
  return <Outlet></Outlet>;
}

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
