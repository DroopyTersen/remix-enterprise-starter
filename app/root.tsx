import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { AppLayout } from "./features/layout/AppLayout";
import globalStyles from "./global.css";
import { ErrorContainer } from "./ui-toolkit/components/ErrorContainer/ErrorContainer";

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
    <html lang="en" className="h-100">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-100">
        <AppLayout>
          <Outlet />
        </AppLayout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        ></script>
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

export function CatchBoundary() {
  const caught = useCatch();
  let title = caught?.status === 404 ? "There's nothing here!" : "Error";
  let message =
    caught?.status === 404
      ? "The page your looking for doesn't exist."
      : "Uh oh. Something went wrong.";
  return (
    <html className="h-100">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-100">
        <AppLayout>
          <div className="px-4 py-5 h-100">
            <ErrorContainer title={title}>
              <pre>{message}</pre>
            </ErrorContainer>
          </div>
        </AppLayout>
        <Scripts />
      </body>
    </html>
  );
}
