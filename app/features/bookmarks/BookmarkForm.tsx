import { useNavigate, useTransition } from "@remix-run/react";
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
  const form = useValidatedForm(initial);
  const transition = useTransition();
  const navigate = useNavigate();
  const [image, setImage] = useState(initial?.image || IMAGE_PLACEHOLDER);
  const isProcessing = !!transition.submission;

  return (
    <div className="grid">
      <form.Form method="post" className="g-col-12 g-col-lg-6">
        <fieldset disabled={isProcessing}>
          <input name="id" type="hidden" value={initial?.id}></input>
          <InputField
            error={form.errors.title}
            required
            label="Title"
            {...form.register("title", { ...bookmarkValidators.title })}
          />
          <TextAreaField
            error={form.errors.url}
            label="URL"
            name="url"
            {...form.register("url", { ...bookmarkValidators.url })}
            required
          />
          <TextAreaField
            label="Description"
            name="description"
            rows={4}
            {...form.register("description", { ...bookmarkValidators.description })}
          />
          <TextAreaField
            rows={2}
            onBlur={(e) => {
              setImage(e.target.value);
            }}
            label="Image"
            name="image"
            {...form.register("image", { ...bookmarkValidators.image })}
          />
          <div className="d-flex justify-content-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-link btn btn-lg text-dark text-decoration-none"
            >
              Cancel
            </button>
            <Button scale="lg" disabled={isProcessing}>
              {isProcessing ? "Saving..." : "Save"}
            </Button>
          </div>
        </fieldset>
      </form.Form>
      <div className="g-col-12 g-col-lg-6">
        <img src={image} className="w-100 rounded" alt="Bookmark preview" />
      </div>
    </div>
  );
}
