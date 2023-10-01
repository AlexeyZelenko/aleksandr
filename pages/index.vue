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
      <v-toolbar-title class="col-3">
        Пісні
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        @click="showFilter = !showFilter"
      >
        <v-badge
          :content="filteredLength"
          :value="filteredLength"
          color="green"
          overlap
        >
          <v-icon>{{ showFilter ? 'mdi-chevron-up' : 'mdi-filter' }}</v-icon>
        </v-badge>
      </v-btn>

      <v-btn
        icon
        @click="showSearch = !showSearch"
      >
        <v-badge
          :value="searchQuery"
          color="green"
          overlap
        >
          <v-icon>{{ showSearch ? 'mdi-chevron-up' : 'mdi-magnify' }}</v-icon>
        </v-badge>
      </v-btn>

      <template>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                @click="sortDateCreated()"
              >
                <v-icon>{{ showDateCreated ? 'mdi-sort-clock-ascending-outline' : 'mdi-sort-clock-descending-outline' }}</v-icon>
              </v-btn>
            </template>
            <!--            <v-list>-->
            <!--              <v-list-item-->
            <!--                v-for="(item, index) in items"-->
            <!--                :key="index"-->
            <!--              >-->
            <!--                <v-list-item-title-->
            <!--                  @click="sortDateCreated(item)"-->
            <!--                >-->
            <!--                  <v-icon>{{item.icon}}</v-icon>-->
            <!--                  {{ item.title }}-->
            <!--                </v-list-item-title>-->
            <!--              </v-list-item>-->
            <!--            </v-list>-->
          </v-menu>
        </div>
      </template>

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
    items: [
      { title: 'Останні додані', icon: 'mdi-clock', value: 'last' },
      { title: 'За тиждень', icon: 'mdi-calendar-week', value: 'week' },
      { title: 'За місяць', icon: 'mdi-calendar-month', value: 'month' },
      { title: 'За рік', icon: 'mdi-calendar-year', value: 'year' },
      { title: 'За все время', icon: 'mdi-calendar', value: 'all' }
    ],
    showDateCreated: false,
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
    breadcrumbs: [
      {
        text: 'Пісні',
        disabled: false,
        to: { name: 'index' },
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
    filteredLength () {
      const hasStartingLetter = Boolean(this.startingLetter)
      const isAllSelected = this.selected === 'Всі'
      const isCategorySelected = this.selected === null

      return (hasStartingLetter && !isAllSelected && !isCategorySelected) ? 2
        : (!hasStartingLetter && !isAllSelected && !isCategorySelected) ? 1
          : (hasStartingLetter && (isAllSelected || isCategorySelected)) ? 1
            : (!hasStartingLetter && (isAllSelected || isCategorySelected)) ? 0
              : 0
    },
    alphabet () {
      const alphabets = {
        UA: [
          'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Є', 'Ж', 'З', 'И',
          'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р',
          'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'ь',
          'Ю', 'Я'
        ],
        RU: [
          'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И',
          'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
          'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь',
          'Э', 'Ю', 'Я'
        ],
        EN: [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
          'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
          'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
      }

      return alphabets[this.selectedLanguage] || alphabets.UA
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
      if (this.sortedSongs?.length > 0) {
        return this.sortedSongs
      } else if (this.SONGS?.length) {
        if (!this.selected || this.selected === 'Всі') {
          return this.SONGS
        } else {
          return this.SONGS.filter(song => song.category === this.selected)
        }
      } else {
        return []
      }
    },
    filteredItems () {
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
    sortDateCreated () {
      this.showDateCreated = !this.showDateCreated
      this.filteredSongs.sort((a, b) => {
        if (this.showDateCreated) {
          return new Date(b.createdAt) - new Date(a.createdAt)
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt)
        }
      })
    },
    searchSongChart (letter) {
      this.startingLetter = this.startingLetter === letter ? '' : letter
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
