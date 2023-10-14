<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card
      class="mx-auto"
      max-width="500"
      color="background"
    >
      <v-list shaped color="background">
        <v-list-item-group
          v-model="selectedUsers"
          multiple
        >
          <template v-for="(item, i) in users">
            <v-divider
              v-if="!item"
              :key="`divider-${i}`"
            />

            <v-list-item
              v-else
              :key="`item-${i}`"
              :value="item"
              active-class="blue-grey lighten-5--text text--accent-4"
            >
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item" />
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="deep-purple accent-4"
                  />
                </v-list-item-action>
              </template>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <v-expansion-panels color="background">
        <v-expansion-panel>
          <v-expansion-panel-header v-slot="{ open }">
            <v-row no-gutters color="background">
              <v-col cols="4">
                Додати до календаря:
              </v-col>
              <v-col
                cols="8"
                class="text--secondary"
                color="background"
              >
                <v-fade-transition leave-absolute>
                  <span v-if="open">Виберіть дату</span>
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
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ListItemGroup',
  data: () => ({
    selectedUsers: [],
    breadcrumbs: [
      {
        text: 'Головна',
        disabled: false,
        exact: true,
        to: { name: 'index' }
      },
      {
        text: 'Користувачи',
        disabled: true
      }
    ],
    users: [
      'Антоніна Бієвець',
      'Яна Зеленько',
      'Катерина Мельник',
      'Поліна Січкар',
      'Юлія Охріменко',
      'Альона',
      '',
      'Святослав',
      'Вадим Січкарь',
      'Влад Зеленський'
    ],
    model: ['Carrots'],
    date: null,
    trip: {
      start: null
    }
  }),
  computed: {
    getTime () {
      // Исходная дата в числовом формате
      const timestamp = this.date
      const today = new Date()

      // Создаем объект Date из числовой метки времени
      const date = new Date(timestamp)

      // Извлекаем нужные компоненты даты
      const year = date.getFullYear()
      const month = date.getMonth() + 1 // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = today.getMinutes()
      const seconds = today.getSeconds()

      // Форматируем дату в удобочитаемый вид (например, "гггг-мм-дд чч:мм:сс")
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },
  methods: {
    async addToCalendar () {
      const event = {
        users: this.users,
        selected: this.selectedUsers,
        start: this.getTime,
        color: 'blue'
      }

      Swal.fire({
        title: 'Завантаження...',
        text: '',
        imageUrl: '352.gif',
        showConfirmButton: false
      })

      const createdAt = Date.now()
      const type = 'users'
      const { start, users, selected, color } = event
      const name = 'Служителі'

      try {
        const docRef = await this.$fireStore.collection('calendar').add({
          createdAt,
          users,
          selected,
          start,
          type,
          color,
          name
        })

        const docAdded = await docRef
        await this.$fireStore.doc(`calendar/${docAdded.id}`).update({ id: docAdded.id })

        Swal.close()

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Группа додана до календаря.',
          showConfirmButton: false,
          timer: 2000
        })
      } catch (error) {
        // Обробка помилок
        // eslint-disable-next-line no-console
        console.error('Помилка при додаванні події до календаря:', error)

        Swal.close()

        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Помилка при додаванні події до календаря',
          showConfirmButton: false,
          timer: 2000
        })

        // Ви можете також повернути помилку для подальшого оброблення, якщо це необхідно.
        return error
      }
    }
  }
}
</script>

<style scoped>

</style>
