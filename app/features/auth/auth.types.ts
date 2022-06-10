export interface AppUser {
  id: string;
  email: string;
  role: "admin" | "user";
}
