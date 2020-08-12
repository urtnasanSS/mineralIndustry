import path from 'path'
import fs from 'fs'
const envJson = require('./env')
const env = Object.assign({}, envJson.default, envJson[process.env.NODE_ENV.trim()])
const server = {
  port: env.localPort,
  host: env.localUrlcat
}
export default {
  mode: 'universal',
  env: { baseUrl: env.serverUrl + ':' + env.serverPort + '/' },
  server,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Уул уурхай, хүнд үйлдвэрийн яам',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: 'Уул уурхай, хүнд үйлдвэрийн яам , Уул уурхай, хүнд үйлдвэрийн яамны мэдээлэл' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/icon.ico'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i&display=swap&subset=cyrillic,cyrillic-ext,latin-ext'
      }
    ],
    script: [
      { src: '/tinymce4.7.5/tinymce.min.js', type: 'text/javascript' },
      { src: 'https://kit.fontawesome.com/9e7d4f433d.js', type: 'text/javascript', charset: 'utf-8', crossorigin: 'anonymous' },
      { src: 'http://maps.google.com/maps/api/js?key=AIzaSyB5HisJtyDouxKwsqJ0BwSMSy9Fpi7sr20&libraries=drawing,geometry,places&language=mn', async: true, defer: true, type: 'text/javascript' },
      { src: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js', async: true, defer: true, type: 'text/javascript' }
    ]
  },
  router: {
    linkActiveClass: 'active-link',
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '@/assets/css/style.scss', lang: 'scss' },
    { src: 'swiper/dist/css/swiper.css' },
    '~/assets/css/fontawesome/css/all.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/c-components.js',
    { src: '@/plugins/route' },
    '@/plugins/breadcrumb.js',
    '@/plugins/element-ui',
    '@/plugins/vue-cropper',
    { src: '@/plugins/tinyMCE.js', ssr: false },
    { src: '@/plugins/vue-marquee.js', ssr: false },
    { src: '@/plugins/vue-swiper.js', ssr: false },
    { src: '@/plugins/amCharts.js', ssr: false },
    { src: '@/plugins/vue2editor.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      lazy: true,
      locales: [
        {
          name: 'Монгол',
          code: 'mn',
          iso: 'mn-MN',
          file: 'mn-MN.js'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en-US.js'
        }
      ],
      loadLanguagesAsync: true,
      defaultLocale: 'mn',
      langDir: 'lang/'
    }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
