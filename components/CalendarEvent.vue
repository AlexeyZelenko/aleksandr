<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">
            Додати до календаря:
          </v-col>
          <v-col cols="8" class="text--secondary">
            <v-fade-transition leave-absolute>
              <span v-if="open">Виберіть, коли ви хочете заспівати цю пісню?</span>
              <v-row v-else no-gutters style="width: 100%">
                <v-col cols="12">
                  {{ eventDate }}
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <v-row justify="space-around" no-gutters>
          <v-col cols="9">
            <v-menu
              ref="startMenu"
              :close-on-content-click="false"
              :return-value.sync="eventDate"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="eventDate"
                  label="Дата виконання"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer />
                <v-btn text color="primary" @click="$refs.startMenu.isActive = false">
                  Відмінити
                </v-btn>
                <v-btn text color="primary" @click="$refs.startMenu.save(null)">
                  Видалити
                </v-btn>
                <v-btn text color="primary" @click="saveDate">
                  Зберегти
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CalendarEvent',
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      eventDate: null,
      date: null
    }
  },
  computed: {
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
    }
  },
  methods: {
    async saveDate () {
      if (!this.eventDate) { return }

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

      try {
        const createdAt = Date.now()
        const seen = false
        const { name, category, start, end, color, timed, order, id, type } = event
        const description = ''

        // Add the event to Firestore
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

        // Update the document with the generated ID
        await this.$fireStore.doc(`calendar/${docRef.id}`).update({ id: docRef.id })

        Swal.close()
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Пісня додана до календаря.',
          showConfirmButton: false,
          timer: 2000
        })

        // Navigate to the calendar
        this.$router.push({ name: 'plannerCalendar' })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Помилка',
          text: 'Не вдалося додати пісню до календаря.',
          showConfirmButton: true
        })
      }
    }
  }
}
</script>

<style scoped>
/* Optional custom styles for the CalendarEvent component */
</style>
