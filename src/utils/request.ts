interface Request {
  get(
    url: string,
    params?: Record<string, string>,
    headers?: RequestInit["headers"]
  ): Promise<any>;
}

const rest: Request = {
  get: (_url, params, headers) => {
    const url = new URL(_url);
    url.search = new URLSearchParams(params).toString();
    return fetch(url, {
      headers,
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        throw new Error("Request failed", { cause: err });
      });
  },
};

export default rest;
