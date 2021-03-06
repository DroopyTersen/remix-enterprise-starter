import type { FormMethod } from "@remix-run/react";
import { Form } from "@remix-run/react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";

// "btn btn-secondary" or "btn-outline-primary"
interface ExtraProps {
  action?: string;
  /** Defaults to post */
  method?: FormMethod;
  /** Defaults to true */
  replace?: boolean;
}

export type FormButtonProps = ButtonProps & ExtraProps;

export function FormButton({
  action,
  method = "post",
  replace = true,
  children,
  ...rest
}: FormButtonProps) {
  return (
    <Form action={action} method={method} replace={replace}>
      <Button {...(rest as any)}>{children}</Button>
    </Form>
  );
}
