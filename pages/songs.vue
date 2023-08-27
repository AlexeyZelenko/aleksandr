<template>
  <div>
    <div>Songs</div>
    <v-card
      class="mx-auto"
      color="grey-lighten-3"
      max-width="500"
    >
      <v-card-text>
        <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="Search templates"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="onClick"
        />
      </v-card-text>
    </v-card>

    <!--        Categories-->
    <v-row class="change_categories">
      <v-select
        :key="name"
        :options="categories"
        :selected="selected"
        style="z-index: 3"
        @select="sortByCategories"
      />
    </v-row>

    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink--text"
          multiple
        >
          <template v-for="(item, index) in filteredSongs">
            <v-list-item :key="item.nameSong">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.nameSong" />

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.language"
                  />

                  <v-list-item-subtitle v-text="item.singer" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text v-text="item.tonality" />

                  <v-icon
                    v-if="!active"
                    color="grey lighten-1"
                  >
                    mdi-star-outline
                  </v-icon>

                  <v-icon
                    v-else
                    color="yellow darken-3"
                  >
                    mdi-star
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider
              v-if="index < items.length - 1"
              :key="index"
            />
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    loaded: false,
    loading: false,
    selected: [2],
    items: [
      {
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
        title: 'Ali Connors'
      },
      {
        action: '2 hr',
        headline: 'Summer BBQ',
        subtitle: 'Wish I could come, but I\'m out of town this weekend.',
        title: 'me, Scrott, Jennifer'
      },
      {
        action: '6 hr',
        headline: 'Oui oui',
        subtitle: 'Do you have Paris recommendations? Have you ever been?',
        title: 'Sandra Adams'
      },
      {
        action: '12 hr',
        headline: 'Birthday gift',
        subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        title: 'Trevor Hansen'
      },
      {
        action: '18hr',
        headline: 'Recipe to try',
        subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Britta Holt'
      }
    ]
  }),
  computed: {
    ...mapGetters([
      'SONGS',
      'User_Entrance',
      'USER_ID'
    ]),
    ...mapGetters([
      'categories',
      'selected',
      'sortedSongs'
    ]),
    // categories () {
    //   return this.$store.state.categories.categories
    // },
    // selected () {
    //   return this.$store.state.categories.selected
    // },
    // sortedSongs () {
    //   return this.$store.state.categories.sortedSongs
    // },
    filteredSongs () {
      // console.log('sortedSongs+SONGS', this.sortedSongs, this.SONGS)
      if (this.sortedSongs.length && this.SONGS.length) {
        return this.sortedSongs
      } else {
        const sortSongs = this.SONGS.filter(item => item.category === 'Поклоніння')
        return sortSongs.sort((a, b) => a.sort > b.sort ? 1 : -1)
      }
    }
  },
  mounted () {
    this.USER_ID_ACTIONS()
    this.userEntrance()
    this.bindCountDocument()
    this.initialize()
  },
  methods: {
    ...mapActions([
      'bindCountDocument',
      'userEntrance',
      'USER_ID_ACTIONS'
    ]),
    initialize () {
      this.songs = this.SONGS
    },
    songClick (id) {
      this.$router.push({ name: 'song', query: { song: id } })
    },
    sortByCategories (category) {
      this.$store.dispatch('categories/sortByCategories', category)
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
.change_categories {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
