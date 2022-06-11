import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { requireAuthenticatedLoader } from "~/features/auth/auth.remixUtils.server";
import { createBookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";

export const loader: LoaderFunction = async ({ request }) => {
  let { access_token } = await requireAuthenticatedLoader(request);
  let bookmarkService = createBookmarkService(access_token);
  const bookmarks = await bookmarkService.getAll();
  return { bookmarks };
};

export default function BookmarksLayout() {
  return <Outlet></Outlet>;
}

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
