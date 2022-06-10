import { createCookieSessionStorage, redirect } from "@remix-run/node";
import type { AppUser } from "./auth.types";

const SESSION_SECRET = "dotadda-app-is-great";
const AUTH_COOKIE = "dotadda-auth";

const storage = createCookieSessionStorage({
  cookie: {
    name: AUTH_COOKIE,
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 23,
    httpOnly: false,
  },
});

export async function createUserSession(user: AppUser, accessToken: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("access_token", accessToken);
  session.set("user", user);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserFromSession(request: Request) {
  const session = await getUserSession(request);
  const user: AppUser = session.get("user");
  const access_token = session.get("access_token");

  // 📌 TODO: Do you need an access token to send to an API?
  // 📌 TODO: Do you need to check if the access token is valid yourself or let the API do it?
  // let isValid = await tryValidateToken(access_token);
  let isValid = true;
  if (!isValid || !user?.id) return null;

  return {
    user,
    access_token,
  };
}

export async function requireUserSession(request: Request, returnTo: string = "") {
  let { pathname, search } = new URL(request.url);
  if (!returnTo) returnTo = `${pathname}${search}`;
  let user = await getUserFromSession(request);
  if (!user) {
    const searchParams = new URLSearchParams([["returnTo", returnTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return user;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export const requireAuthenticatedLoader = async (request: Request) => {
  let userSession = await requireUserSession(request);
  return {
    user: userSession.user,
  };
};

export interface AuthenticatedAction {
  intent?: string;
  user: AppUser;
  formData: FormData;
  returnTo?: string;
}
export const requireAuthenticatedAction = async (
  request: Request
): Promise<AuthenticatedAction> => {
  let userSession = await requireUserSession(request);
  let formData: any = {};
  if (request.headers.get("Content-Type") === "application/json") {
    formData = await request.json();
  } else {
    formData = await request.formData();
  }
  let returnTo = new URL(request.url)?.searchParams.get("returnTo") || formData.returnTo;
  let intent = typeof formData?.intent === "string" ? formData.intent : "";

  return {
    intent,
    user: userSession.user,
    formData,
    returnTo,
  };
};
