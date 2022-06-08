import React from "react";
import type { FormFieldProps } from "./FormField";
import {
  FormField,
  getValidationStatus,
  pluckFormFieldProps,
} from "./FormField";
import type { InputProps } from "./Input";
import { Input } from "./Input";

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  // eslint-disable-next-line
  function InputField(props, ref) {
    const { formControlProps, formFieldProps } = pluckFormFieldProps(props);
    const status = getValidationStatus(
      formFieldProps.validationStatus,
      formFieldProps.error
    );
    return (
      <FormField {...formFieldProps}>
        <Input {...formControlProps} validationStatus={status} ref={ref} />
      </FormField>
    );
  }
);

export type InputFieldProps = InputProps & FormFieldProps;
