import { useSearchParams } from "@remix-run/react";

export const useQueryParam = (param: string, fallback = "") => {
  let [searchParams, setSearchParams] = useSearchParams();

  let val = searchParams.get(param);

  let setVal = (newValue: string) => {
    let newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(param, newValue);
    setSearchParams(newSearchParams);
  };
  return [val, setVal] as [string, typeof setVal];
};
