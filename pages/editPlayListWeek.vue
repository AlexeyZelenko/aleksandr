<template>
  <div class="create-song">
    <template>
      <div>
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
    </template>

    <template>
      <v-sheet
        class="create-song--sheet"
        color="background"
      >
        <h3 class="text1--text">
          Редагувати
        </h3>
        <v-form fast-fail @submit.prevent="submit">
          <v-text-field
            v-model="datetime"
            label="- Дата -"
            :rules="datetimeRules"
          />

          <template>
            <v-data-table
              class="my-10"
              :headers="headers2"
              :items="youtubeLink"
              hide-default-footer
              hide-default-header
              color="background"
            >
              <template v-slot:item.name="{ item }">
                <v-chip
                  color="green"
                  dark
                >
                  {{ item.link }}
                </v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar
                  color="background"
                  flat
                >
                  <v-toolbar-title>Youtube</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  />
                  <v-spacer />
                  <v-dialog
                    v-model="dialog2"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Додати нове посилання
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text
                        width="100%"
                        style="padding: 0"
                      >
                        <v-container>
                          <v-col width="100%">
                            <v-col
                              width="100%"
                            >
                              <v-text-field
                                v-model="editedItem2.link"
                                label="Посилання з youtube"
                              />
                            </v-col>
                          </v-col>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close2"
                        >
                          Закрити
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveNewBlock2"
                        >
                          Зберегти
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete2" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5">
                        Ви впевнені, що хочете видалити цей елемент?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn color="blue darken-1" text @click="closeDelete2">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm2">
                          OK
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem2(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItemFromArray(item, 'youtubeLink')"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </template>

          <template>
            <v-data-table
              v-if="blocks && blocks.length"
              class="my-10"
              :headers="headers"
              :items="blocks"
              hide-default-footer
              hide-default-header
              color="background"
            >
              <template v-slot:item.name="{ item }">
                <v-chip
                  color="green"
                  dark
                >
                  {{ item.name }}
                </v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar
                  color="background"
                  flat
                >
                  <v-toolbar-title>Пісня</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  />
                  <v-spacer />
                  <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Новий блок
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text
                        width="100%"
                        style="padding: 0"
                      >
                        <v-container>
                          <v-col width="100%">
                            <v-col
                              width="100%"
                            >
                              <v-text-field
                                v-model="editedItem.name"
                                label="Назва пісні"
                              />
                            </v-col>
                            <v-col
                              width="100%"
                            >
                              <v-text-field
                                v-model="editedItem.id"
                                label="id пісні"
                              />
                            </v-col>
                            <v-col
                              width="100%"
                            >
                              <v-textarea
                                v-model="editedItem.content"
                                label="примітки"
                              />
                            </v-col>
                          </v-col>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                        >
                          Закрити
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="saveNewBlock"
                        >
                          Зберегти
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5">
                        Ви впевнені, що хочете видалити цей елемент?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn color="blue darken-1" text @click="closeDelete">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                          OK
                        </v-btn>
                        <v-spacer />
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItemFromArray(item, 'blocks');"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </template>

          <div>
            <v-textarea
              v-model="note"
              type="text"
              label="- Примітки -"
              variant="outlined"
            />
          </div>

          <v-btn type="submit" block class="ma-2" color="button2">
            Додати зміни
          </v-btn>
        </v-form>
        <v-btn
          color="button2"
          block
          class="ma-2"
          @click="cancel"
        >
          Відмінити
        </v-btn>
      </v-sheet>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
// import { parseTextSong } from '../helpers/utils'

export default {
  name: 'EditSong',
  data: () => ({
    datetime: null,
    datetimeRules: [
      (value) => {
        if (/[^0-9]/.test(value)) { return true }

        return 'Назва пісні не повина мати цифри'
      }
    ],
    note: null,
    description: null,
    breadcrumbs: [
      {
        text: 'Головна',
        disabled: false,
        exact: true,
        to: { name: 'index' }
      },
      {
        text: 'Тиждень',
        exact: true,
        to: { name: 'index' }
      },
      {
        text: 'Редагувати',
        disabled: true,
        to: { name: 'editPlayListWeek' }
      }
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Назва пісні',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Дані', value: 'content' },
      { text: 'Дії', value: 'actions', sortable: false }
    ],
    blocks: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      content: ''
    },
    defaultItem: {
      name: '',
      content: ''
    },
    headers2: [
      {
        text: 'Посилання з Youtube',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Дані', value: 'content' },
      { text: 'Дії', value: 'actions', sortable: false }
    ],
    linksYoutube: [],
    youtubeLink: [],
    editedIndex2: -1,
    editedItem2: {
      link: ''
    },
    defaultItem2: {
      link: ''
    },
    dialog2: false,
    dialogDelete2: false
  }),
  computed: {
    ...mapGetters([
      'WEEK'
    ]),
    week () {
      let result = {}
      this.WEEK.map((item) => {
        if (item.id === this.$route.query.week) {
          result = item
        }
      })
      return result
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Нова пісня' : 'Редагувати'
    }
  },
  watch: {
    dialog: 'closeOnFalse',
    dialogDelete: 'closeOnFalse',
    dialog2: 'closeOnFalse',
    dialogDelete2: 'closeOnFalse'
  },
  mounted () {
    this.initialize()
    this.bindCountDocument()
  },
  methods: {
    ...mapActions([
      'bindCountDocument'
    ]),
    closeOnFalse (val) {
      if (!val) {
        this.close()
      }
    },
    submit () {
      const data = {
        datetime: this.datetime,
        youtubeLink: this.youtubeLink,
        note: this.note,
        description: this.description,
        blocks: this.blocks
      }

      this.addSong(data)
    },
    initialize () {
      this.blocks = this.week.blocks
      this.seen = false
      this.datetime = this.week.datetime
      this.youtubeLink = this.week.youtubeLink
      this.note = this.week.note
      this.description = this.week.description
    },
    async addSong (songData) {
      // Swal.fire({
      //   title: 'Завантаження...',
      //   text: '',
      //   imageUrl: '352.gif',
      //   showConfirmButton: false
      // })

      const createdAt = Date.now()
      const seen = false
      const {
        datetime, youtubeLink, note, description, blocks
      } = songData

      try {
        const docRef = this.$fireStore.doc(`week/${this.week.id}`)
        await docRef.update({
          id: this.week.id,
          createdAt,
          seen,
          datetime,
          youtubeLink,
          note,
          description,
          blocks
        })

        Swal.close()

        await Swal.fire({
          icon: 'success',
          position: 'top-end',
          type: 'success',
          title: 'Зміни збережені',
          showConfirmButton: false,
          timer: 2000
        })
        await this.$router.push({ name: 'playListWeek' })
      } catch (error) {
        // Обробка помилки
        // eslint-disable-next-line no-console
        console.error('Помилка при збереженні:', error)

        Swal.close()

        await Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Помилка при збереженні',
          showConfirmButton: false,
          timer: 2000
        })

        return error
      }
    },
    editItem (item) {
      this.editedIndex = this.blocks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    editItem2 (item) {
      this.editedIndex2 = this.youtubeLink.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      this.dialog2 = true
    },

    deleteItemFromArray (item, arrayName) {
      const index = this[arrayName].indexOf(item)
      if (index !== -1) {
        this[arrayName].splice(index, 1)
      }
    },
    deleteItemConfirm () {
      this.blocks.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    deleteItemConfirm2 () {
      this.youtubeLink.splice(this.editedIndex2, 1)
      this.closeDelete2()
    },

    closeDialog (dialogName, editedItemName, defaultItemName, editedIndexName) {
      this[dialogName] = false
      this.$nextTick(() => {
        this[editedItemName] = Object.assign({}, this[defaultItemName])
        this[editedIndexName] = -1
      })
    },
    close () {
      this.closeDialog('dialog', 'editedItem', 'defaultItem', 'editedIndex')
    },
    close2 () {
      this.closeDialog('dialog2', 'editedItem2', 'defaultItem2', 'editedIndex2')
    },
    closeDelete () {
      this.closeDialog('dialogDelete', 'editedItem', 'defaultItem', 'editedIndex')
    },
    closeDelete2 () {
      this.closeDialog('dialogDelete2', 'editedItem2', 'defaultItem2', 'editedIndex2')
    },

    saveNewBlock () {
      if (this.editedIndex > -1) {
        Object.assign(this.blocks[this.editedIndex], this.editedItem)
      } else {
        this.blocks.push(this.editedItem)
      }
      this.close()
    },
    saveNewBlock2 () {
      if (this.editedIndex2 > -1) {
        Object.assign(this.youtubeLink[this.editedIndex2], this.editedItem2)
      } else {
        this.youtubeLink.push(this.editedItem2)
      }
      this.close2()
    },
    cancel () {
      this.$router.push({ name: 'playListWeek' })
    }
  }
}
</script>

<style scoped lang="scss">
.create-song {
  width: 100%;

  &--sheet {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 15px;

    @media (min-width: 767px) {
      max-width: 600px;
    }
  }
}

</style>
