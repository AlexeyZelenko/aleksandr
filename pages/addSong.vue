<template>
  <div>
    <div>Додати пісню</div>
    <template>
      <v-sheet width="300" class="mx-auto">
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
            prepend-icon="mdi-map-marker"
            variant="solo"
          />

          <v-textarea
            v-model="textSong"
            type="text"
            label="- Техт пісні -"
            variant="outlined"
          />

          <v-col cols="12">
            <tiptap-vuetify
              v-model="description"
              :extensions="extensions"
              placeholder="Описание товара"
              prepend-icon="edit"
            />
          </v-col>

          <v-btn type="submit" block class="mt-2">
            Додати
          </v-btn>
        </v-form>
      </v-sheet>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  TiptapVuetify,
  Underline
} from 'tiptap-vuetify'
import { parseTextSong } from '../helpers/utils'

export default {
  name: 'AddSong',
  components: {
    TiptapVuetify
  },
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
    textSong: null,
    description: null,
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ]
  }),
  computed: {
    ...mapGetters([
      'SONGS'
    ])
  },
  mounted () {
    this.initialize()
    this.bindCountDocument()
  },
  methods: {
    ...mapActions([
      'bindCountDocument'
    ]),
    initialize () {
      this.songs = this.SONGS
    },
    submit () {
      if (this.textSong) {
        // console.log('description', this.description)
        // const result = this.textSong.split('\n')
        // console.log('result', result)
        this.parseTextSong = parseTextSong(this.textSong)
        /*eslint-disable */
        console.log('parseTextSong', this.parseTextSong)
      }
      const data = {
        singer: this.singer,
        nameSong: this.nameSong,
        category: this.category,
        language: this.language,
        tonality: this.tonality,
        youtubeLink: this.youtubeLink,
        textSong: this.textSong,
        description: this.description
      }

      // console.log(data)
      this.save(data)
    },
    save (songData) {
      this.addSong(songData)
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
      const textSong = songData.textSong
      const description = songData.description

      const docRef = await this.$fireStore.collection('songs').add({
        createdAt,
        singer,
        seen,
        nameSong,
        category,
        language,
        tonality,
        youtubeLink,
        textSong,
        description
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
    }
  }
}
</script>

<style scoped>

</style>
