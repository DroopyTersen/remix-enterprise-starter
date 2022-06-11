import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authSession } from "~/features/auth/authSession.server";

export const action: ActionFunction = async ({ request }) => {
  return authSession.logout(request);
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
