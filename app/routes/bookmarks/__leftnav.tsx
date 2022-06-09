import { Outlet, useMatches } from "@remix-run/react";
import { Bookmark } from "~/features/bookmarks/bookmark.types";
import { BookmarksLeftNav } from "~/features/bookmarks/BookmarksLeftNav";
import { useRouteData } from "~/ui-toolkit/hooks/useRouteData";

export default function BookmarksLeftNavLayout() {
  let matches = useMatches();
  console.log(matches);
  let bookmarks = (useRouteData((r) => r?.data?.bookmarks) || []) as Bookmark[];
  return (
    <div className="d-grid h-100" style={{ gridTemplateColumns: "minmax(200px, 400px) 1fr" }}>
      <div className="border-end" style={{ overflowY: "auto" }}>
        <BookmarksLeftNav bookmarks={bookmarks} />
      </div>
      <div className="p-5" style={{ overflowY: "auto" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}