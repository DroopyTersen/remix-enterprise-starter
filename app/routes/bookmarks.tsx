import type { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

interface LoaderData {
  bookmarks: any[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return {
    bookmarks: [
      { id: "1", title: "Bookmark 1" },
      { id: "2", title: "Bookmark 2" },
    ],
  } as LoaderData;
};

export default function BookmarksLayout() {
  let data = useLoaderData() as LoaderData;

  return (
    <div className="grid">
      <div className="g-col-4">
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
