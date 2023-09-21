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
    <v-app-bar
      dark
      color="brown darken-3"
      class="my-2"
    >
      <v-toolbar-title class="col-6">
        Пісні
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        @click="showFilter = !showFilter"
      >
        <v-icon>{{ showFilter ? 'mdi-chevron-up' : 'mdi-filter' }}</v-icon>
      </v-btn>

      <v-btn
        icon
        @click="showSearch = !showSearch"
      >
        <v-icon>{{ showSearch ? 'mdi-chevron-up' : 'mdi-magnify' }}</v-icon>
      </v-btn>

      <template>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            scrollable
            max-width="300px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="brown darken-2"
                dark
                v-bind="attrs"
                v-on="on"
                @click="clearFilters()"
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
    </v-app-bar>
    <v-expand-transition>
      <div v-show="showFilter">
        <!--        Categories-->
        <v-row class="change_categories">
          <v-select-categories
            :selected="selected"
            style="z-index: 3"
            :options="categories"
            @select="sortCategory"
          />
        </v-row>
        <v-divider />

        <v-card-text class="flex flex-column">
          <v-item-group>
            <v-subheader>
              Пошук по першій літері назви пісні
              <v-chip
                v-if="startingLetter"
                class="ma-2"
                close
                color="indigo darken-3"
                outlined
                @click:close="startingLetter = ''"
              >
                {{ startingLetter }}
              </v-chip>
            </v-subheader>
            <v-item
              v-for="(item, i) in alphabet"
              :key="i"
              v-slot="{ toggle }"
            >
              <v-chip
                v-if="!startingLetter"
                active-class="teal lighten-3--text"
                @click="toggle"
              >
                <span @click="searchSongChart(item)">{{ item }}</span>
              </v-chip>
            </v-item>
          </v-item-group>
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-expand-transition>
      <div v-show="showSearch">
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
              icon="search"
              variant="solo"
              label="Пошук пісні"
              append-outer-icon="mdi-magnify"
              single-line
              hide-details
              @click:append-inner="onClick"
            />
          </v-card-text>
        </v-card>
      </div>
    </v-expand-transition>

    <client-only placeholder="Загрузка...">
      <v-card
        v-if="getSongs && getSongs.length"
        class="mx-auto"
        max-width="500"
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

      <div v-else-if="selected && getSongs.length === 0">
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
    vSelectCategories: () => import('~/components/vSelect.vue')
  },
  data: () => ({
    startingLetter: '',
    showSearch: false,
    showFilter: false,
    dialog: false,
    selectedLanguage: 'UA',
    onlanguagechange: [
      'UA',
      'RU',
      'EN'
    ],
    searchQuery: '',
    loaded: false,
    loading: false,
    selectedStar: [2],
    breadcrumbs: [
      {
        text: 'Головна',
        disabled: false,
        to: { name: 'index' },
        exact: true
      },
      {
        text: 'Пісні',
        disabled: true,
        href: 'songs',
        exact: true
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
    alphabet () {
      if (this.selectedLanguage === 'UA') {
        return [
          'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Є', 'Ж', 'З', 'И',
          'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р',
          'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'ь',
          'Ю', 'Я'
        ]
      } else if (this.selectedLanguage === 'RU') {
        return [
          'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И',
          'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
          'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
          'Э', 'Ю', 'Я'
        ]
      } else if (this.selectedLanguage === 'EN') {
        return [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
          'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
          'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
      } else {
        return [
          'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Є', 'Ж', 'З', 'И',
          'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р',
          'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'ь',
          'Ю', 'Я'
        ]
      }
    },
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
      if (this.paginateArray.length > 0) {
        return this.paginateArray[this.page - 1]
      }
      return []
    },
    paginateArray () {
      if (!this.filteredItems || this.filteredItems.length === 0) { return [] }
      const pageCount = Math.ceil(this.filteredItems.length / this.itemsPerPage)

      return Array.from({ length: pageCount }, (_, pageIndex) => {
        const start = pageIndex * this.itemsPerPage
        const end = start + this.itemsPerPage
        return this.filteredItems.slice(start, end)
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
      // return this.filteredSongs.filter((item) => {
      //   return item.nameSong.toLowerCase().includes(this.searchQuery.toLowerCase())
      // })

      // Фильтруем элементы массива на основе буквы и языка пользователя
      return this.filteredSongs.filter((item) => {
        const nameMatchesLetter = item.nameSong.toLowerCase().startsWith(this.searchQuery.toLowerCase())
        const languageMatches = item.language.toLowerCase().includes(this.selectedLanguage.toLowerCase())
        const nameMatchesFirstLetter = item.nameSong.toLowerCase().startsWith(this.startingLetter.toLowerCase())
        return nameMatchesLetter && languageMatches && nameMatchesFirstLetter
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
    searchSongChart (letter) {
      if (this.startingLetter !== '' && letter === this.startingLetter) {
        this.startingLetter = ''
      } else if (this.startingLetter === '' && letter !== this.startingLetter) {
        this.startingLetter = letter
      } else {
        this.startingLetter = letter
      }
    },
    clearFilters () {
      this.startingLetter = ''
    },
    songClick (id) {
      this.$router.push({ name: 'song', query: { song: id } })
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
