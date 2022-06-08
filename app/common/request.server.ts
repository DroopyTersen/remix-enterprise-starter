import { jsonRequest } from "~/ui-toolkit/utils/request.utils";

export const request = (baseUrl: string) => {
  const getFullUrl = (path: string): string => {
    return `${baseUrl}${path}`;
  };

  const get = async (
    path: string,
    options?: Partial<RequestInit>
  ): Promise<any> => {
    return await jsonRequest(getFullUrl(path), options);
  };

  const post = async (
    path: string,
    body: string,
    options?: Partial<RequestInit>
  ): Promise<any> => {
    return await jsonRequest(getFullUrl(path), {
      method: "POST",
      body,
      ...options,
    });
  };

  const put = async (
    path: string,
    body: string,
    options?: Partial<RequestInit>
  ): Promise<any> => {
    return await jsonRequest(getFullUrl(path), {
      method: "PUT",
      body,
      ...options,
    });
  };

  const remove = async (
    path: string,
    options?: Partial<RequestInit>
  ): Promise<any> => {
    return await jsonRequest(getFullUrl(path), {
      method: "DELETE",
      ...options,
    });
  };

  return {
    get,
    post,
    put,
    remove,
  };
};
