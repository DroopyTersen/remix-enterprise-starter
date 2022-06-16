import { describe, expect, test } from "vitest";
import { DEFAULT_ERROR_MESSAGES } from "./coreValidators";
import { validate } from "./validate";
import type { FormValidators } from "./validation.types";

interface BookmarkFormValues {
  title: string;
  url: string;
  priority: number;
}
describe("validate", () => {
  describe("required", () => {
    let formData = new FormData();
    let validators: FormValidators<BookmarkFormValues>;
    test("{ required: true } should not return an error if there is a value", async () => {
      formData.set("title", "blah");
      validators = {
        title: { required: true },
      };

      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("{ required: { message, value: true} } should not return an error if there is a value", async () => {
      formData.set("title", "blah");
      validators = {
        title: { required: { message: "Title is required", value: true } },
      };

      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("{ required: true } should use the default error message", async () => {
      formData.set("title", "");
      validators = {
        title: { required: true },
      };

      let errors = await validate(formData, validators);
      expect(errors?.url).toBeUndefined();
      expect(errors?.title?.message).toBe(DEFAULT_ERROR_MESSAGES.required());
    });
    test("{ required: 'message' } should use the custom message", async () => {
      formData.set("title", "");
      let errorMessage = "Title is required!";
      validators = {
        title: { required: errorMessage },
      };

      let errors = await validate(formData, validators);
      expect(errors?.url).toBeUndefined();
      expect(errors?.title?.message).toBe(errorMessage);
    });

    test("{ required: 'message' } should use the custom message", async () => {
      formData.set("title", "");
      let errorMessage = "Title is required!!";
      validators = {
        title: { required: { message: errorMessage, value: true } },
      };

      let errors = await validate(formData, validators);
      expect(errors?.url).toBeUndefined();
      expect(errors?.title?.message).toBe(errorMessage);
    });
  });

  describe("minLength", () => {
    let formData = new FormData();
    let validators: FormValidators<BookmarkFormValues>;
    test("{ minLength: 3 } should error if 2 chars", async () => {
      formData.set("title", "12");
      validators = {
        title: { minLength: 3 },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.title?.message).toBe(DEFAULT_ERROR_MESSAGES.minLength(3));
    });
    test("{ minLength: 3 } should not error if 3 chars", async () => {
      formData.set("title", "123");
      validators = {
        title: { minLength: 3 },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("{ minLength: { message, value: 3 } } should error with custom message if 2 chars", async () => {
      formData.set("title", "12");
      let message = "Title should be at least 3 characters";
      validators = {
        title: { minLength: { message, value: 3 } },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.title?.message).toBe(message);
    });
    test("{ minLength: { message, value: 3 } } should not error if 3 chars", async () => {
      formData.set("title", "123");
      validators = {
        title: { minLength: { message: "Enter more chars", value: 3 } },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
  });

  describe("maxLength", () => {
    let formData = new FormData();
    let validators: FormValidators<BookmarkFormValues>;
    test("{ maxLength: 10 } should error if 11 chars", async () => {
      formData.set("title", "12345678901");
      validators = {
        title: { maxLength: 10 },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.title?.message).toBe(DEFAULT_ERROR_MESSAGES.maxLength(10));
    });
    test("{ maxLength: 10 } should not error if 10 chars", async () => {
      formData.set("title", "1234567890");
      validators = {
        title: { maxLength: 10 },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("{ maxLength: { message, value: 10 } } should error with custom message if 11 chars =", async () => {
      formData.set("title", "12345678901");
      let message = "Title is too long";
      validators = {
        title: { maxLength: { message, value: 10 } },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.title?.message).toBe(message);
    });
    test("{ maxLength: { message, value: 10 } } should not error if 10 chars", async () => {
      formData.set("title", "1234567890");
      let message = "Title is too long";
      validators = {
        title: { maxLength: { message, value: 10 } },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
  });

  describe("max", () => {
    let formData = new FormData();
    let validators: FormValidators<BookmarkFormValues>;
    test("{ max: 10 } should error if greater than 10", async () => {
      formData.set("priority", "11");
      validators = {
        priority: { max: 10 },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.priority?.message).toBe(DEFAULT_ERROR_MESSAGES.max(10));
    });
    test("{ max: 10 } should not error if 10", async () => {
      formData.set("priority", "10");
      validators = {
        priority: { max: 10 },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("{ max: { message, value: 10 } } should error with custom message if 11 =", async () => {
      formData.set("priority", "11");
      let message = "Priority is too high";
      validators = {
        priority: { max: { message, value: 10 } },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.priority?.message).toBe(message);
    });
    test("{ max: { message, value: 10 } } should not error if 10", async () => {
      formData.set("priority", "10");
      let message = "Priority is too high";
      validators = {
        priority: { maxLength: { message, value: 10 } },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
  });

  describe("min", () => {
    let formData = new FormData();
    let validators: FormValidators<BookmarkFormValues>;
    test("{ min: 10 } should error if less than 10", async () => {
      formData.set("priority", "1");
      validators = {
        priority: { min: 10 },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.priority?.message).toBe(DEFAULT_ERROR_MESSAGES.min(10));
    });
    test("{ min: 10 } should not error if 10", async () => {
      formData.set("priority", "10");
      validators = {
        priority: { min: 10 },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("{ min: { message, value: 10 } } should error with custom message if 1 =", async () => {
      formData.set("priority", "1");
      let message = "Priority is too low";
      validators = {
        priority: { min: { message, value: 10 } },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.priority?.message).toBe(message);
    });
    test("{ min: { message, value: 10 } } should not error if 10", async () => {
      formData.set("priority", "10");
      let message = "Priority is too low";
      validators = {
        priority: { min: { message, value: 10 } },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
  });

  describe("pattern", () => {
    let formData = new FormData();
    let validators: FormValidators<BookmarkFormValues>;
    test("{ pattern: /ABC/ } should error if not ABC", async () => {
      formData.set("title", "XYZ");
      validators = {
        title: { pattern: /ABC/ },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.title?.message).toBe(DEFAULT_ERROR_MESSAGES.pattern("/ABC/"));
    });
    test("{ pattern: /ABC/ } should not error if ABC", async () => {
      formData.set("title", "ABC");
      validators = {
        title: { pattern: /ABC/ },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("{ pattern: { message, value: /ABC/ } } should error with custom message if XYZ", async () => {
      formData.set("title", "XYZ");
      let message = "Title is not valid";
      validators = {
        title: { pattern: { message, value: /ABC/ } },
      };
      let errors = await validate(formData, validators);
      expect(errors.url).toBeUndefined();
      expect(errors?.title?.message).toBe(message);
    });
    test("{ pattern: { message, value: /ABC/ } } should not error if ABC", async () => {
      formData.set("title", "ABC");
      let message = "Title is not valid";
      validators = {
        title: { pattern: { message, value: /ABC/ } },
      };
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
  });

  describe("validate", () => {
    let validators: FormValidators<BookmarkFormValues>;
    let formData = new FormData();
    test("returning true should result in no error", async () => {
      validators = {
        title: {
          validate: () => true,
        },
      };
      formData.set("title", "blah");
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("returning empty string should result in no error", async () => {
      validators = {
        title: {
          validate: () => "",
        },
      };
      formData.set("title", "blah");
      let errors = await validate(formData, validators);
      expect(errors).toBeNull();
    });
    test("returning false should return default error message", async () => {
      validators = {
        title: {
          validate: () => 1 > 2,
        },
      };
      formData.set("title", "blah");
      let errors = await validate(formData, validators);
      expect(errors?.title?.message).toBe(DEFAULT_ERROR_MESSAGES.validate("blah"));
    });
    test("a returned string value should be treated as the error message", async () => {
      validators = {
        title: {
          validate: () => "beep boop",
        },
      };
      formData.set("title", "blah");
      let errors = await validate(formData, validators);
      expect(errors?.title?.message).toBe("beep boop");
    });
  });

  describe("orchestration", () => {
    test("Requiring multiple fields should return an error for each", async () => {
      let formData = new FormData();
      let validators: FormValidators<BookmarkFormValues> = {
        title: { required: true },
        url: { required: true },
      };

      let errors = await validate(formData, validators);
      expect(errors?.title.message).toBe(DEFAULT_ERROR_MESSAGES.required());
      expect(errors?.url.message).toBe(DEFAULT_ERROR_MESSAGES.required());
    });
    test("Muliple validators on the same field should work", async () => {
      let formData = new FormData();
      formData.set("title", "12");
      let validators: FormValidators<BookmarkFormValues> = {
        title: { required: true, minLength: 3, maxLength: 10 },
        url: { required: true },
      };

      let errors = await validate(formData, validators);
      expect(errors?.title.message).toBe(DEFAULT_ERROR_MESSAGES.minLength(3));
      expect(errors?.url.message).toBe(DEFAULT_ERROR_MESSAGES.required());
    });
  });
});
