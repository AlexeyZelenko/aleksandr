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
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!--      Кнопка правого меню-->
      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="rightDrawer = !rightDrawer"-->
      <!--      >-->
      <!--        <v-icon>mdi-menu</v-icon>-->
      <!--      </v-btn>-->
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
      style="background-color: #3E2723"
      :absolute="!fixed"
      app
    >
      <v-row
        style="margin: 5px"
        align="center"
        justify="space-around"
      >
        &copy; {{ new Date().getFullYear() }}
      </v-row>
    </v-footer>

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
        >
          <v-icon
            aria-hidden="true"
          >mdi-instagram</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://www.facebook.com/bv.ck.ua"
        >
          <v-icon
            aria-hidden="true"
          >mdi-facebook</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://twitter.com/bv_church"
        >
          <v-icon
            aria-hidden="true"
          >mdi-twitter</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://www.youtube.com/@bv.ck.ua.church"
        >
          <v-icon
            aria-hidden="true"
          >mdi-youtube</v-icon>
        </a>
        <a
          style="text-decoration: none"
          href="https://bv.ck.ua/"
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
export default {
  data () {
    return {
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
          icon: 'mdi-book-open-variant',
          title: 'Пісні',
          to: '/songs'
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
        }
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
      title: 'БЛАГА ВІСТЬ'
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
</style>
