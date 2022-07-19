import { Link, useTransition } from "@remix-run/react";
import { FormButton } from "~/ui-toolkit/components/Button/FormButton";
import Card from "~/ui-toolkit/components/Card/Card";
import type { Bookmark } from "./bookmark.types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const transition = useTransition();
  const isProcessing = !!transition.submission;

  return (
    <Card title={bookmark.title} url={bookmark.url} image={bookmark?.image}>
      <p>{bookmark.description}</p>
      <div className="d-flex justify-content-center gap-2">
        <FormButton
          action={`/bookmarks/${bookmark.id}`}
          name="intent"
          value="delete"
          color="danger"
          style={{ width: "100px" }}
          disabled={isProcessing}
        >
          {isProcessing ? "Deleting..." : "Delete"}
        </FormButton>
        <Link
          className="btn btn-secondary"
          style={{ width: "100px" }}
          to={`/bookmarks/${bookmark.id}/edit`}
        >
          Edit
        </Link>
      </div>
    </Card>
  );
}
