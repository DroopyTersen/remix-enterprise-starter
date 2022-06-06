import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalStyles from "./global.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = ({ request }) => {
  return {
    config: getPublicEnvVars(),
  };
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: globalStyles,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

const getPublicEnvVars = () => {
  let publicEnv = Object.entries(process.env).reduce((acc, [key, value]) => {
    if (key.startsWith("PUBLIC_")) {
      acc[key] = value;
    }
    return acc;
  }, {});
  return publicEnv;
};
