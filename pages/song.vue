<template>
  <div class="song-card">
    <v-breadcrumbs
      v-if="song?.nameSong"
      :items="breadcrumbs"
    >
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-card
      class="mx-auto my-12 pa-4"
      max-width="980"
      color="background"
    >
      <v-card-title>
        <span class="text1--text text--secondary">Назва пісні:</span>
        <span class="text1--text px-1 font-weight-bold">{{ song.nameSong }}</span>
        <v-spacer />
        <v-btn
          outlined
          color="indigo"
          class="ma-2 white--text"
          fab
          small
          @click.stop="copySongId(song.id)"
        >
          ID
        </v-btn>
        <v-row v-if="User_Entrance">
          <v-icon
            v-if="!song.activeStar"
            color="grey lighten-1"
            @click.stop="addToFavorite(song.id)"
          >
            mdi-heart-outline
          </v-icon>

          <v-icon
            v-else
            color="yellow darken-3"
            @click.stop="deleteFavorite(song.id)"
          >
            mdi-heart
          </v-icon>
        </v-row>
      </v-card-title>

      <v-divider class="mx-4" />

      <v-expansion-panels
        v-model="panel"
        :readonly="readonly"
        multiple
      >
        <v-expansion-panel
          v-for="item in song.blocks"
          :key="item.content"
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <div
                :class="`elevation-${hover ? 24 : 8}`"
                class="mx-auto transition-swing"
              >
                <v-expansion-panel-header>
                  <strong style="color: orangered">
                    {{ item.name }}
                  </strong>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-container class="fill-height">
                    <v-textarea
                      v-model="item.content"
                      class="text2--text"
                      :class="fontSize"
                      auto-grow
                      outlined
                      readonly
                    />
                  </v-container>
                </v-expansion-panel-content>
              </div>
            </template>
          </v-hover>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-divider class="mx-4 px-4" />

      <Youtube-video
        v-if="song && song.youtubeLink?.length > 0"
        :links="song.youtubeLink"
      />

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters>
              <v-col cols="4">
                Додати до календаря:
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
              >
                <v-fade-transition leave-absolute>
                  <span v-if="open">Виберіть коли ви хочете заспівати цю пісню?</span>
                  <v-row
                    v-else
                    no-gutters
                    style="width: 100%"
                  >
                    <v-col cols="12">
                      {{ trip.start }}
                    </v-col>
                  </v-row>
                </v-fade-transition>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row
              justify="space-around"
              no-gutters
            >
              <v-col cols="9">
                <v-menu
                  ref="startMenu"
                  :close-on-content-click="false"
                  :return-value.sync="trip.start"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="trip.start"
                      label="Дата виконання"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                  >
                    <v-spacer />
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.startMenu.isActive = false"
                    >
                      Відмінити
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.startMenu.save(null)"
                    >
                      Видалити
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.startMenu.save(date); addToCalendar()"
                    >
                      Зберегти
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="text-center d-flex align-center justify-space-around">
        <v-checkbox
          v-model="readonly"
          label="Зафіксувати"
        />
        <v-btn @click="all">
          Всі
        </v-btn>
        <v-btn @click="none">
          Закрити
        </v-btn>
      </div>

      <v-card-actions>
        <v-btn
          color="orange"
          text
          outlined
          @click.stop="editSong()"
        >
          Редагувати
        </v-btn>
        <v-divider class="mx-4 px-4" />
        <v-btn
          color="orange"
          text
          outlined
          @click.stop="removeSong()"
        >
          Видалити
        </v-btn>
      </v-card-actions>
    </v-card>
    <!--    <v-container>-->
    <!--      <v-btn @click="fontSize = 'small'">-->
    <!--        - -->
    <!--      </v-btn>-->
    <!--      <v-btn @click="fontSize = 'medium'">-->
    <!--        Середній-->
    <!--      </v-btn>-->
    <!--      <v-btn @click="fontSize = 'large'">-->
    <!--        +-->
    <!--      </v-btn>-->
    <!--      <div :class="fontSize">-->
    <!--        Змінити розмір шрифту тексту..-->
    <!--      </div>-->
    <!--    </v-container>-->
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
      fontSize: 'medium',
      panel: [],
      activeStar: false,
      readonly: true,
      loading: false,
      selection: 1,
      date: null,
      trip: {
        start: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'SONGS',
      'infoUser',
      'User_Entrance'
    ]),
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
    },
    getTime () {
      // Исходная дата в числовом формате
      const timestamp = this.date

      // Создаем объект Date из числовой метки времени
      const date = new Date(timestamp)
      const today = new Date()

      // Извлекаем нужные компоненты даты
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
      const day = date.getDate()
      const hours = today.getHours()
      const minutes = today.getMinutes()
      const seconds = today.getSeconds()

      // Форматируем дату в удобочитаемый вид (например, "гггг-мм-дд чч:мм:сс")
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    extractVideoId () {
      // Регулярное выражение для извлечения ID из ссылки YouTube
      const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))(.*?)(?:\?t=|&t=|&start=|&index=|&list=|$|\n)/

      const match = this.song.youtubeLink.match(regex)

      if (match && match[1]) {
        return match[1]
      } else {
        return null
      }
    }
  },
  mounted () {
    this.bindCountDocument()
    this.all()
  },
  methods: {
    ...mapActions([
      'bindCountDocument',
      'deleteSong',
      'ADD_TO_FAVORITE',
      'REMOVE_FROM_FAVORITE'
    ]),
    ...mapMutations([
      'SET_EVENT_CALENDAR'
    ]),
    all () {
      if (this.song.blocks) {
        this.panel = [...Array(this.song.blocks.length).keys()].map((k, i) => i)
      }
    },
    // Reset the panel
    none () {
      this.panel = []
    },
    addToFavorite (id) {
      this.ADD_TO_FAVORITE(id)
      this.activeStar = !this.activeStar
    },
    deleteFavorite () {
      this.REMOVE_FROM_FAVORITE(this.song.id)
      this.activeStar = !this.activeStar
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
    async addToCalendar () {
      const event = {
        id: this.song.id,
        name: this.song.nameSong,
        category: this.song.category,
        start: this.getTime,
        end: '',
        color: 'orange',
        timed: false,
        order: '',
        type: 'song'
      }

      Swal.fire({
        title: 'Завантаження...',
        text: '',
        imageUrl: '352.gif',
        showConfirmButton: false
      })

      const createdAt = Date.now()
      const seen = false
      const { name, category, start, end, color, timed, order, id, type } = event
      const description = ''

      const docRef = await this.$fireStore.collection('calendar').add({
        createdAt,
        name,
        seen,
        category,
        start,
        end,
        color,
        timed,
        order,
        idSong: id,
        description,
        type
      })

      try {
        const docAdded = await docRef
        await this.$fireStore.doc(`calendar/${docAdded.id}`).update({ id: docAdded.id })
      } catch (err) {
        return err
      }

      Swal.close()

      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Пісня додана до календаря.',
        showConfirmButton: false,
        timer: 2000
      })

      await this.$router.push({ name: 'plannerCalendar' })
    }

  }
}
</script>

<style lang="scss">
.song-card {
  width: 100%;

  textarea {}

  &--container {
    text-align: left;
  }
}
.descriptions {
  padding: 10px;
  border-radius: 5px;
}
.song-information {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding*2;
  margin-bottom: $margin*2;
  border-radius: 5px;

  iframe {
    max-width: 100%;
    max-height: 400px;
    margin: 0 auto;
    border-radius: 5px;
  }
}
.small {
  font-size: 16px;
}
.medium {
  font-size: 18px;
}
.large {
  font-size: 20px;
}
</style>
