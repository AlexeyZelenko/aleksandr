<template>
  <div class="song-card">
    <v-breadcrumbs v-if="song?.nameSong" :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card class="mx-auto my-12 pa-4" max-width="980" color="background">
      <v-card-title>
        <span class="text1--text px-1 font-weight-bold">{{ song.nameSong }}</span>
        <v-spacer />
        <div v-if="User_Entrance" class="icon-container">
          <v-btn icon class="icon-button" @click.stop="toggleFavorite(song.id)">
            <v-icon :color="song.activeStar ? 'yellow darken-3' : 'grey lighten-1'">
              {{ song.activeStar ? 'mdi-heart' : 'mdi-heart-outline' }}
            </v-icon>
          </v-btn>
          <v-btn icon outlined color="indigo" class="icon-button" @click.stop="copySongId(song.id)">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <v-divider class="mx-4" />

      <!-- Вкладки с текстом песни -->
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel v-for="(item, index) in song.blocks" :key="index">
          <v-hover>
            <template v-slot:default="{ hover }">
              <div :class="`elevation-${hover ? 24 : 8}`" class="mx-auto transition-swing">
                <v-expansion-panel-header>
                  <strong style="color: orangered">{{ item.name }}</strong>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-container class="fill-height pa-0">
                    <!-- Используем div с поддержкой изменения размера шрифта -->
                    <div
                      class="formatted-text"
                      :style="{ fontSize: fontSize + 'px', lineHeight: lineHeight }"
                    >
                      <span v-for="(line, index) in item.content.split('\n')" :key="index">
                        {{ line }}<br>
                      </span>
                    </div>
                  </v-container>
                </v-expansion-panel-content>
              </div>
            </template>
          </v-hover>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider class="mx-4 px-4" />

      <Youtube-video v-if="song && song.youtubeLink?.length > 0" :links="song.youtubeLink" />

      <!-- Управление вкладками: открытие/закрытие всех вкладок -->
      <v-row class="my-4 align-center justify-center">
        <v-switch
          v-model="allPanelsOpen"
          label="Відкрити/Закрити всі вкладки"
          @change="toggleAllPanels"
        />
      </v-row>

      <v-card-actions v-if="User_Entrance">
        <v-btn color="orange" text outlined @click.stop="editSong()">
          <v-icon left>
            mdi-pencil
          </v-icon> Редагувати
        </v-btn>
        <v-divider vertical />
        <v-btn color="orange" text outlined @click.stop="removeSong()">
          <v-icon left>
            mdi-delete
          </v-icon> Видалити
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Изменение размера шрифта -->
    <v-container class="text-center">
      <v-row>
        <v-col>
          <v-btn icon @click="decreaseFontSize">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn icon @click="resetFontSize">
            <v-icon>mdi-format-size</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn icon @click="increaseFontSize">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div :style="{ fontSize: fontSize + 'px' }">
        Змінити розмір шрифту тексту..
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Swal from 'sweetalert2'

export default {
  layout: 'back_catalog',
  name: 'SongInformation',
  components: {
    'Youtube-video': () => import('~/components/youtube.vue')
  },
  data () {
    return {
      fontSize: 18, // Начальный размер шрифта
      lineHeight: '1.4', // Межстрочный интервал для улучшенного отображения текста
      panel: [], // Текущие открытые вкладки
      activeStar: false,
      readonly: true,
      loading: false,
      selection: 1,
      date: null,
      trip: {
        start: null
      },
      show: false,
      allPanelsOpen: false // Состояние переключателя для открытия/закрытия всех вкладок
    }
  },
  computed: {
    ...mapGetters(['SONGS', 'infoUser', 'User_Entrance']),
    breadcrumbs () {
      return [
        {
          text: 'Пісні',
          disabled: false,
          exact: true,
          to: { name: 'index' }
        },
        {
          text: this.song.nameSong,
          disabled: true,
          to: { name: 'songInformation' }
        }
      ]
    },
    song () {
      let result = {}
      this.SONGS.map((item) => {
        if (item.id === this.$route.query.song) {
          result = item
        }
      })
      result.activeStar = !!(this.infoUser.listFavoriteSongs && this.infoUser.listFavoriteSongs.includes(result.id))
      return result
    }
  },
  mounted () {
    this.none() // Все вкладки закрыты по умолчанию
  },
  methods: {
    ...mapActions(['bindCountDocument', 'deleteSong', 'ADD_TO_FAVORITE', 'REMOVE_FROM_FAVORITE']),
    ...mapMutations(['SET_EVENT_CALENDAR']),
    all () {
      if (this.song.blocks) {
        this.panel = this.song.blocks.map((_, index) => index)
      }
    },
    none () {
      this.panel = []
    },
    toggleFavorite (id) {
      if (this.song.activeStar) {
        this.REMOVE_FROM_FAVORITE(id)
      } else {
        this.ADD_TO_FAVORITE(id)
      }
      this.song.activeStar = !this.song.activeStar
    },
    editSong () {
      this.$router.push({ name: 'editSong', query: { song: this.song.id } })
    },
    copySongId (id) {
      const el = document.createElement('textarea')
      el.value = id
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)

      Swal.fire({
        icon: 'success',
        position: 'top-end',
        type: 'success',
        title: 'ID пісні скопійовано!',
        showConfirmButton: false,
        timer: 2000
      })
    },
    removeSong () {
      this.deleteSong(this.song.id)
      this.$router.push({ name: 'index' })
    },
    increaseFontSize () {
      this.fontSize += 2
    },
    decreaseFontSize () {
      this.fontSize = Math.max(this.fontSize - 2, 12)
    },
    resetFontSize () {
      this.fontSize = 18
    },
    toggleAllPanels () {
      if (this.allPanelsOpen) {
        // Открываем все панели
        this.all()
      } else {
        // Закрываем все панели
        this.none()
      }
    }
  },
  watch: {
    // Следим за состоянием переключателя и обновляем массив открытых вкладок
    allPanelsOpen (newValue) {
      if (newValue) {
        this.all() // Открыть все вкладки
      } else {
        this.none() // Закрыть все вкладки
      }
    }
  }
}
</script>

<style lang="scss">
.song-card {
  width: 100%;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: 12px; // Устанавливаем расстояние между иконками
}

.icon-button {
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.1); // Небольшой эффект увеличения при наведении
    background-color: rgba(0, 0, 0, 0.05); // Изменение цвета фона при наведении
  }

  &:active {
    transform: scale(0.95); // Легкий эффект уменьшения при клике
  }
}

.formatted-text {
  text-align: left; /* Выравнивание текста для аккуратного отображения */
  line-height: 1.4; /* Уменьшенный межстрочный интервал для компактного размещения текста */
}

.elevation-24 {
  transition: box-shadow 0.3s ease;
}

.elevation-8 {
  transition: box-shadow 0.3s ease;
}
</style>
