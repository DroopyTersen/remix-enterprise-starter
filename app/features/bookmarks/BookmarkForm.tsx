import { Button } from "~/ui-toolkit/components/Button/Button";
import { InputField } from "~/ui-toolkit/components/forms/InputField";
import { TextAreaField } from "~/ui-toolkit/components/forms/TextAreaField";
import type { Bookmark } from "./bookmark.types";

interface BookmarkFormProps {
  initial?: Bookmark;
}

export function BookmarkForm({ initial }: BookmarkFormProps) {
  return (
    <form method="post" style={{ maxWidth: "500px" }}>
      <fieldset>
        <input name="id" type="hidden" value={initial?.id}></input>
        <InputField label="Title" name="title" required defaultValue={initial?.title || ""} />
        <InputField label="URL" name="url" required defaultValue={initial?.url || ""} />
        <TextAreaField
          label="Description"
          name="description"
          defaultValue={initial?.description || ""}
        />
        <InputField label="Image" name="image" defaultValue={initial?.image || ""} />
        <Button>Submit</Button>
      </fieldset>
    </form>
  );
}
