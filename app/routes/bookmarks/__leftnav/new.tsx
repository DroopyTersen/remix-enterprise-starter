import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { bookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { bookmarkValidators } from "~/features/bookmarks/bookmark.validators";
import { BookmarkForm } from "~/features/bookmarks/BookmarkForm";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";
import { validate } from "~/validation/validate";

export const meta: MetaFunction = () => ({
  title: "Remix Enterprise Starter - Add Bookmark",
  description: "Let's add a new bookmark to the Remix Enterprise Starter App!",
});

export default function NewBookmarkRoute() {
  return (
    <>
      <h1 className="mb-5">New Bookmark</h1>
      <BookmarkForm />
    </>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const [errors, hasErrors] = await validate(formData, bookmarkValidators);
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
