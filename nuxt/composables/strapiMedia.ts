export const useBuildMediaUrl = (path: string) => {    
    return useRuntimeConfig().public.strapiBaseUrl  + path;
}