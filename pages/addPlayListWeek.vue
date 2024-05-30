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
        <h3 class="tex1--text">
          Додати список пісень на тиждень
        </h3>
        <v-form fast-fail @submit.prevent="submit">
          <v-text-field
            v-model="datetime"
            label="- Дата -"
            :rules="[rules.required]"
          />

          <template>
            <v-data-table
              :headers="headers2"
              :items="linksYoutube"
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
                  <v-toolbar-title>Посилання на плейлист Youtube</v-toolbar-title>
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
                        color="button2"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </template>
                    <v-card color="background">
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
                          color="color5"
                          text
                          @click="close2"
                        >
                          Закрити
                        </v-btn>
                        <v-btn
                          color="color5"
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
                        <v-btn color="color5" text @click="closeDelete2">
                          Cancel
                        </v-btn>
                        <v-btn color="color5" text @click="deleteItemConfirm2">
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
                  @click="deleteItem2(item)"
                >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </template>

          <template>
            <v-data-table
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
                  flat
                  color="background"
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
                        color="button2"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Нова пісня
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
                          color="color5"
                          text
                          @click="close"
                        >
                          Закрити
                        </v-btn>
                        <v-btn
                          color="color5"
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
                        <v-btn color="button1" text @click="closeDelete">
                          Cancel
                        </v-btn>
                        <v-btn color="button1" text @click="deleteItemConfirm">
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
                  @click="deleteItem(item)"
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

          <v-btn color="button2" type="submit" block class="my-2">
            Додати
          </v-btn>
        </v-form>
        <v-btn
          color="button2"
          block
          class="my-2"
          style="margin: 0 auto;"
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

export default {
  name: 'AddSong',
  data: () => ({
    rules: {
      required: value => !!value || 'Required.'
    },
    datetime: null,
    youtubeLink: null,
    note: null,
    description: null,
    breadcrumbs: [
      {
        text: 'Головна',
        disabled: false,
        to: { name: 'index' },
        exact: true
      },
      {
        text: 'Тиждень',
        disabled: false,
        exact: true,
        to: { name: '/' }
      },
      {
        text: 'Додати список пісень',
        disabled: true,
        to: { name: 'editPlayListWeek' }
      }
    ],
    dialog: false,
    dialog2: false,
    dialogDelete: false,
    dialogDelete2: false,
    headers: [
      {
        text: 'Додайте новий пісню',
        align: 'start',
        sortable: false,
        value: 'name'
      },
      { text: 'Дані', value: 'content' },
      { text: 'Дії', value: 'actions', sortable: false }
    ],
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
    blocks: [],
    editedIndex: -1,
    editedIndex2: -1,
    editedItem: {
      name: '',
      content: ''
    },
    editedItem2: {
      link: ''
    },
    defaultItem2: {
      link: ''
    },
    defaultItem: {
      name: '',
      content: ''
    }
  }),
  computed: {
    ...mapGetters([
      'WEEK'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Нова пісня' : 'Редагувати'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialog2 (val) {
      val || this.close2()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    dialogDelete2 (val) {
      val || this.closeDelete2()
    }
  },
  mounted () {
    this.initialize()
    this.bindCountDocument()
  },
  methods: {
    ...mapActions([
      'bindCountDocument'
    ]),
    submit () {
      const data = {
        datetime: this.datetime,
        youtubeLink: this.linksYoutube,
        note: this.note,
        description: this.description,
        blocks: this.blocks
      }
      if (this.datetime === null || this.category === null || this.language === null || this.blocks.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Помилка',
          text: 'Заповніть всі поля!'
        })
        return
      }

      // console.log(data)
      this.addSong(data)
    },
    initialize () {
      this.week = this.WEEK
    },
    async addSong (songData) {
      try {
        const createdAt = Date.now()
        const seen = false
        const datetime = songData.datetime
        const youtubeLink = songData.youtubeLink
        const note = songData.note
        const description = songData.description
        const blocks = songData.blocks

        const docRef = await this.$fireStore.collection('week').add({
          createdAt,
          seen,
          datetime,
          youtubeLink,
          note,
          description,
          blocks
        })

        const docAdded = await docRef
        await this.$fireStore.doc('week/' + `${docAdded.id}`).update({ id: `${docAdded.id}` })

        Swal.close()

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Додано!',
          showConfirmButton: false,
          timer: 2000
        })

        await this.$router.push({ name: 'index' })
      } catch (err) {
        // Обробка помилок
        Swal.fire({
          type: 'error',
          title: 'Помилка!',
          text: 'Виникла помилка при додаванні пісні. Спробуйте ще раз.'
        })
      }
    },

    editItem (item) {
      this.editedIndex = this.blocks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    editItem2 (item) {
      this.editedIndex2 = this.linksYoutube.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      this.dialog2 = true
    },
    deleteItem (item) {
      this.editedIndex = this.blocks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItem2 (item) {
      this.editedIndex2 = this.linksYoutube.indexOf(item)
      this.editedItem2 = Object.assign({}, item)
      this.dialogDelete2 = true
    },
    deleteItemConfirm () {
      this.blocks.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    deleteItemConfirm2 () {
      this.linksYoutube.splice(this.editedIndex2, 1)
      this.closeDelete2()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    close2 () {
      this.dialog2 = false
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2)
        this.editedIndex2 = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete2 () {
      this.dialogDelete2 = false
      this.$nextTick(() => {
        this.editedItem2 = Object.assign({}, this.defaultItem2)
        this.editedIndex2 = -1
      })
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
        Object.assign(this.linksYoutube[this.editedIndex2], this.editedItem2)
      } else {
        this.linksYoutube.push(this.editedItem2)
      }
      this.close2()
    },
    cancel () {
      this.$router.push({ name: 'index' })
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
