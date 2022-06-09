import { Link } from "@remix-run/react";
import { Bookmark } from "~/features/bookmarks/bookmark.types";
import { BookmarkCard } from "~/features/bookmarks/BookmarkCard";
import Card from "~/ui-toolkit/components/Card/Card";
import { Grid } from "~/ui-toolkit/components/Grid/Grid";
import { useRouteData } from "~/ui-toolkit/hooks/useRouteData";

export default function BookmarksIndexRoute() {
  let bookmarks = (useRouteData((r) => r?.data?.bookmarks) || []) as Bookmark[];
  if (!bookmarks.length) {
    return (
      <Card title="No bookmarks" className="text-center bg-light">
        <div className="my-3">No bookmarks have been created yet!</div>
        <Link className="btn btn-primary" to="new">
          Create the first bookmark
        </Link>
      </Card>
    );
  }

  return (
    <Grid width="400px">
      {bookmarks.map((bookmark) => (
        <BookmarkCard bookmark={bookmark} key={bookmark.id} />
      ))}
    </Grid>
  );
}
