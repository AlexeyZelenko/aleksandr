<template>
  <div v-if="song && song.nameSong" class="song-card">
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
        <v-expansion-panel v-for="(item, panelIndex) in song.blocks" :key="panelIndex">
          <v-hover>
            <template v-slot:default="{ hover }">
              <div :class="`elevation-${hover ? 24 : 8}`" class="mx-auto transition-swing">
                <v-expansion-panel-header>
                  <strong style="color: orangered">{{ item.name }}</strong>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-container class="fill-height pa-0">
                    <div class="formatted-text" :style="{ fontSize: fontSize + 'px', lineHeight: lineHeight }">
                      <span v-for="(line, lineIndex) in item.content.split('\n')" :key="lineIndex">
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
        <v-switch v-model="allPanelsOpen" label="Відкрити/Закрити всі вкладки" @change="toggleAllPanels" />
      </v-row>

      <v-card-actions v-if="User_Entrance">
        <v-btn color="orange" text outlined @click.stop="editSong()">
          <v-icon left>
            mdi-pencil
          </v-icon> Редагувати
        </v-btn>
        <v-divider vertical />
        <v-btn color="orange" text outlined style="margin: 0 20px" @click.stop="removeSong()">
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

    <!-- Загрузка аудиофайлов и Нотатки для песни -->
    <v-card v-if="User_Entrance" class="mx-auto my-12 pa-4" max-width="980" color="background">
      <v-card-title>
        <span class="font-weight-bold">Додати аудіофайли:</span>
      </v-card-title>

      <!-- Поле для загрузки аудиофайлов -->
      <v-file-input
        v-model="audioFile"
        label="Завантажити аудіофайл"
        accept="audio/*"
        prepend-icon="mdi-music-note-plus"
        @change="uploadAudio"
      />

      <!-- Список аудиофайлов -->
      <div v-if="audioFiles.length" class="my-4">
        <v-divider class="my-2" />
        <div v-for="(audio, audioIndex) in audioFiles" :key="audioIndex" class="mb-4">
          <v-card class="mx-auto pa-4" color="grey lighten-4">
            <v-card-title>
              <span class="font-weight-bold">Аудіофайл {{ audioIndex + 1 }}:</span>
              <v-spacer />
              <v-btn color="red" icon @click="removeAudio(audioIndex)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider class="my-2" />
            <audio :src="audio.url" controls />
          </v-card>
        </div>
      </div>

      <v-divider class="mx-4 my-4" />

      <v-card-title>
        <span class="font-weight-bold">Нотатки:</span>
      </v-card-title>
      <v-textarea v-model="userNote" label="Ваші Нотатки до пісні" outlined rows="5" />
      <v-btn class="my-4" color="primary" @click="saveNote">
        Зберегти Нотатки
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Swal from 'sweetalert2'
import 'firebase/firestore'

export default {
  layout: 'back_catalog',
  name: 'SongInformation',
  components: {
    'Youtube-video': () => import('~/components/youtube.vue')
  },
  data () {
    return {
      audioFile: null,
      audioFiles: [],
      userNote: '',
      fontSize: 18,
      lineHeight: '1.4',
      panel: [],
      activeStar: false,
      readonly: true,
      loading: false,
      selection: 1,
      date: null,
      trip: {
        start: null
      },
      show: false,
      allPanelsOpen: false
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
  watch: {
    song: {
      handler (newSong) {
        if (newSong && newSong.id) {
          this.loadNote()
          this.loadAudio()
        }
      },
      immediate: true
    }
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
        this.all()
      } else {
        this.none()
      }
    },
    async uploadAudio () {
      if (!this.audioFile) {
        return
      }

      try {
        const storageRef = this.$fireStorage.ref(`songs/${this.song.id}/audio/${this.audioFile.name}`)
        const snapshot = await storageRef.put(this.audioFile)
        const audioUrl = await snapshot.ref.getDownloadURL()

        // Добавляем новый аудиофайл в список аудиофайлов
        this.audioFiles.push({ name: this.audioFile.name, url: audioUrl })

        await this.$fireStore.collection('songs').doc(this.song.id).update({
          audioFiles: this.audioFiles
        })

        this.audioFile = null

        Swal.fire('Успіх!', 'Аудіофайл завантажено!', 'success')
      } catch (error) {
        Swal.fire('Помилка!', 'Не вдалося завантажити аудіофайл', 'error')
      }
    },
    async removeAudio (index) {
      const audioToRemove = this.audioFiles[index]
      if (!audioToRemove) {
        return
      }

      try {
        // Удаление файла из Firebase Storage
        const storageRef = this.$fireStorage.refFromURL(audioToRemove.url)
        await storageRef.delete()

        // Удаление ссылки из Firestore и локального состояния
        this.audioFiles.splice(index, 1)

        await this.$fireStore.collection('songs').doc(this.song.id).update({
          audioFiles: this.audioFiles
        })

        Swal.fire('Успіх!', 'Аудіофайл видалено!', 'success')
      } catch (error) {
        Swal.fire('Помилка!', 'Не вдалося видалити аудіофайл', 'error')
      }
    },
    async saveNote () {
      if (!this.song || !this.song.id) {
        return
      }
      try {
        await this.$fireStore.collection('songs').doc(this.song.id).update({
          userNote: this.userNote
        })
        Swal.fire('Успіх!', 'Нотатки збережені!', 'success')
      } catch (error) {
        Swal.fire('Помилка!', 'Не вдалося зберегти Нотатки', 'error')
      }
    },
    async loadNote () {
      if (!this.song.id) {
        return
      }
      try {
        const doc = await this.$fireStore.collection('songs').doc(this.song.id).get()
        if (doc.exists && doc.data().userNote) {
          this.userNote = doc.data().userNote
        }
      } catch (error) {
        Swal.fire('Помилка!', 'Не вдалося завантажити Нотатки', 'error')
      }
    },
    async loadAudio () {
      if (!this.song.id) {
        return
      }
      try {
        const doc = await this.$fireStore.collection('songs').doc(this.song.id).get()
        if (doc.exists && doc.data().audioFiles) {
          this.audioFiles = doc.data().audioFiles
        }
      } catch (error) {
        Swal.fire('Помилка!', 'Не вдалося завантажити аудіофайли', 'error')
      }
    },
    async fetchSong () {
      try {
        const songId = this.$route.query.song
        const doc = await this.$fireStore.collection('songs').doc(songId).get()
        if (doc.exists) {
          this.song = doc.data()
        }
      } catch (error) {
        Swal.fire('Помилка!', 'Не вдалося завантажити пісню', 'error')
      }
    }
  },
  mounted () {
    this.bindCountDocument()
    this.all()
  },
  created () {
    // eslint-disable-next-line
    console.log('>>>>>Song ID from query:', this.$route.query.song)
    if (!this.song || !this.song.id) {
      // Здесь вызовите метод, который загружает конкретную песню из Firestore или другого источника
      this.fetchSong()
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
