import { json } from "@remix-run/node";
import { JSON_DEFAULTS, mergeRequestOptions } from "~/ui-toolkit/utils/request.utils";

export interface ApiError {
  message: string;
  [key: string]: any;
}

interface ApiResponseBody<T = any> {
  data?: T;
  errors?: ApiError[];
  count?: number;
}

export type ApiResult<T = any> = {
  success: boolean;
  status: number;
} & ApiResponseBody<T>;

export const createApiRequest = (baseUrl: string, defaultOptions?: Partial<RequestInit>) => {
  const baseOptions = mergeRequestOptions(JSON_DEFAULTS, defaultOptions);

  const getFullUrl = (path: string): string => {
    return `${baseUrl}${path}`;
  };

  const _request = async <Data = any>(
    path: string,
    options?: Partial<RequestInit>
  ): Promise<ApiResult<Data>> => {
    let url = getFullUrl(path);
    let reqOptions = mergeRequestOptions(baseOptions, options);
    let resp = await fetch(url, reqOptions);
    return handleApiResponse<Data>(resp);
  };

  const get = async <T = any>(
    path: string,
    options?: Partial<RequestInit>
  ): Promise<ApiResult<T>> => {
    return _request(path, mergeRequestOptions({ method: "GET" }, options));
  };

  const post = async <Data = any>(
    path: string,
    body: any,
    options?: Partial<RequestInit>
  ): Promise<ApiResult<Data>> => {
    let postBody = typeof body === "string" ? body : JSON.stringify(body);
    return _request<Data>(path, mergeRequestOptions({ method: "POST", body: postBody }, options));
  };

  const put = async <Data = any>(
    path: string,
    body: any,
    options?: Partial<RequestInit>
  ): Promise<ApiResult<Data>> => {
    let postBody = typeof body === "string" ? body : JSON.stringify(body);
    return _request<Data>(path, mergeRequestOptions({ method: "PUT", body: postBody }, options));
  };

  const remove = async <T = any>(
    path: string,
    options?: Partial<RequestInit>
  ): Promise<ApiResult<T>> => {
    return _request(path, mergeRequestOptions({ method: "DELETE" }, options));
  };

  return {
    get,
    post,
    put,
    remove,
  };
};

export async function handleApiResponse<Data>(resp: Response) {
  if (!resp.ok) {
    let responseBody: any = await resp.text();
    try {
      responseBody = JSON.parse(responseBody);
    } catch (e) {
      // Ignore, we'll just return the text body
    }

    const result: ApiResult<null> = {
      success: false,
      status: resp.status,
      errors: responseBody?.errors || [{ message: "Unable to fetch: " + resp.url }],
    };
    throw json(result, resp.status);
  }

  const responseBody: ApiResponseBody<Data> = await resp.json().catch((err) => {
    console.error("Unable to parse response as JSON", err);
    throw json(
      {
        status: resp.status,
        success: false,
        errors: [{ message: "Unable to parse response as JSON" }],
      },
      resp.status
    );
  });

  const result: ApiResult<Data> = {
    status: resp.status,
    success: resp.ok,
    ...responseBody,
  };

  return result;
}
