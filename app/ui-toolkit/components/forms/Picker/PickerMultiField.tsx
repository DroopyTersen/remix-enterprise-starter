import React from "react";
import type { FormFieldProps } from "../FormField";
import { FormField, getValidationStatus, pluckFormFieldProps } from "../FormField";
import type { PickerMultiProps } from "./Picker.types";
import { PickerMulti } from "./PickerMulti";

export const PickerMultiField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  // eslint-disable-next-line
  function PickerMultiField(props, ref) {
    const { formControlProps, formFieldProps } = pluckFormFieldProps(props);
    const status = getValidationStatus(formFieldProps.validationStatus, formFieldProps.error);
    return (
      <FormField {...formFieldProps}>
        <PickerMulti {...formControlProps} validationStatus={status} ref={ref} />
      </FormField>
    );
  }
);

export type SelectFieldProps = PickerMultiProps & FormFieldProps;
