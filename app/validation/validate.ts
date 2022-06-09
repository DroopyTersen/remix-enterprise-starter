import type { FieldError, FieldValues } from "react-hook-form";
import { coreValidators } from "./coreValidators";
import type { CoreValidator, FormValidators, ValidationRules } from "./validation.types";

export const validate = async <TFieldValues = FieldValues>(
  formData: FormData,
  validators: FormValidators<TFieldValues>
) => {
  let fieldErrors = await Promise.all(
    (Object.keys(validators) as Array<keyof typeof validators>).map(async (field) => {
      return validateField(formData, field, validators[field]);
    })
  );

  let errors: {
    [key in keyof FormValidators<TFieldValues>]: FieldError;
  } = fieldErrors.reduce((acc, fieldError) => {
    acc[fieldError.field as keyof FormValidators<TFieldValues>] = fieldError.error;
    return acc;
  }, {} as { [key in keyof typeof validators]: FieldError });

  let hasErrors = fieldErrors.some((fieldError) => fieldError.error);
  return [errors, hasErrors] as [
    errors: { [key in keyof typeof validators]: FieldError },
    hasErrors: boolean
  ];
};

const validateField = async <T>(formData: FormData, field: T, rules: ValidationRules) => {
  let errors = await Promise.all(
    Object.keys(rules).map(async (ruleKey) => {
      let coreValidator: CoreValidator = coreValidators[ruleKey];
      let error = coreValidator
        ? await coreValidator(formData.get(field + ""), rules[ruleKey])
        : null;
      return error;
    })
  );
  let firstError = errors.filter(Boolean)?.[0] || null;
  return { field, error: firstError };
};
