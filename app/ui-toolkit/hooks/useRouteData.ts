import { useMatches } from "@remix-run/react";

type RouteSelector = <T>(route: ReturnType<typeof useMatches>[0]) => T;

export const useRouteData = (selector: RouteSelector) => {
  let match = useMatches().reverse()?.find(selector);

  return selector(match);
};
