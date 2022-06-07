import { useLocation } from "@remix-run/react";
import { useEffect } from "react";

export const useScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
};
