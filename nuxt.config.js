import colors from 'vuetify/es5/util/colors'

const isDev = process.env.NODE_ENV !== 'production'

export default {
  modern: true,
  bridge: {
    nitro: true
  },
  auth: {
    persistence: 'local', // default
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction'
    },
    ssr: false // default
  },

  // Используем только `ssr`
  ssr: false,

  // Другие настройки:
  ...(isDev ? {} : { modern: 'client' }),

  // Global page headers
  head: {
    titleTemplate: '%s',
    title: 'WORSHIP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS
  css: [],

  // Plugins to run before rendering page
  plugins: [
    { src: '~/plugins/vue-plyr', mode: 'client' },
    { src: '~/plugins/TiptapVuetify', mode: 'client' },
    { src: '~/plugins/vue-youtube-embed.js', mode: 'client' }
  ],

  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCbqbD8YMtX8uoJHsEgwKk4UvYwLPODYk4',
          authDomain: 'oleksandr-3787c.firebaseapp.com',
          databaseURL: 'https://oleksandr-3787c-default-rtdb.europe-west1.firebasedatabase.app',
          projectId: 'oleksandr-3787c',
          storageBucket: 'oleksandr-3787c.appspot.com',
          messagingSenderId: '623016667362',
          appId: '1:623016667362:web:26fb4984975eff32d456bb',
          measurementId: 'G-816MXXE8YH'
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
          realtimeDb: true,
          messaging: true,
          performance: true,
          analytics: true,
          remoteConfig: true,
          hosting: true
        }
      }
    ]
  ],

  // Modules
  modules: [
    'vue-sweetalert2/nuxt'
  ],

  // Vuetify module configuration
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          background: colors.blueGrey.darken2,
          text1: colors.grey.lighten5,
          button1: colors.blueGrey.darken2,
          appbar: colors.blueGrey.darken3
        },
        light: {
          background: colors.blueGrey.lighten5,
          text1: colors.grey.darken4,
          button1: colors.blueGrey.lighten2,
          appbar: colors.blueGrey.lighten3
        }
      }
    },
    lang: {
      locales: { ua: { firstDayOfWeek: 1, weekdays: { shorthand: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'], longhand: ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'/ятниця", 'Субота', 'Неділя'] }, months: { shorthand: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'], longhand: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'] } } },
      current: 'ua'
    }
  },

  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  loading: {
    color: 'blue',
    height: '5px',
    throttle: 0
  }
}
