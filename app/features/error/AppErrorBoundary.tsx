import { ErrorContainer } from "~/ui-toolkit/components/ErrorContainer/ErrorContainer";

export const AppErrorBoundary = ({ error }) => {
  let message = "Unknown error";

  // It's a string
  if (typeof error === "string") message = error;
  // It's a normal error
  else if (error?.message) message = error?.message;
  // It's an array of errors
  else if (Array.isArray(error)) {
    message = error
      ?.map((e) => e?.message)
      .filter(Boolean)
      .join(", ");
  }

  return (
    <ErrorContainer>
      <pre>{message}</pre>
    </ErrorContainer>
  );
};
