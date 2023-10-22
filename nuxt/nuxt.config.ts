// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/strapi',
        '@nuxt/content',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        '@nuxt/image',
        'nuxt-security',
    ],
    content: {
        watch: false,
    },
    security: {
        headers: {
            crossOriginEmbedderPolicy:
                process.env.NODE_ENV === 'development'
                    ? 'unsafe-none'
                    : 'require-corp',
            contentSecurityPolicy: {
                'base-uri': ["'self'"],
                'font-src': ["'self'", 'https:', 'data:'],
                'form-action': ["'self'"],
                'frame-ancestors': ["'self'"],
                'img-src': ["'self'", 'data:', '*'],
                'object-src': ["'none'"],
                'script-src-attr': ["'none'"],
                'style-src': ["'self'", 'https:', "'unsafe-inline'"],
                'upgrade-insecure-requests': true,
            },
        },
        csrf: true,
    },
    colorMode: {
        preference: 'light',
    },
    strapi: {
        url: process.env.STRAPI_URL,
        version: 'v4',
        cookie: {},
        cookieName: 'strapi_jwt',
    },
    vite: {
        server: {
            hmr: {
                path: '/hmr',
                clientPort: 80,
                port: 90,
            },
        },
    },
    runtimeConfig: {
        strapiToken: process.env.STRAPI_API_TOKEN,
        strapiBaseUrl: process.env.STRAPI_URL,
        public: {
            strapiBaseUrl: process.env.PUBLIC_STRAPI_URL,
        },
    },
    devtools: { enabled: true },
});
