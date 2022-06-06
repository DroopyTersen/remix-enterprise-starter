import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
// import { ErrorContainer } from "~/components/errors/ErrorContainer";

interface LoaderData {
  // LOADER_DATA
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return {} as LoaderData;
};

export default function BookmarkDetailsRoute() {
  let data = useLoaderData() as LoaderData;
  let { bookmarkId } = useParams();

  return <div>{bookmarkId}</div>;
}

// export const action: ActionFunction = async ({ request, params }) => {};

export const ErrorBoundary = ({ error }) => {
  return (
    <div className="mt-4" title="Unable to load Credentials">
      <pre>{error.message}</pre>
    </div>
  );
};
