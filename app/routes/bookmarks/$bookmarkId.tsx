import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { bookmarkService } from "~/features/bookmarks/bookmark.service.server";
import type { Bookmark } from "~/features/bookmarks/bookmark.types";
import { ErrorView } from "~/features/error/ErrorView";

interface LoaderData {
  bookmark: Bookmark;
}

export const loader: LoaderFunction = async ({ params }) => {
  const bookmark = await bookmarkService.get(params.bookmarkId);
  return { bookmark } as LoaderData;
};

export default function BookmarkDetailsRoute() {
  let data = useLoaderData() as LoaderData;

  return (
    <>
      <Link to="edit">Edit</Link>
      <form method="post">
        <input type="hidden" name="intent" value="delete" />
        <button>Delete</button>
      </form>
      <div>
        <label>Id: {data.bookmark.id}</label>
      </div>
      <div>
        <label>Title: {data.bookmark.title}</label>
      </div>
      <div>
        <label>URL: {data.bookmark.url}</label>
      </div>
      <div>
        <label>Description: {data.bookmark.description}</label>
      </div>
      <div>
        <label>Image: {data.bookmark.image}</label>
      </div>
    </>
  );
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await bookmarkService.remove(params.bookmarkId);
  }

  return redirect("/bookmarks");
};

export const ErrorBoundary = ({ error }) => {
  return <ErrorView error={error} />;
};
