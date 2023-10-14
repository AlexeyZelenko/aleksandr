<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      style="background-color: #3E2723"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      style="background-color: #3E2723"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon
        style="margin: 10px"
        @click="home"
      >
        mdi-home
      </v-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!--      Зміна мови-->
      <template>
        <v-row v-if="showlanguage" justify="center">
          <v-dialog
            v-model="dialog"
            scrollable
            max-width="300px"
          >
            <template v-slot:activator="{ on, attrs }">
              <!--              Додати очистку фільтрів при переході на іншу мову-->
              <!--              @click="clearFilters()"-->
              <v-btn
                color="brown darken-2"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{ selectedLanguage }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Вибрати мову пісень</v-card-title>
              <v-divider />
              <v-card-text style="height: 200px;">
                <v-radio-group
                  v-model="selectedLanguage"
                  column
                >
                  <v-radio
                    label="Українська"
                    value="UA"
                    @click="dialog = false"
                  />
                  <v-radio
                    label="Російська"
                    value="RU"
                    @click="dialog = false"
                  />
                  <v-radio
                    label="Англійська"
                    value="EN"
                    @click="dialog = false"
                  />
                </v-radio-group>
              </v-card-text>
              <v-divider />
            </v-card>
          </v-dialog>
        </v-row>
      </template>

      <!--            Вход в Админку-->
      <v-btn
        v-if="GET_ADMIN_ENTRANCE"
        class="ma-2"
        outlined
        small
        style="color: white; z-index: 102"
        @click="adminPlusLogin"
      >
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>

      <!--ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
      <div style="margin: 5px">
        <v-btn
          v-if="!User_Entrance"
          rounded
          style="background-color: #795548; color: white; position: relative; z-index: 10000;"
          @click="signInWithGoogle"
        >
          Вхід
        </v-btn>
      </div>
      <!--Отображение пользователя-->
      <div style="margin: 5px; z-index: 102; cursor: pointer">
        <div
          v-if="User_Entrance"
        >
          <v-container
            fluid
          >
            <v-row justify="center">
              <v-menu
                bottom
                min-width="200px"
                rounded
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    x-large
                    v-on="on"
                  >
                    <v-avatar color="brown darken-1">
                      <v-icon dark>
                        mdi-account-circle
                      </v-icon>
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-content class="justify-center">
                    <div
                      v-if="User_Entrance"
                      class="mx-auto text-center"
                    >
                      <slot>
                        <img
                          id="user-pic"
                          style="cursor: pointer"
                          :src="(getProfilePicUrl)"
                          alt=""
                        >
                      </slot>
                      <h3>{{ getUserName }}</h3>
                      <p class="text-caption mt-1">
                        {{ getUserEmail }}
                      </p>
                      <v-divider class="my-3" />
                      <v-btn
                        depressed
                        rounded
                        text
                        @click="goToUserPage()"
                      >
                        Кабінет
                      </v-btn>
                      <v-divider class="my-3" />
                      <v-btn
                        depressed
                        rounded
                        text
                        @click="logout"
                      >
                        Вийти
                      </v-btn>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </v-row>
          </v-container>
        </div>
        <div
          v-if="User_Entrance"
          id="user-name"
        >
          {{ getUserName }}
        </div>
      </div>
    </v-app-bar>
    <v-main class="cover">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      style="background-color: #37474f"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      style="background-color: #263238"
      :absolute="!fixed"
      app
    >
      <v-row
        style="margin: 5px"
        align="center"
        justify="space-around"
      >
        &copy; {{ new Date().getFullYear() }}
        <a
          style="text-decoration: none"
          href="https://www.instagram.com/bv.ck.ua"
          target="_blank"
        >
          <v-icon
            aria-hidden="true"
          >mdi-instagram</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://www.facebook.com/bv.ck.ua"
          target="_blank"
        >
          <v-icon
            aria-hidden="true"
          >mdi-facebook</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://twitter.com/bv_church"
          target="_blank"
        >
          <v-icon
            aria-hidden="true"
          >mdi-twitter</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://www.youtube.com/@bv.ck.ua.church"
          target="_blank"
        >
          <v-icon
            aria-hidden="true"
          >mdi-youtube</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://bv.ck.ua/"
          target="_blank"
        >
          <v-icon
            aria-hidden="true"
          >mdi-web</v-icon>
        </a>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      showlanguage: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Головна',
          to: '/'
        },
        {
          icon: 'mdi-plus',
          title: 'Додати',
          to: '/addSong'
        },
        {
          icon: 'mdi-calendar',
          title: 'Календар',
          to: '/plannerCalendar'
        },
        {
          icon: 'mdi-account-group',
          title: 'Служителі',
          to: '/users'
        }
        // {
        //   icon: 'mdi-import-variant',
        //   title: 'Імпорт з тексту',
        //   to: '/addSongFromText'
        // }
      ],
      items2: [
        {
          icon: 'mdi-account',
          title: 'admin',
          to: '/admin'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Worship',
      onlanguagechange: [
        'UA',
        'RU',
        'EN'
      ],
      selectedLanguage: 'UA',
      dialog: false
    }
  },
  computed: {
    ...mapGetters([
      'GET_ADMIN_ENTRANCE',
      'User_Entrance'
    ]),
    getUserName () {
      return this.$fireAuthObj().currentUser.displayName
    },
    getUserEmail () {
      return this.$fireAuthObj().currentUser.email
      // return this.$fireStoreObj().collection('users').doc(email).get()
    },
    getProfilePicUrl () {
      return this.$fireAuthObj().currentUser.photoURL || '@/assets/images/profile_placeholder.png'
    }
  },
  methods: {
    home () {
      this.$router.push('/')
    },
    goToUserPage () {
      this.$router.push('user')
    },
    async signInWithGoogle () {
      try {
        await this.$store.dispatch('signInWithGoogle')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Ошибка входа Google', e)
      }
    },
    adminPlusLogin () {
      if (this.GET_ADMIN_ENTRANCE) {
        this.$router.push('admin')
      } else {
        this.$router.push('index')
      }
    },
    async logout () {
      await this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
  .cover {
    background-image: url("../static/cover1.jpg");
    background-size: cover;
    background-position: 0 0;
    background-repeat: no-repeat;
    padding-top: 80px;
    padding-bottom: 80px;
    min-height: 250px;
    text-align: center;
    clear: both;
  }

  #user-pic {
    top: -3px;
    position: relative;
    display: inline-block;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    background-size: 40px;
    border-radius: 20px;
  }

  #user-name {
    display: none;
    font-size: 12px;
    line-height: normal;
    padding-right: 5px;
    padding-left: 5px;
  }
</style>
