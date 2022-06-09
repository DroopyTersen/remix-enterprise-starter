import type { LoaderFunction } from "@remix-run/node";
import { getConfigEntry } from "~/common/config.server";
import { AppErrorBoundary } from "~/features/layout/AppErrorBoundary";
import { Button } from "~/ui-toolkit/components/Button/Button";
import { useConfigEntry } from "~/ui-toolkit/hooks/useConfig";

export const loader: LoaderFunction = ({ request }) => {
  let apiUrl = getConfigEntry("API_URL");
  console.log(
    "API_URL",
    apiUrl,
    "This is a server side setting that is not exposed to the client: "
  );

  return {};
};
export default function Index() {
  let envSpecficMessage = useConfigEntry(
    "PUBLIC_MESSAGE",
    "Uh oh. Couldn't pull in the message from env variables."
  );
  return (
    <div className="px-4 py-5 d-grid" style={{ placeItems: "center" }}>
      <h1 className="mb-5">Remix Enterprise Starter</h1>
      <Button to="/bookmarks" scale="lg">
        Check out the bookmarks demo!
      </Button>
      <p className="fst-italic mt-5">The following message comes from an environment variable:</p>
      <h2 className="text-primary">{envSpecficMessage}</h2>
    </div>
  );
}

export const ErrorBoundary = AppErrorBoundary;
