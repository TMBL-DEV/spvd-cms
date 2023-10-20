// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi', '@nuxt/content', '@nuxt/ui', '@nuxtjs/color-mode'],
  content: {
    watch: false,
  },
  colorMode: {
    preference: 'light'
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
        path: "/hmr",
        clientPort: 80,
        port: 90,
      },
    },
  },
  runtimeConfig: {
    public: {
      strapiToken: process.env.STRAPI_API_TOKEN,
      strapiBaseUrl: process.env.STRAPI_URL,
    }
  },
  devtools: { enabled: true },
});
