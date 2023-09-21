<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card>
      <v-toolbar
        color="brown darken-3"
        flat
      >
        <template v-slot:extension>
          <v-tabs
            v-model="tabs"
            centered
          >
            <v-tab
              v-for="(tab, index) in tabsList"
              :key="index"
            >
              <p class="mx-2">
                <v-icon>{{ tab.icon }}</v-icon>
              </p>
              <p>{{ tab.name }}</p>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card
            v-if="getSongs && getSongs.length"
            class="mx-auto"
            max-width="500"
            flat
          >
            <v-list
              subheader
              two-line
            >
              <v-list-item
                v-for="item in getSongs"
                :key="item.id"
                @click="songClick(item.id)"
              >
                <v-list-item-icon>
                  <v-icon>mdi-music</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.nameSong" />

                  <v-list-item-subtitle v-text="item.category" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="songClick(item.id)">
                    <v-icon color="grey lighten-1">
                      mdi-information
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider inset />
            </v-list>
          </v-card>
          <v-card
            v-else
            class="mx-auto"
            max-width="500"
            flat
          >
            <v-card-title class="text-h5">
              Немає вибраних пісень
            </v-card-title>
          </v-card>
          <div
            v-if="paginateArray.length > 1"
            class="text-center pa-10"
          >
            <v-pagination
              v-model="page"
              :length="paginateArray.length"
              circle
            />
          </div>
        </v-tab-item>
        <v-tab-item>
          <v-card
            class="mx-auto"
            width="256"
            tile
          >
            <v-list>
              <v-list-item>
                <v-list-item-avatar class="mx-auto">
                  <v-img :src="(getProfilePicUrl)" />
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{ getUserName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ getUserEmail }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'User',
  data: () => ({
    breadcrumbs: [
      {
        text: 'Головна',
        disabled: false,
        exact: true,
        to: { name: 'index' }
      },
      {
        text: 'Користувач',
        disabled: true
      }
    ],
    page: 1,
    itemsPerPage: 1,
    tabs: null,
    tabsList: [
      { name: 'Вибране', icon: 'mdi-heart' },
      { name: 'Налаштуваня', icon: 'mdi-account' }
    ]
  }),
  computed: {
    ...mapGetters([
      'SONGS',
      'User_Entrance',
      'USER_ID',
      'infoUser'
    ]),
    getUserName () {
      return this.$fireAuthObj().currentUser.displayName
    },
    getUserEmail () {
      return this.$fireAuthObj().currentUser.email
    },
    getProfilePicUrl () {
      return this.$fireAuthObj().currentUser.photoURL || '@/assets/images/profile_placeholder.png'
    },
    favoriteSongs () {
      if (!this.infoUser?.listFavoriteSongs?.length) { return [] }
      const array = []
      this.SONGS.forEach((song) => {
        if (this.infoUser.listFavoriteSongs.includes(song.id)) {
          array.push(song)
        }
      })
      return array
    },
    getSongs () {
      if (this.paginateArray.length > 0) {
        return this.paginateArray[this.page - 1]
      }
      return []
    },
    paginateArray () {
      if (!this.favoriteSongs || this.favoriteSongs.length === 0) { return [] }
      const pageCount = Math.ceil(this.favoriteSongs.length / this.itemsPerPage)

      return Array.from({ length: pageCount }, (_, pageIndex) => {
        const start = pageIndex * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.favoriteSongs.slice(start, end)
      })
    }
  },
  mounted () {
    this.userEntrance()
    this.bindCountDocument()
  },
  methods: {
    ...mapActions([
      'bindCountDocument',
      'userEntrance',
      'sortByCategories'
    ]),
    songClick (id) {
      this.$router.push({ name: 'song', query: { song: id } })
    },
    onClick () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  }
}
</script>

<style scoped>

</style>
