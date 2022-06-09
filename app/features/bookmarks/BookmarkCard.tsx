import { Link } from "react-router-dom";
import { FormButton } from "~/ui-toolkit/components/Button/FormButton";
import Card from "~/ui-toolkit/components/Card/Card";
import { Bookmark } from "./bookmark.types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Card title={bookmark.title} url={bookmark.url} image={bookmark?.image}>
      <p>{bookmark.description}</p>
      <div className="d-flex justify-content-center gap-2">
        <FormButton name="intent" value="delete" color="danger" style={{ width: "100px" }}>
          Delete
        </FormButton>
        <Link
          to={`/bookmarks/${bookmark.id}/edit?`}
          className="btn btn-secondary"
          style={{ width: "100px" }}
        >
          Edit
        </Link>
      </div>
    </Card>
  );
}
