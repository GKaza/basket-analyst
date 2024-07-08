// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vue: {
    propsDestructure: true,
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@hypernym/nuxt-anime"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  css: ["@/assets/css/main.css"],
  runtimeConfig: {
    // The private keys which are only available server-side

    // Keys within public are also exposed client-side
    public: {
      apiBase: "https://api-live.euroleague.net/",
    },
  },
})
