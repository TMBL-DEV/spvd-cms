type strapiFetchOptions = {
    // params: Record<string, any>;
    token: string;
    baseUrl: string;
};

type requestData = {
    params?: Record<string, any>;
    body?: Record<string, any>;
}
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
//     });    

//     const data: T|null = await response.json()
    
//     return data; 
// };


const useStrapiFetch = (options: strapiFetchOptions) => {
   return {
        get: (url: string, data: requestData) => useFetch(`${options.baseUrl}${url}`, {     
            method: 'get',
            params: data.params,
        }),
        post: (url: string, data: requestData) => useFetch(`${options.baseUrl}${url}`, {
            method: 'post',
            params: data.params,
            body: data.body
        }),
        patch: (url: string, data: requestData) => useFetch(`${options.baseUrl}${url}`, {
            method: 'patch',
            params: data.params,
            body: data.body
        }),
        put: (url: string, data: requestData) => useFetch(`${options.baseUrl}${url}`, {
            method: 'put',
            params: data.params,
            body: data.body
        }),
        delete: (url: string, data: requestData) => useFetch(`${options.baseUrl}${url}`, {
            method: 'delete',
            params: data.params,
        }),
   }
}