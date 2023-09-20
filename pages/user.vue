<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card>
      <v-toolbar
        color="purple"
        dark
        flat
        prominent
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
              {{ tab.name }}
              <v-icon :v-icon="tab.icon" />
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
          <v-card flat>
            <v-card-title class="text-h5">
              An awesome title
            </v-card-title>
            <v-card-text>
              <p>
                Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
              </p>

              <p>
                Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
              </p>

              <p class="mb-0">
                Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-title class="text-h5">
              An even better title
            </v-card-title>
            <v-card-text>
              <p>
                Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
              </p>

              <p class="mb-0">
                Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
              </p>
            </v-card-text>
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
      { name: 'Favorite', icon: 'mdi-heart' },
      { name: 'Albums', icon: 'mdi-album' },
      { name: 'Artists', icon: 'mdi-account' }
    ]
  }),
  computed: {
    ...mapGetters([
      'SONGS',
      'User_Entrance',
      'USER_ID',
      'infoUser'
    ]),
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
