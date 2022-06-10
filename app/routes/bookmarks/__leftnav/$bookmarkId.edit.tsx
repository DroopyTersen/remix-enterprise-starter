import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  requireAuthenticatedAction,
  requireAuthenticatedLoader,
} from "~/features/auth/auth.server";
import { createBookmarkService } from "~/features/bookmarks/bookmark.service.server";
import type { Bookmark } from "~/features/bookmarks/bookmark.types";
import { bookmarkValidators } from "~/features/bookmarks/bookmark.validators";
import { BookmarkForm } from "~/features/bookmarks/BookmarkForm";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";
import { validate } from "~/validation/validate";

interface LoaderData {
  bookmark: Bookmark;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  let { access_token } = await requireAuthenticatedLoader(request);
  let bookmarkService = createBookmarkService(access_token);
  const bookmark = await bookmarkService.get(params.bookmarkId);

  return {
    bookmark,
  } as LoaderData;
};

export default function EditBookmarkRoute() {
  const data = useLoaderData() as LoaderData;
  return (
    <>
      <h1 className="mb-5">Edit Bookmark</h1>
      <BookmarkForm initial={data.bookmark} />
    </>
  );
}

export const action: ActionFunction = async ({ request, params }) => {
  let { formData, access_token } = await requireAuthenticatedAction(request);
  let bookmarkService = createBookmarkService(access_token);
  let [errors, hasErrors] = await validate(formData, bookmarkValidators);
  if (hasErrors) {
    return {
      errors,
    };
  }

  await bookmarkService.save(Object.fromEntries(formData) as any);

  return redirect(`/bookmarks/${params.bookmarkId}`);
};

export const ErrorBoundary = AppErrorBoundary;
export const CatchBoundary = AppErrorBoundary;
