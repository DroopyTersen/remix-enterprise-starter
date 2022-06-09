import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { Bookmark } from "~/features/bookmarks/bookmark.types";
import { BookmarkCard } from "~/features/bookmarks/BookmarkCard";
import Card from "~/ui-toolkit/components/Card/Card";
import { Input } from "~/ui-toolkit/components/forms";
import { Grid } from "~/ui-toolkit/components/Grid/Grid";
import { useFilteredItemsByText } from "~/ui-toolkit/hooks/useFilteredItems";
import { useRouteData } from "~/ui-toolkit/hooks/useRouteData";

const FILTER_KEYS = ["title", "url", "description"];

export const meta: MetaFunction = () => ({
  title: "Remix Enterprise Starter - Bookmarks",
  description: "List of all of the bookmarks in the Remix Enterprise Starter App!",
});

export default function BookmarksIndexRoute() {
  const bookmarks = (useRouteData((r) => r?.data?.bookmarks) || []) as Bookmark[];
  const { filterText, setFilterText, filteredItems } = useFilteredItemsByText(
    bookmarks,
    FILTER_KEYS
  );

  if (!bookmarks.length) {
    return (
      <Card title="No bookmarks" className="text-center bg-light mx-4 my-5">
        <div className="my-3">No bookmarks have been created yet!</div>
        <Link className="btn btn-primary" to="new">
          Create the first bookmark
        </Link>
      </Card>
    );
  }

  return (
    <div className="p-4 py-5">
      <div className="d-flex justify-content-between align-items-center gap-5 mb-3">
        <div className="d-flex align-items-center gap-4">
          <h1 className="m-0">Bookmarks</h1>
          <Link to="new" className="btn btn-primary">
            New
          </Link>
        </div>
        <div style={{ flexGrow: "1", maxWidth: "500px" }}>
          <Input
            placeholder="Search bookmarks..."
            type="search"
            className="rounded-pill"
            value={filterText}
            onChange={(e) => setFilterText(e.currentTarget.value)}
          />
        </div>
      </div>
      <Grid width="400px" gap="2rem">
        {filteredItems.map((bookmark) => (
          <BookmarkCard bookmark={bookmark} key={bookmark.id} />
        ))}
      </Grid>
    </div>
  );
}
