import { useResolvedPath } from "@remix-run/react";

export const useReturnTo = (to: string) => {
  let resolvedPath = useResolvedPath(to);

  let path = resolvedPath.pathname;
  if (resolvedPath.hash) {
    path += "#" + resolvedPath.hash;
  }
  if (resolvedPath.search) {
    path += "?" + resolvedPath.search;
  }
  return path;
};
