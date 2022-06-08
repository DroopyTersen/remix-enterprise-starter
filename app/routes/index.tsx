import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getConfigEntry } from "~/common/config.server";
import { AppErrorBoundary } from "~/features/error/AppErrorBoundary";
import { Button } from "~/ui-toolkit/components/Button/Button";
import { Surface } from "~/ui-toolkit/components/Surface/Surface";
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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <h2>{envSpecficMessage}</h2>
      <Surface>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <Button
              as="a"
              href="https://remix.run/docs"
              variant="filled"
              color="primary"
            >
              Test button
            </Button>
          </li>
          <li>
            <Link to="/bookmarks" prefetch="intent">
              Bookmarks
            </Link>
          </li>
        </ul>
      </Surface>
    </div>
  );
}

export const ErrorBoundary = AppErrorBoundary;
