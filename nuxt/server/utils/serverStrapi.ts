type strapiFetchOptions = {
    // params: Record<string, any>;
    token: string;
    baseUrl: string;
};

type requestData = {
    params?: Record<string, any>;
    body?: BodyInit;
};
// export const useStrapiFetch = async <T = unknown>(
//     entity: string,
//     options: strapiFetchOptions = {
//         params: {},
//         token: useRuntimeConfig().public.strapiToken,
//         baseUrl: useRuntimeConfig().public.strapiBaseUrl,
//     }
// ) => {
//     const url = `http://strapi/api/${entity}`;
//     const params = new URLSearchParams();
//     const response = await fetch(url + params, {
//         headers: {
//             Authorization: `Bearer ${options.token}`,
//         },
// }//
// });

//     const data: T|null = await response.json()

//     return data;
// };

const createHeaders = (options: strapiFetchOptions) => {
    return {
        headers: {
            Authorization: `Bearer ${options.token}`,
        },
    };
};

const makeUrl = (
    baseUrl: string,
    url: string,
    params?: Record<string, any>
) => {
    const searchParams = new URLSearchParams();

    if (params) {
        Object.keys(params).forEach((key) => {
            searchParams.set(key, params[key]);
        });
    }

    let query = searchParams.toString();

    if (query.length) {
        query = '?' + searchParams;
    }

    return `${baseUrl}${url}` + query;
};

const request = <T>(
    options: strapiFetchOptions,
    url: string,
    params?: Record<string, any>,
    data: any = null,
    method: string = 'get'
) => {
    const completeUrl = makeUrl(options.baseUrl, url, params);
    const { headers } = createHeaders(options);

    const request: RequestInit = {
        headers,
    };

    if (data !== null) {
        request.body = data;
    }

    return send<T>(completeUrl, request);
};

const send = async <T>(url: string, request: RequestInit) => {
    let error = null;
    let data: null | T = null;
    let headers = null;


    try {
        const response = await fetch(url, request);
        headers = response.headers;
        const res = await response.json();
        data = res.data;
    } catch (err) {
        error = err;
    }

    return {
        error,
        data,
    };
};

export const useStrapiFetch = (
    options: strapiFetchOptions = {
        baseUrl: 'http://strapi/api',
        token: useRuntimeConfig().app.strapiToken,
    }
) => {
    return {
        get: <T>(url: string, params?: Record<string, any>) => {
            return request<T>(options, url, params);
        },
        post: <T>(url: string, data: requestData) => {
            return fetch(`${options.baseUrl}${url}`, {
                headers: {
                    Authorization: `Bearer ${options.token}`,
                },
                method: 'post',
                body: data.body,
            });
        },
        patch: <T>(url: string, data: requestData) => {
            return fetch(`${options.baseUrl}${url}`, {
                headers: {
                    Authorization: `Bearer ${options.token}`,
                },
                method: 'patch',
                body: data.body,
            });
        },
        put: <T>(url: string, data: requestData) => {
            return fetch(`${options.baseUrl}${url}`, {
                headers: {
                    Authorization: `Bearer ${options.token}`,
                },
                method: 'put',
                body: data.body,
            });
        },
        delete: <T>(url: string, data: requestData) => {
            return fetch(`${options.baseUrl}${url}`, {
                headers: {
                    Authorization: `Bearer ${options.token}`,
                },
                method: 'delete',
            });
        },
    };
};
