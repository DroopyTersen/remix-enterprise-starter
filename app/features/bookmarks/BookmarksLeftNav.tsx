import { Link, useParams } from "@remix-run/react";
import type { Bookmark } from "./bookmark.types";

interface BookmarksLeftNavProps {
  bookmarks: Bookmark[];
}

export function BookmarksLeftNav({ bookmarks }: BookmarksLeftNavProps) {
  const { bookmarkId } = useParams();
  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-5 pb-3 flex-wrap">
        <h2 className="m-0">Bookmarks</h2>
        <Link to="new" className="btn btn-primary">
          New
        </Link>
      </div>
      <div className="d-flex flex-column">
        {bookmarks.map((b) => (
          <Link
            key={b.id}
            prefetch="intent"
            to={b.id}
            className="w-100 px-5 py-4 text-decoration-none"
            style={{
              borderRight: `4px solid ${b.id === bookmarkId ? "var(--bs-primary)" : "transparent"}`,
            }}
          >
            {b.title || "Missing Title"}
          </Link>
        ))}
      </div>
    </>
  );
}
