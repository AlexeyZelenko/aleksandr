import colors from 'vuetify/es5/util/colors'
const isDev = process.env.NODE_ENV !== 'production'

export default {
  auth: {
    persistence: 'local', // default
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction'
    },
    ssr: false // default
  },
  mode: 'development',
  ...(!isDev && {
    modern: 'client'
  }),
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'SONGS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  plugins: [
    { src: '~/plugins/vue-plyr', mode: 'client' },
    { src: '~/plugins/TiptapVuetify', mode: 'client' }
  ],

  components: true,

  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
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
          appId: '1:623016667362:web:26fb4984975eff32d456bb'
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

  modules: [
    [
      'vue-sweetalert2/nuxt',
      'vue-youtube',
      {
        confirmButtonColor: '#41b882',
        cancelButtonColor: '#ff7674'
      }
    ]
  ],
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      light: true,
      themes: {
        options: { customProperties: true },
        dark: {
          background: colors.blueGrey.darken2,
          text1: colors.grey.lighten5,

          button1: colors.blueGrey.darken2,
          button2: colors.blueGrey.lighten1,
          appbar: colors.blueGrey.darken3,
          appbar2: colors.blueGrey.darken2,

          color1: colors.blueGrey.darken1,
          color2: colors.blueGrey.darken2,
          color3: colors.blueGrey.darken3,
          color4: colors.blueGrey.darken4,
          color5: colors.blueGrey.lighten1
        },
        light: {
          background: colors.blueGrey.lighten5,

          button1: colors.blueGrey.lighten2,
          button2: colors.blueGrey.lighten2,
          appbar: colors.blueGrey.lighten3,
          appbar2: colors.blueGrey.lighten3,
          text1: colors.grey.darken4
        }
      }
    },
    lang: {
      locales: {
        // Здесь вы можете определить свой язык
        // Например, для французского языка:
        ua: {
          firstDayOfWeek: 1, // Первый день недели (1 для понедельника, 0 для воскресенья)
          weekdays: {
            shorthand: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
            longhand: [
              'Понеділок',
              'Вівторок',
              'Середа',
              'Четвер',
              "П'/ятниця",
              'Субота',
              'Неділя'
            ]
          },
          months: {
            shorthand: [
              'Січ',
              'Лют',
              'Бер',
              'Квіт',
              'Трав',
              'Черв',
              'Лип',
              'Серп',
              'Вер',
              'Жовт',
              'Лист',
              'Груд'
            ],
            longhand: [
              'Січень',
              'Лютий',
              'Березень',
              'Квітень',
              'Травень',
              'Червень',
              'Липень',
              'Серпень',
              'Вересень',
              'Жовтень',
              'Листопад',
              'Грудень'
            ]
          }
        }
        // Добавьте другие локали при необходимости
      },
      current: 'ua' // Установите текущий язык
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vuetify/lib', 'tiptap-vuetify'],
    /*
    ** Run ESLint on save
    */
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

  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    // Iconfonts for Vuetify. You need to leave only which one you use
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' },
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.4.95/css/materialdesignicons.min.css' }
  ],

  loading: {
    color: 'blue',
    height: '5px',
    throttle: 0
  }
}
