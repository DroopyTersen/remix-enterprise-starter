import type { FormProps, SubmitFunction } from "@remix-run/react";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { forwardRef, useState } from "react";
import type { FieldError, UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";

function createForm(form: UseFormReturn, submit: SubmitFunction) {
  let SnapshottedForm = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
    return (
      <Form
        // use the form from the closure
        onSubmit={form.handleSubmit((_, event) => {
          // let formElem = (ref as any)?.current;

          // if (formElem) {
          //   let formData = new FormData(formElem);
          //   console.log("🚀 | createForm | formData", Object.fromEntries(formData));
          //   console.log("🚀 | createForm | form", formElem);
          // }
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
  let serverErrors = useActionData()?.errors || {};
  let form = useForm({
    defaultValues: initial || {},
  });
  let [Form] = useState(() => createForm(form, submit));
  let errors = {
    ...form?.formState?.errors,
    ...serverErrors,
  };
  return {
    ...form,
    errors,
    Form,
  } as any;
}

export interface UseValidateFormReturn<TFormValues> extends UseFormReturn<TFormValues> {
  Form?: ReturnType<typeof createForm>;
  errors: { [key in keyof TFormValues]?: FieldError };
}
