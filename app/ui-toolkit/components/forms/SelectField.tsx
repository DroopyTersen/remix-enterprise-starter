import React from "react";
import type { FormFieldProps } from "./FormField";
import { FormField, getValidationStatus, pluckFormFieldProps } from "./FormField";
import type { SelectProps } from "./Select";
import { Select } from "./Select";

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  // eslint-disable-next-line
  function SelectField(props, ref) {
    const { formControlProps, formFieldProps } = pluckFormFieldProps(props);
    const status = getValidationStatus(formFieldProps.validationStatus, formFieldProps.error);
    return (
      <FormField {...formFieldProps}>
        <Select {...formControlProps} validationStatus={status} ref={ref} />
      </FormField>
    );
  }
);

export type SelectFieldProps = SelectProps & FormFieldProps;
