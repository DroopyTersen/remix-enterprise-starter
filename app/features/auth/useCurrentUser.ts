import { useRouteData } from "~/ui-toolkit/hooks/useRouteData";
import type { AppUser } from "./auth.types";

export const useCurrentUser = () => {
  return useRouteData((r) => r?.id === "root" && r?.data?.user) as AppUser;
};
