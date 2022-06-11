export interface AppUser {
  id: string;
  email: string;
  role: "admin" | "user";
}

/**
 * The data stored in the session cookie
 */
export interface SessionData {
  user: AppUser;
  access_token: string;
}
