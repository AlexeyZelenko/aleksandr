# Worship

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Deploy
```bash

#Full deployment to Firebase:

$yarn deploy firebase

#Deploy to Firebase Hosting:
$yarn deploy hosting


##Залежності
#Основні залежності проєкту включають:

#@nuxt/bridge: перехідний модуль для використання функцій Nuxt 3 у проєктах Nuxt 2.
#@nuxtjs/axios: для виконання HTTP запитів.
#@nuxtjs/firebase: інтеграція з Firebase.
#@nuxtjs/pwa: підтримка PWA для забезпечення офлайн-роботи.
#@vee-validate/nuxt: для валідації форм.
#vue-sweetalert2 та nuxt-sweetalert2: для інтеграції з SweetAlert2.
#tiptap-vuetify: текстовий редактор з підтримкою Vuetify.
#vue-youtube-embed: інтеграція YouTube-відео.
#vuexfire: для інтеграції Vuex з Firebase.

##Dev Залежності
#@nuxtjs/eslint-config: ESLint конфігурація для Nuxt.
#sass та sass-loader: для підтримки SCSS стилів.
#babel-eslint, eslint, eslint-plugin-nuxt: для забезпечення якості коду.
#deepmerge: для глибокого об'єднання об'єктів.

##Інструкції для розробників
Clone this repository.
Run the yarn install command to install all dependencies.
Use yarn dev to run a local server or yarn build to build the project.

##Структура проєкту
pages/: основні сторінки додатку.
components/: багаторазові Vue компоненти.
plugins/: плагіни для розширення можливостей Nuxt.
assets/: зображення, стилі та інші статичні ресурси.
static/: статичні файли, які доступні напряму через корінь сайту.

##Налаштування залежностей
#Проєкт використовує кілька ключових залежностей:

@nuxt/bridge: забезпечує сумісність з Nuxt 3.
Firebase: підтримка через @nuxtjs/firebase, firebase, та firebase-admin.
Vuetify: забезпечення адаптивності та сучасного UI за допомогою компонентів.
Tiptap: текстовий редактор для покращеної інтерактивності.
Проєкт також включає залежності для підтримки PWA (@nuxtjs/pwa) та axios для роботи з API-запитами. Для контролю якості та забезпечення безпеки коду, використовуються ESLint і Babel.
