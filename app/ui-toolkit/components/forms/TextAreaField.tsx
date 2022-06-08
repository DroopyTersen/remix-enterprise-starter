import React from "react";
import type {
  FormFieldProps} from "./FormField";
import {
  FormField,
  getValidationStatus,
  pluckFormFieldProps,
} from "./FormField";
import type { TextAreaProps } from "./TextArea";
import { TextArea } from "./TextArea";

export const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(
  // eslint-disable-next-line
  function TextAreaField(props, ref) {
    const { formControlProps, formFieldProps } = pluckFormFieldProps(props);
    const status = getValidationStatus(
      formFieldProps.validationStatus,
      formFieldProps.error
    );
    return (
      <FormField {...formFieldProps}>
        <TextArea {...formControlProps} validationStatus={status} ref={ref} />
      </FormField>
    );
  }
);

export type TextAreaFieldProps = TextAreaProps & FormFieldProps;
