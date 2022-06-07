import type { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { bookmarkService } from "~/features/bookmarks/bookmark.service.server";
import { ErrorView } from "~/features/error/ErrorView";

interface LoaderData {
  bookmarks: any[];
}

export const loader: LoaderFunction = async () => {
  const bookmarks = await bookmarkService.getAll();
  return { bookmarks };
};

export default function BookmarksLayout() {
  let data = useLoaderData() as LoaderData;

  return (
    <div className="grid">
      <div className="g-col-4">
        <Link to="new">New Bookmark</Link>
        <ul>
          {data.bookmarks.map((b) => (
            <li key={b.id}>
              <Link to={b.id}>{b.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="g-col-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export const ErrorBoundary = ({ error }) => {
  return <ErrorView error={error} />;
};
