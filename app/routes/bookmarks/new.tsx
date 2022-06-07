import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { bookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { BookmarkForm } from "~/features/bookmarks/BookmarkForm";
import { ErrorView } from "~/features/error/ErrorView";

export default function NewBookmarkRoute() {
  return <BookmarkForm />;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const bookmark = await bookmarkService.save(
    Object.fromEntries(formData) as any
  );

  return redirect(`/bookmarks/${bookmark.id}`);
};

export const ErrorBoundary = ({ error }) => {
  return <ErrorView error={error} />;
};
