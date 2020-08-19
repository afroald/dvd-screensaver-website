/* eslint-disable object-curly-newline */

import pkg from './package';

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'DVD Screensaver',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'msapplication-TileColor', content: '#fdee50' },
      {
        property: 'og:image',
        content: 'https://dvdscreensaver.online/og-image.png',
      },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1080' },
      { property: 'og:image:height', content: '741' },
      {
        name: 'google-site-verification',
        content: 'mlIKHJnEzOjgkVw3Ta3vNbjDTYB61WMlQH_qAY6BI4A',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#fdee50' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['nuxt-matomo', { matomoUrl: '//piwik.hacquebordbuckles.nl/', siteId: 14 }],
    ['@nuxtjs/google-analytics', { id: 'UA-140404095-1' }],
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  serverMiddleware: ['~/middleware/request-logger'],
};
