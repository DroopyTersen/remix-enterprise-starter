import { ErrorContainer } from "~/ui-toolkit/components/ErrorContainer/ErrorContainer";

export const ErrorView = ({ error }) => {
  return (
    <ErrorContainer>
      <pre>{error?.message}</pre>
    </ErrorContainer>
  );
};
