import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
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
  let data = useLoaderData() as LoaderData;

  return (
    <div className="d-grid h-100" style={{ gridTemplateColumns: "minmax(200px, 400px) 1fr" }}>
      <div className="border-end">
        <div className="d-flex justify-content-between align-items-center p-5 pb-3 flex-wrap">
          <h2 className="m-0">Bookmarks</h2>
          <Link to="new" className="btn btn-primary">
            New
          </Link>
        </div>
        <div className="d-flex flex-column">
          {data.bookmarks.map((b) => (
            <Link key={b.id} prefetch="intent" to={b.id} className="w-100 px-5 py-4">
              {b.title || "Missing Title"}
            </Link>
          ))}
        </div>
      </div>
      <div className="p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export const ErrorBoundary = AppErrorBoundary;
