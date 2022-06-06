import { useRouteData } from "./useRouteData";

export const useConfig = () => {
  return useRouteData((r) => r.id === "root" && r?.data?.config);
};

export const useConfigEntry = (key: string, fallback = ""): string => {
  let config = useConfig();
  return config?.[key] || fallback;
};
