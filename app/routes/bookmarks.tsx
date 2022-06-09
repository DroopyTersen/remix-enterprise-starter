import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { bookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { bookmarkValidators } from "~/features/bookmarks/bookmark.validators";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";
import { validate } from "~/validation/validate";

interface LoaderData {
  bookmarks: any[];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let intent = formData.get("intent");
  console.log("🚀 | constaction:ActionFunction= | intent", intent);

  if (intent === "save") {
    let errors = await validate(formData, bookmarkValidators);
    console.log(errors);
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

export const loader: LoaderFunction = async () => {
  const bookmarks = await bookmarkService.getAll();
  return { bookmarks };
};

export default function BookmarksLayout() {
  return <Outlet></Outlet>;
}

export const ErrorBoundary = AppErrorBoundary;
