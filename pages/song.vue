<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <div>
      <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          />
        </template>

        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        />

        <v-card-title>
          Назва пісні: {{ song.nameSong }}
        </v-card-title>

        <v-card-text
          style="text-align: left"
        >
          <v-row
            align="left"
            class="mx-0"
          >
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            />

            <div class="grey--text ms-4">
              4.5 (413)
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            тональність • {{ song.tonality }}
          </div>
          <div class="my-4 text-subtitle-1">
            коли створенна • {{ getTime }}
          </div>

          <div>виконавець • {{ song.singer }}</div>
        </v-card-text>

        <v-divider class="mx-4" />

        <div>
          <div class="d-flex">
            <v-checkbox
              v-model="readonly"
              label="Readonly"
            />
          </div>

          <v-expansion-panels
            v-model="panel"
            :readonly="readonly"
            multiple
          >
            <v-expansion-panel
              v-for="item in song.blocks"
              :key="item.content"
            >
              <v-expansion-panel-header>
                <strong style="color: orangered">
                  {{ item.name }}
                </strong>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <p style="text-align: left">
                  {{ item.content }}
                </p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <v-divider class="mx-4 px-4" />

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  Дата виконання:
                </v-col>
                <v-col
                  cols="8"
                  class="text--secondary"
                >
                  <v-fade-transition leave-absolute>
                    <span v-if="open">Коли ви хочете заспівати цю пісню?</span>
                    <v-row
                      v-else
                      no-gutters
                      style="width: 100%"
                    >
                      <v-col cols="9">
                        {{ trip.start || 'Не встановлено' }}
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
                <v-col cols="6">
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
                        @click="$refs.startMenu.save(date)"
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
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout: 'back_catalog',
  name: 'SongInformation',
  data () {
    return {
      readonly: false,
      panel: [0],
      loading: false,
      selection: 1,
      breadcrumbs: [
        {
          text: 'Головна',
          disabled: false,
          href: '/'
        },
        {
          text: 'Пісні',
          disabled: false,
          href: 'songs'
        },
        {
          text: 'Пісня',
          disabled: true,
          href: 'addSong'
        }
      ],
      date: null,
      trip: {
        start: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'SONGS'
    ]),
    song () {
      let result = {}
      this.SONGS.map((item) => {
        if (item.id === this.$route.query.song) {
          result = item
        }
      })
      return result
    },
    getTime () {
      // Исходная дата в числовом формате
      const timestamp = this.song.createdAt

      // Создаем объект Date из числовой метки времени
      const date = new Date(timestamp)

      // Извлекаем нужные компоненты даты
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()

      // Форматируем дату в удобочитаемый вид (например, "гггг-мм-дд чч:мм:сс")
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },
  mounted () {
    this.bindCountDocument()
  },
  methods: {
    ...mapActions([
      'bindCountDocument'
    ]),
    reserve () {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    }
  }
}
</script>

<style lang="scss">
.descriptions {
  padding: 10px;
  border-radius: 5px;
}
.z-product-information {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding*2;
  margin-bottom: $margin*2;
  text-align: center;
  border-radius: 5px;

  iframe {
    max-width: 100%;
    max-height: 400px;
    margin: 0 auto;
    border-radius: 5px;
  }
}
</style>
