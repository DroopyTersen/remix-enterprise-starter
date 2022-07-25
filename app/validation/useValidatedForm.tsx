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
          let formData = new FormData(event?.target);
          // Because react-hook-form internally does a event.preventDefault(), we need to
          // tack the 'intent' on manually.
          // The input type='submit' (or <button>) name,value doesn't seem to be available
          // in the `onSubmit` event. As long as you don't preventDefault, the browser
          // eventually tacks it on so it is in formData in your action. not sure when/how
          // that happens though.

          let submitter: HTMLInputElement =
            (event?.nativeEvent as any).submitter || document.activeElement;
          if (submitter && submitter?.name && submitter?.value) {
            formData.set(submitter?.name, submitter.value);
            console.log(Object.fromEntries(formData));
          }
          // use the submit function from the closure
          submit(formData, {
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
  // Pull any errors or previously submitted data from ActionData
  let actionData = useActionData();
  let erroredFormData = actionData?.formData as TFormValues;
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

  // Add `defaultValue` to the list of props the form.register returns
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
