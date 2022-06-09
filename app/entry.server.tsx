import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import dotenv from "dotenv";
import * as path from "node:path";
import { renderToString } from "react-dom/server";

console.log("🚀 | __dirname", __dirname);
const envPath = path.join(__dirname, "../env", ".env." + (process.env.PUBLIC_ENV || "local"));
console.log("🚀 | envPath", envPath);
dotenv.config({ path: envPath });

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
