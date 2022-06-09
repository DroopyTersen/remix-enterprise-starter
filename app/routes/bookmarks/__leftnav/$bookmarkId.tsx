import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { bookmarkService } from "~/features/bookmarks/bookmark.service.server";
import type { Bookmark } from "~/features/bookmarks/bookmark.types";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";
import { FormButton } from "~/ui-toolkit/components/Button/FormButton";
import Card from "~/ui-toolkit/components/Card/Card";

interface LoaderData {
  bookmark: Bookmark;
}

export const loader: LoaderFunction = async ({ params }) => {
  const bookmark = await bookmarkService.get(params.bookmarkId);
  return { bookmark } as LoaderData;
};

export default function BookmarkDetailsRoute() {
  let { bookmark } = useLoaderData() as LoaderData;

  return (
    <Card
      title={bookmark.title}
      url={bookmark.url}
      image={bookmark?.image}
      style={{ maxWidth: "500px" }}
    >
      <p>{bookmark.description}</p>
      <div className="d-flex justify-content-center gap-2">
        <FormButton name="intent" value="delete" color="danger" style={{ width: "100px" }}>
          Delete
        </FormButton>
        <Link to="edit" className="btn btn-secondary" style={{ width: "100px" }}>
          Edit
        </Link>
      </div>
    </Card>
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

export const ErrorBoundary = AppErrorBoundary;
