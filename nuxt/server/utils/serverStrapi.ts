type strapiFetchOptions = {
    params: Record<string, any>;
    token: string;
    baseUrl: string;
};

export const useStrapiFetch = async <T = unknown>(
    entity: string,
    options: strapiFetchOptions = {
        params: {},
        token: useRuntimeConfig().public.strapiToken,
        baseUrl: useRuntimeConfig().public.strapiBaseUrl,
    }
) => {
    const url = `http://strapi/api/${entity}`;
    const params = new URLSearchParams();
    const response = await fetch(url + params, {
        headers: {
            Authorization: `Bearer ${options.token}`,
        },
    });    

    const data: T|null = await response.json()
    
    return data; 
};
