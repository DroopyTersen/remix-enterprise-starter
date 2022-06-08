import React from "react";
import { useNavigate } from "react-router";
import type { ButtonProps } from "../Button/Button";
import { Button } from "../Button/Button";

export const FormActions = ({ children }) => {
  // Need to reverse so that the Next button shows up first in the markup so it is the
  // default submit button to be used when users hit enter
  return <div className="footer form-actions flex-row-reverse">{children}</div>;
};

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      color="primary"
      onClick={() => {
        navigate(-1);
      }}
    >
      Back
    </Button>
  );
};

export const SaveAndExit = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function SaveAndExit(props, ref) {
    return (
      <Button color="dark" {...props} ref={ref}>
        {`Save & Exit`}
      </Button>
    );
  }
);

export const SaveAndReturn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function SaveAndReturn(props, ref) {
    return (
      <Button color="success" {...props} ref={ref}>
        {`Save & Continue`}
      </Button>
    );
  }
);

export const NextButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function NextButton(props, ref) {
    return (
      <Button color="success" {...props} ref={ref}>
        Next
      </Button>
    );
  }
);

FormActions.SaveAndExitButton = SaveAndExit;
FormActions.SaveAndReturn = SaveAndReturn;
FormActions.BackButton = BackButton;
FormActions.NextButton = NextButton;
