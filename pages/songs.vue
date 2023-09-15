<template>
  <div>
    <template>
      <div>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
    </template>
    <div>Пісні</div>
    <v-card
      class="mx-auto"
      color="grey-lighten-3"
      max-width="500"
    >
      <v-card-text>
        <v-text-field
          v-model="searchQuery"
          :loading="loading"
          density="compact"
          variant="solo"
          label="Пошук пісні"
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
        :selected="selected"
        style="z-index: 3"
        :options="categories"
        @select="sortCategory"
      />
    </v-row>

    <client-only placeholder="Загрузка...">
      <v-card
        v-if="filteredItems && filteredItems.length"
        class="mx-auto"
        max-width="500"
      >
        <v-list two-line>
          <v-list-item-group
            v-model="selectedStar"
            active-class="pink--text"
            multiple
          >
            <template v-for="(item, index) in filteredItems">
              <v-list-item
                :key="item.nameSong"
                @click="songClick(item.id)"
              >
                <template v-slot:default="{}">
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
                      color="yellow darken-3"
                      @click.stop="editSong(item.id)"
                    >
                      mdi-pencil
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < filteredItems.length - 1"
                :key="index"
              />
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <div v-else-if="selected && filteredItems.length === 0">
        <p>За вашим запросом нічого не знайдено...</p>
      </div>
      <div v-else class="text-center" style="min-height: 400px;">
        <v-container style="height: 400px;">
          <v-row
            class="fill-height"
            align-content="center"
            justify="center"
          >
            <v-col
              class="text-subtitle-1 text-center"
              cols="12"
            >
              Отримання ваших файлів
            </v-col>
            <v-progress-linear
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="6"
            />
          </v-row>
        </v-container>
      </div>

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
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    vSelect: () => import('~/components/vSelect.vue')
  },
  data: () => ({
    searchQuery: '',
    loaded: false,
    loading: false,
    selectedStar: [2],
    breadcrumbs: [
      {
        text: 'Головна',
        disabled: false,
        href: '/'
      },
      {
        text: 'Пісні',
        disabled: true,
        href: 'songs'
      }
    ],
    page: 1,
    itemsPerPage: 1
  }),
  computed: {
    ...mapGetters([
      'SONGS',
      'User_Entrance',
      'USER_ID'
    ]),
    categories () {
      return this.$store.state.categories.categories
    },
    selected () {
      return this.$store.state.selected
    },
    sortedSongs () {
      return this.$store.state.sortedSongs
    },
    getSongs () {
      return this.paginateArray[this.page - 1]
    },
    paginateArray () {
      if (!this.filteredSongs || this.filteredSongs.length === 0) { return [] }
      const pageCount = Math.ceil(this.filteredSongs.length / this.itemsPerPage)

      return Array.from({ length: pageCount }, (_, pageIndex) => {
        const start = pageIndex * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredSongs.slice(start, end)
      })
    },
    filteredSongs () {
      // console.log('sortedSongs+SONGS', this.sortedSongs, this.SONGS)
      if (this.sortedSongs?.length > 0) {
        return this.sortedSongs
      } else if (this.SONGS?.length && this.selected === 'Всі') {
        return this.SONGS
      } else if (this.SONGS?.length && this.selected && this.selected !== 'Всі') {
        return this.SONGS.filter(song => song.category === this.selected)
      } else if (this.SONGS?.length && !this.selected) {
        return this.SONGS
      } else {
        return []
      }
    },
    filteredItems () {
      // Фильтруем элементы массива на основе запроса пользователя
      return this.filteredSongs.filter((item) => {
        return item.nameSong.toLowerCase().includes(this.searchQuery.toLowerCase())
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
    editSong (id) {
      this.$router.push({ name: 'editSong', query: { song: id } })
    },
    sortCategory (category) {
      this.sortByCategories(category)
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
