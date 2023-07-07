// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:false,
    css: [
        "@egjs/vue3-flicking/dist/flicking.css",
        "@egjs/flicking-plugins/dist/flicking-plugins.css",
        "billboard.js/dist/theme/graph.css",
        "@egjs/vue3-view3d/css/view3d-bundle.css"
    ],
    modules: [
        '@pinia/nuxt',
    ],
    vite: {
        define: {
          "process.env.DEBUG": true,
        },
    },
    
})
