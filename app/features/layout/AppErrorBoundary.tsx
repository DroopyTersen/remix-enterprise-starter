import { useCatch } from "@remix-run/react";
import type { ApiResult } from "~/common/request.server";
import { ErrorContainer } from "~/ui-toolkit/components/ErrorContainer/ErrorContainer";

// We can reuse this component for
// both unhandled exceptions (ErrorBoundary)
// and thrown Responses (CatchBoundary)
export const AppErrorBoundary = ({ error: errorBoundaryError }) => {
  let caughtThing = useCatch();
  let error = caughtThing || errorBoundaryError;
  let message = tryParseMessage(error);

  return (
    <ErrorContainer>
      <pre>{message}</pre>
    </ErrorContainer>
  );
};

type ThrownErrorType =
  | string
  | Error
  // - a JSON Response of type ApiResult
  | { status: number; data: ApiResult<any> }
  // DIY Error
  | { message: string }
  // Diy error array
  | { message: string }[];

let tryParseMessage = (thrown: ThrownErrorType) => {
  if (typeof thrown === "string") return thrown;
  if ("message" in thrown) return thrown.message;
  if (Array.isArray(thrown))
    return thrown
      .map((e) => e?.message)
      .filter(Boolean)
      .join(", ");
  if ("status" in thrown) return thrown?.data?.errors?.map((e) => e?.message)?.join(", ");

  return "Unknown error";
};
