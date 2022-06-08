import { Form, FormProps, SubmitFunction, useSubmit } from "@remix-run/react";
import { forwardRef, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

function createForm(form: UseFormReturn, submit: SubmitFunction) {
  let SnapshottedForm = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
    return (
      <Form
        onSubmit={form.handleSubmit((_, event) => {
          submit(event?.target, {
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
  SnapshottedForm.displayName = "fetcher.Form";
  return SnapshottedForm;
}

export function useValidatedForm<TFormValues = any>(
  initial: TFormValues
): UseValidateFormReturn<TFormValues> {
  let submit = useSubmit();
  let form = useForm({
    defaultValues: initial || {},
  });
  let [Form] = useState(() => createForm(form, submit));

  return {
    ...form,
    Form,
  } as any;
}

export interface UseValidateFormReturn<TFormValues> extends UseFormReturn<TFormValues> {
  Form?: ReturnType<typeof createForm>;
}
