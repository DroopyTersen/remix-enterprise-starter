import type { FieldError, FieldErrors, FieldValues, RegisterOptions } from "react-hook-form";

export type ValidationRules = Pick<
  RegisterOptions,
  "required" | "min" | "minLength" | "max" | "maxLength" | "validate" | "pattern"
>;

export type FormValidators<TFieldValues = FieldValues> = Partial<{
  [K in keyof TFieldValues]: ValidationRules;
}>;

export type ValidateFn = <TFieldValues = FieldValues>(
  formData: FormData,
  validators: FormValidators<TFieldValues>
) => Promise<FieldErrors<TFieldValues>>;

export type CoreValidator = (
  inputVal: FormDataEntryValue,
  rule: any
) => FieldError | null | Promise<FieldError | null>;

export type CoreValidators = {
  [key in keyof ValidationRules]: CoreValidator;
};

export type ValidationErrors<TFieldValues = FieldValues> = {
  [key in keyof FormValidators<TFieldValues>]: FieldError;
};
