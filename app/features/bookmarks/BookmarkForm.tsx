import type { Bookmark } from "./bookmark.types";

interface BookmarkFormProps {
  initial?: Bookmark;
}

export function BookmarkForm({ initial }: BookmarkFormProps) {
  return (
    <form method="post">
      <fieldset>
        <input name="id" type="hidden" value={initial?.id}></input>
        <div>
          <label>
            Title
            <input
              name="title"
              required
              defaultValue={initial?.title || ""}
            ></input>
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              name="url"
              required
              defaultValue={initial?.url || ""}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Description
            <input
              name="description"
              defaultValue={initial?.description || ""}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Image
            <input name="image" defaultValue={initial?.image || ""}></input>
          </label>
        </div>
        <button>Submit</button>
      </fieldset>
    </form>
  );
}
