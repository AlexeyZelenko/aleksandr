<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Сьогодні
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon @click="goToSong()">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
              <template>
                <v-row justify="center">
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Додати інформацію</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-textarea
                                v-model="selectedEvent.description"
                                label="Нотатки"
                                auto-grow
                                outlined
                                rows="1"
                                row-height="15"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-select
                                v-model="selectedEvent.order"
                                :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']"
                                label="Порядок виконання*"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                        >
                          Закрити
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="editEvent(selectedEvent)"
                        >
                          Зберегти
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </template>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <div style="color: grey">
                <span>Номер пісні - </span>
                <span>{{ selectedEvent.order }}</span>
              </div>
              <div style="color: grey">
                <span>Назва категорії - </span>
                <span>{{ selectedEvent.category }}</span>
              </div>
              <span style="color: grey">{{ selectedEvent.description }}</span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Закрити
              </v-btn>
              <v-btn
                text
                color="secondary"
                @click="deleteEvent(selectedEvent)"
              >
                Видалити
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    description: '',
    order: '',
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Місяць',
      week: 'Неділя',
      day: 'День',
      '4day': '4 Days'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
  }),
  computed: {
    events () {
      return this.$store.state.plannerCalendar.events
    }
  },
  mounted () {
    this.bindCountDocument()
    this.$refs.calendar.checkChange()
  },
  methods: {
    ...mapActions([
      'bindCountDocument',
      'userEntrance',
      'sortByCategories'
    ]),
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        // eslint-disable-next-line no-return-assign
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    deleteEvent (event) {
      this.$store.dispatch('deleteEventFromCalendar', event.id)
      this.selectedOpen = false
    },
    editEvent (event) {
      this.dialog = false
      this.$store.dispatch('editEventFromCalendar', event)
      this.selectedOpen = false
    },
    goToSong () {
      this.$router.push({
        name: 'song',
        query: { song: this.selectedEvent.idSong }
      })
    }
  }
}
</script>

<style scoped>

</style>
