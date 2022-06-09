import type { LoaderFunction } from "@remix-run/node";
import { unfurl } from "unfurl.js";
import type { Metadata } from "unfurl.js/dist/types";

export const loader: LoaderFunction = async ({ request }) => {
  const targetUrl = new URL(request.url).searchParams.get("url");
  if (!targetUrl) {
    return new Response("Missing url query param", { status: 400 });
  }

  try {
    const result = await unfurl(targetUrl);
    return parseMetadataSummary(result, targetUrl);
  } catch (err) {
    console.error("Unable to unfurl link", err);
    return new Response("Unable to unfurl link: " + err?.message, {
      status: 400,
    });
  }
};

const parseMetadataSummary = (result: Metadata, targetUrl: string) => {
  const url = new URL(targetUrl);
  return {
    title: result?.title || "",
    description: result?.description || "",
    author: result?.author || "",
    siteName: result?.open_graph?.site_name || result?.twitter_card?.site || url.hostname,
    image:
      result.open_graph?.images?.[0]?.url ||
      result.twitter_card?.images?.[0]?.url ||
      result?.favicon,
  };
};
