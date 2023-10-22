export default defineEventHandler(async (event) => {
    const path = event.path.replace("/media", "");
    
    sendRedirect(event, useRuntimeConfig().public.strapiBaseUrl + path);
    return 'hehehehe'
});