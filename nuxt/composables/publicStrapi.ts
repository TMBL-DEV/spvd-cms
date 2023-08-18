export const usePublicStrapi = () => {
    useStrapiAuth().setToken(useRuntimeConfig().public.strapiToken);
    return useStrapi();
}