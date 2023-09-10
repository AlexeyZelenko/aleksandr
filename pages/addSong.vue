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
    <div>Додати пісню</div>
    <template>
      <v-sheet
        class="create-song--sheet"
      >
        <v-form fast-fail @submit.prevent="submit">
          <v-text-field
            v-model="singer"
            label="- Виконавець -"
            :rules="singerRules"
          />

          <v-text-field
            v-model="nameSong"
            label="- Назва пісні -"
            :rules="nameSongRules"
          />

          <v-select
            v-model="category"
            chips
            label="- Тема -"
            :items="['Поклоніння', 'Прославління', 'Хвала', 'Інше']"
            variant="outlined"
          />
          <v-select
            v-model="language"
            chips
            label="- Мова -"
            :items="['UA', 'RU', 'EN']"
            variant="outlined"
          />
          <v-select
            v-model="tonality"
            chips
            label="- Тональність -"
            :items="['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'H']"
            variant="outlined"
          />

          <v-text-field
            v-model="youtubeLink"
            label="Посилання на відео з youtube"
            prepend-icon="mdi-television-play"
            variant="solo"
          />

          <template>
            <v-data-table
              :headers="headers"
              :items="blocks"
              hide-default-footer
              hide-default-header
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
                >
                  <v-toolbar-title>Блок</v-toolbar-title>
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
                                label="Назва блоку"
                              />
                            </v-col>
                            <v-col
                              width="100%"
                            >
                              <v-textarea
                                v-model="editedItem.content"
                                label="техт/акорди/ноти"
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

          <v-btn type="submit" block class="mt-2">
            Додати
          </v-btn>
        </v-form>
        <v-btn block class="mt-2" @click="cancel">
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
  name: 'AddSong',
  data: () => ({
    singer: null,
    singerRules: [
      (value) => {
        if (value?.length > 3) { return true }

        return 'Повинно бути не менше 3 літер'
      }
    ],
    nameSong: null,
    nameSongRules: [
      (value) => {
        if (/[^0-9]/.test(value)) { return true }

        return 'Назва пісні не повина мати цифри'
      }
    ],
    category: null,
    language: null,
    tonality: null,
    youtubeLink: null,
    note: null,
    description: null,
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
        text: 'Додати пісню',
        disabled: true,
        href: 'addSong'
      }
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Назва блоку',
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
    }
  }),
  computed: {
    ...mapGetters([
      'SONGS'
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'Новий блок' : 'Редагувати'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
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
      //* Разбить текст на блоки - вынести в отдельный функционал*//
      // if (this.textSong) {
      //   this.parseTextSong = parseTextSong(this.textSong)
      //   /*eslint-disable */
      //   console.log('parseTextSong', this.parseTextSong)
      // }
      const data = {
        singer: this.singer,
        nameSong: this.nameSong,
        category: this.category,
        language: this.language,
        tonality: this.tonality,
        youtubeLink: this.youtubeLink,
        note: this.note,
        description: this.description,
        blocks: this.blocks
      }

      // console.log(data)
      this.addSong(data)
    },
    initialize () {
      this.songs = this.SONGS
    },
    async addSong (songData) {
      Swal.fire({
        title: 'Идет загрузка...',
        text: '',
        imageUrl: '352.gif',
        showConfirmButton: false
      })
      const createdAt = Date.now()
      const seen = false
      const singer = songData.singer
      const nameSong = songData.nameSong
      const category = songData.category
      const language = songData.language
      const tonality = songData.tonality
      const youtubeLink = songData.youtubeLink
      const note = songData.note
      const description = songData.description
      const blocks = songData.blocks

      const docRef = await this.$fireStore.collection('songs').add({
        createdAt,
        singer,
        seen,
        nameSong,
        category,
        language,
        tonality,
        youtubeLink,
        note,
        description,
        blocks
      })
      try {
        const docAdded = await docRef
        await this.$fireStore.doc('songs/' + `${docAdded.id}`).update({ id: `${docAdded.id}` })
      } catch (err) {
        return err
      }

      Swal.close()

      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Пісня додана',
        showConfirmButton: false,
        timer: 2000
      })

      await this.$router.push({ name: 'songs' })
    },
    editItem (item) {
      this.editedIndex = this.blocks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.blocks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.blocks.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
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
    cancel () {
      this.$router.push({ name: 'songs' })
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
    padding: 0 15px;

    @media (min-width: 767px) {
      max-width: 600px;
    }
  }
}

</style>
