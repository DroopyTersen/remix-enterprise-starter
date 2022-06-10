import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireAuthenticatedAction } from "~/features/auth/auth.server";
import { createBookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { bookmarkValidators } from "~/features/bookmarks/bookmark.validators";
import { BookmarkForm } from "~/features/bookmarks/BookmarkForm";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";
import { validate } from "~/validation/validate";

export default function NewBookmarkRoute() {
  return (
    <>
      <h1 className="mb-5">New Bookmark</h1>
      <BookmarkForm />
    </>
  );
}

export const action: ActionFunction = async ({ request }) => {
  let { formData, access_token } = await requireAuthenticatedAction(request);
  let bookmarkService = createBookmarkService(access_token);

  let [errors, hasErrors] = await validate(formData, bookmarkValidators);
  if (hasErrors) {
    return {
      errors,
    };
  }

  const bookmark = await bookmarkService.save(Object.fromEntries(formData) as any);
  return redirect(`/bookmarks/${bookmark.id}`);
};

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
