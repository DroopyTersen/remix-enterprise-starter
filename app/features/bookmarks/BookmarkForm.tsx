import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/ui-toolkit/components/Button/Button";
import { InputField, TextAreaField } from "~/ui-toolkit/components/forms";
import { useValidatedForm } from "~/validation/useValidatedForm";
import type { BookmarkFormValues } from "./bookmark.types";
import { bookmarkValidators } from "./bookmark.validators";

interface BookmarkFormProps {
  initial?: BookmarkFormValues;
}
const IMAGE_PLACEHOLDER = "https://via.placeholder.com/450?text=Enter+an+image+url";
export function BookmarkForm({ initial }: BookmarkFormProps) {
  let form = useValidatedForm(initial);
  let navigate = useNavigate();
  let [image, setImage] = useState(initial?.image || IMAGE_PLACEHOLDER);
  console.log("🚀 | BookmarkForm | image", image);
  return (
    <div className="grid">
      <form.Form method="post" className="g-col-12 g-col-lg-6">
        <fieldset>
          <input name="id" type="hidden" value={initial?.id}></input>
          <InputField
            error={form.errors.title}
            required
            label="Title"
            {...form.register("title", { ...bookmarkValidators.title })}
            defaultValue={initial?.title || ""}
          />
          <TextAreaField
            error={form.errors.url}
            label="URL"
            name="url"
            {...form.register("url", { ...bookmarkValidators.url })}
            required
            defaultValue={initial?.url || ""}
          />

          <TextAreaField
            label="Description"
            name="description"
            rows={4}
            defaultValue={initial?.description || ""}
          />
          <TextAreaField
            rows={2}
            onBlur={(e) => {
              setImage(e.target.value);
            }}
            label="Image"
            name="image"
            defaultValue={initial?.image || ""}
          />
          <div className="d-flex justify-content-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-link btn btn-lg text-dark text-decoration-none"
            >
              Cancel
            </button>
            <Button scale="lg">Save</Button>
          </div>
        </fieldset>
      </form.Form>
      <div className="g-col-12 g-col-lg-6">
        <img src={image} className="w-100 rounded" alt="Bookmark preview" />
      </div>
    </div>
  );
}
