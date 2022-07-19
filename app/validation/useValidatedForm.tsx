import type { FormProps, SubmitFunction } from "@remix-run/react";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { forwardRef, useState } from "react";
import type { FieldError, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { ValidationErrors } from "./validation.types";

function createForm(form: UseFormReturn, submit: SubmitFunction) {
  let SnapshottedForm = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
    return (
      <Form
        // use the form from the closure
        onSubmit={form.handleSubmit((_, event) => {
          // use the submit function from the closure
          submit(event?.target, {
            // use instance props for the submit options
            action: props?.action,
            method: props?.method,
            encType: props?.encType,
            replace: props?.replace,
          });
        })}
        {...props}
        ref={ref}
      />
    );
  });
  SnapshottedForm.displayName = "validatedForm.Form";
  return SnapshottedForm;
}

export function useValidatedForm<TFormValues = any>(
  initial?: TFormValues
): UseValidateFormReturn<TFormValues> {
  let submit = useSubmit();
  let actionData = useActionData();
  console.log("🚀 | actionData", actionData);
  let erroredFormData = actionData?.formData as TFormValues;
  console.log("🚀 | erroredFormData", erroredFormData);
  let serverErrors = (actionData?.errors || {}) as ValidationErrors<TFormValues>;
  let defaultValues = {
    ...initial,
    ...(erroredFormData as any),
  };
  let form = useForm<TFormValues>({
    defaultValues,
  });
  let [Form] = useState(() => {
    return createForm(form as any, submit);
  });
  let errors = {
    ...form?.formState?.errors,
    ...serverErrors,
  };

  const register = (field, ...rest) => {
    let props: any = form.register(field, ...rest);
    if (defaultValues[field]) {
      props.defaultValue = defaultValues[field];
    }
    return props;
  };

  return {
    ...form,
    register,
    errors,
    Form,
  } as any;
}

export interface UseValidateFormReturn<TFormValues> extends UseFormReturn<TFormValues> {
  Form?: ReturnType<typeof createForm>;
  errors: { [key in keyof TFormValues]?: FieldError };
}
