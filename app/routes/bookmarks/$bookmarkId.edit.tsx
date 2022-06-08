import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { bookmarkService } from "~/features/bookmarks/bookmark.service.server";
import type { Bookmark } from "~/features/bookmarks/bookmark.types";
import { BookmarkForm } from "~/features/bookmarks/BookmarkForm";
import { AppErrorBoundary } from "~/features/error/AppErrorBoundary";

interface LoaderData {
  bookmark: Bookmark;
}

export const loader: LoaderFunction = async ({ params }) => {
  const bookmark = await bookmarkService.get(params.bookmarkId);

  return {
    bookmark,
  } as LoaderData;
};

export default function EditBookmarkRoute() {
  const data = useLoaderData() as LoaderData;
  return <BookmarkForm initial={data.bookmark} />;
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  await bookmarkService.save(Object.fromEntries(formData) as any);

  return redirect(`/bookmarks/${params.bookmarkId}`);
};

export const ErrorBoundary = AppErrorBoundary;
