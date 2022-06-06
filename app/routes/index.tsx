import { LoaderFunction } from "@remix-run/node";
import { getConfigEntry } from "~/common/config.server";
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
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
