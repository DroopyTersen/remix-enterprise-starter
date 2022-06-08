import { FormValidators } from "~/validation/validation.types";
import { BookmarkFormValues } from "./bookmark.types";

export const bookmarkValidators: FormValidators<BookmarkFormValues> = {
  title: {
    required: true,
    maxLength: { value: 100, message: "Title must be less than 100 characters" },
  },
  url: {
    required: "Url is required",
    minLength: 7,
  },
};
