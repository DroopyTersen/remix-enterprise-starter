import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import { getConfigEntry } from "~/common/config.server";
import type { SessionData } from "./auth.types";

const SESSION_SECRET = getConfigEntry("SESSION_SECRET");
const SESSION_NAME = getConfigEntry("SESSION_NAME", "__session");

const storage = createCookieSessionStorage({
  cookie: {
    name: SESSION_NAME,
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET || "NO_SECRET_PROVIDED"],
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 60 * 60 * 23,
    httpOnly: true,
  },
});

export const authSession = {
  /** Create a session cookie for the user who as just logged in */
  create: async (sessionData: SessionData, redirectTo: string) => {
    // If no session secret has been configured throw an error and prevent login
    if (!SESSION_SECRET)
      throw json({ message: "Unable to login: Missing SESSION_SECRET env variable" }, 500);

    const session = await storage.getSession();
    session.set("data", sessionData);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  },
  /** Deletes the session cookie and redirects the user. */
  logout: async (request: Request, redirectTo = "/") => {
    const session = await authSession._getSession(request);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await storage.destroySession(session),
      },
    });
  },
  /** Gets the raw Session from the request Cookie */
  _getSession: (request: Request) => storage.getSession(request.headers.get("Cookie")),
  /** Gets the SessionData from the request Cookie. Returns null if no session. */
  get: async (request: Request) => {
    const session = await authSession._getSession(request);
    let data: SessionData = session?.get?.("data");

    return data || null;
  },
  /** Redirects to /login if no user session */
  require: async (request: Request, returnTo: string = "") => {
    let { pathname, search } = new URL(request.url);
    if (!returnTo) returnTo = `${pathname}${search}`;
    let sessionData = await authSession.get(request);
    if (!sessionData) {
      const searchParams = new URLSearchParams([["returnTo", returnTo]]);
      throw redirect(`/login?${searchParams}`);
    }
    return sessionData;
  },
};
