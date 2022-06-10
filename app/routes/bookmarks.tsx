import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import {
  requireAuthenticatedAction,
  requireAuthenticatedLoader,
} from "~/features/auth/auth.server";
import { createBookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { bookmarkValidators } from "~/features/bookmarks/bookmark.validators";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";
import { validate } from "~/validation/validate";

export const action: ActionFunction = async ({ request }) => {
  const { intent, formData, access_token } = await requireAuthenticatedAction(request);
  const bookmarkService = createBookmarkService(access_token);

  if (intent === "save") {
    const errors = await validate(formData, bookmarkValidators);
    console.error(errors);
    if (Object.values(errors).some((e) => e)) {
      return {
        errors,
      };
    }

    const bookmark = await bookmarkService.save(Object.fromEntries(formData) as any);

    return redirect(`/bookmarks/${bookmark.id}`);
  }
  throw new Error("Inavlid Intent:" + intent);
};

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
