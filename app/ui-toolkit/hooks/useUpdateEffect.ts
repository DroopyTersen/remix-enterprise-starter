import { useEffect, useRef } from "react";

export function useUpdateEffect(effectFn, dependencies: any[]) {
  let hasMountedRef = useRef(false);

  useEffect(() => {
    if (hasMountedRef.current) {
      return effectFn();
    } else {
      hasMountedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
