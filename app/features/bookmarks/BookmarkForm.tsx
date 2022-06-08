import { useActionData } from "@remix-run/react";
import { Button } from "~/ui-toolkit/components/Button/Button";
import { InputField, TextAreaField } from "~/ui-toolkit/components/forms";
import { useValidatedForm } from "~/validation/useValidatedForm";
import type { BookmarkFormValues } from "./bookmark.types";
import { bookmarkValidators } from "./bookmark.validators";

interface BookmarkFormProps {
  initial?: BookmarkFormValues;
}

export function BookmarkForm({ initial }: BookmarkFormProps) {
  let form = useValidatedForm(initial);
  let serverErrors = useActionData()?.errors || {};
  let clientErrors = form?.formState?.errors || {};

  return (
    <form.Form method="post" style={{ maxWidth: "500px" }}>
      <fieldset>
        <input name="id" type="hidden" value={initial?.id}></input>
        <InputField
          error={serverErrors.title || clientErrors.title}
          label="Title"
          {...form.register("title", { ...bookmarkValidators.title })}
          defaultValue={initial?.title || ""}
        />
        <InputField
          error={serverErrors.url || clientErrors.url}
          label="URL"
          name="url"
          {...form.register("url", { ...bookmarkValidators.url })}
          required
          defaultValue={initial?.url || ""}
        />

        <TextAreaField
          label="Description"
          name="description"
          defaultValue={initial?.description || ""}
        />
        <InputField label="Image" name="image" defaultValue={initial?.image || ""} />
        <Button>Submit</Button>
      </fieldset>
    </form.Form>
  );
}
