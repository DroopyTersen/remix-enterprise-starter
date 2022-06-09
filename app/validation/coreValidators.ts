import type { Validate } from "react-hook-form";
import type { CoreValidators, ValidationRules } from "./validation.types";

export const DEFAULT_ERROR_MESSAGES = {
  required: () => "This field is required",
  minLength: (ruleValue) => `Please enter at least ${ruleValue} characters`,
  maxLength: (ruleValue) =>
    `Please enter fewer than ${ruleValue + 1} characters`,
  validate: (inputValue) => `${inputValue} is invalid`,
};
export const coreValidators: CoreValidators = {
  // { required: true }
  // { required: "Title is required"}
  // { require: { message: "Url is required", value: true}}
  required: (inputVal, rule: ValidationRules["required"]) => {
    let ruleValue: boolean =
      typeof rule === "boolean"
        ? rule
        : typeof rule === "string"
        ? true
        : rule.value;

    // It's not required
    if (!ruleValue) return null;

    // it's required but there is a truthy value
    if (inputVal) return null;

    let message =
      typeof rule === "string"
        ? rule
        : typeof rule === "object"
        ? rule?.message
        : DEFAULT_ERROR_MESSAGES.required();
    return {
      type: "required",
      message,
    };
  },

  // { minLength: 2 }
  // { minLength: { message: "Title should be at least 3 characters", value: 3 }}
  minLength: (inputVal, rule: ValidationRules["minLength"]) => {
    if (!inputVal) return null;

    let ruleValue: number =
      typeof rule === "number"
        ? rule
        : typeof rule === "object"
        ? rule.value
        : null;

    if (ruleValue === null) return null;
    let message =
      typeof rule === "object"
        ? rule.message
        : DEFAULT_ERROR_MESSAGES.minLength(ruleValue);

    if (typeof inputVal !== "string") return null;

    return inputVal.length < ruleValue
      ? {
          type: "minLength",
          message,
        }
      : null;
  },
  // { maxLength: 120 }
  // { maxLength: { message: "Title is too long", value: 120 }}
  maxLength: (inputVal, rule: ValidationRules["maxLength"]) => {
    if (!inputVal) return null;

    let ruleValue: number =
      typeof rule === "number"
        ? rule
        : typeof rule === "object"
        ? rule.value
        : null;

    if (ruleValue === null) return null;
    let message =
      typeof rule === "object"
        ? rule.message
        : DEFAULT_ERROR_MESSAGES.maxLength(ruleValue);

    if (typeof inputVal !== "string") return null;

    return inputVal.length > ruleValue
      ? {
          type: "minLength",
          message,
        }
      : null;
  },
  validate: async (inputVal, rule: ValidationRules["validate"]) => {
    if (typeof rule === "function") {
      return validateCustomFn(inputVal, rule);
    }
    if (typeof rule === "object") {
      let errors = (
        await Promise.all(
          Object.keys(rule).map((key) => {
            return validateCustomFn(inputVal, rule[key], key);
          })
        )
      ).filter(Boolean);
      if (!errors?.length) return null;
      return {
        type: "validate",
        message: errors.map((error) => error.message).join(", "),
      };
    }
    return null;
  },
};

const validateCustomFn = async (
  inputVal,
  rule: Validate<any>,
  type = "validate"
) => {
  let validateResult = await rule(inputVal);
  // If it's a boolean, true means valid, false means invalid
  if (typeof validateResult === "boolean") {
    return validateResult
      ? null
      : { type, message: DEFAULT_ERROR_MESSAGES.validate(inputVal) };
  }
  // Otherwise if it's falsy, no error
  if (!validateResult) return null;

  // It' could be multiple errors so join them together
  let message = Array.isArray(validateResult)
    ? validateResult.join(", ")
    : validateResult;
  return {
    type,
    message,
  };
};
