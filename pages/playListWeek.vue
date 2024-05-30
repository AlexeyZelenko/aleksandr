<template>
  <div>
    <v-row justify="center" class="my-5">
      <v-expansion-panels focusable>
        <v-expansion-panel
          v-for="card in cards"
          :key="card.id"
        >
          <v-expansion-panel-header>
            <div>
              <span>{{ card.datetime }}</span>
              <v-btn class="mx-2" icon @click.stop="editWeek(card.id)">
                <v-icon v-if="User_Entrance" dark>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
              :style="{ border: 'none', boxShadow: 'none' }"
              max-width="600"
              class="mx-auto my-5"
              outline
            >
              <v-list
                subheader
                two-line
              >
                <v-subheader inset>
                  Посилання на плейлист
                </v-subheader>

                <div v-if="card.youtubeLink">
                  <v-list-item
                    v-for="item in card.youtubeLink"
                    :key="item.link"
                  >
                    <v-list-item-avatar>
                      <v-icon
                        class="grey lighten-1"
                        dark
                      >
                        mdi-youtube
                      </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title v-text="linkTitle" />
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon :href="item.link" target="_blank">
                        <v-icon color="grey lighten-1">
                          mdi-information
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </div>

                <v-divider inset />

                <v-subheader inset>
                  Список пісень
                </v-subheader>
                <v-list-item
                  v-for="song in card.blocks"
                  :key="song.id"
                >
                  <v-list-item-avatar>
                    <v-icon
                      class="grey lighten-1"
                      dark
                    >
                      mdi-bookmark-music
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="song.name" />

                    <v-list-item-subtitle v-text="song.content" />
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon @click="songClick(song.id)">
                      <v-icon color="grey lighten-1">
                        mdi-information
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-divider inset />

                <v-list-item>
                  <v-list-item-avatar>
                    <v-icon
                      class="grey lighten-1"
                      dark
                    >
                      mdi-note
                    </v-icon>
                  </v-list-item-avatar>

                  <v-container>
                    <v-textarea
                      v-model="card.note"
                      label="Примітки"
                      auto-grow
                      readonly
                    />
                  </v-container>
                </v-list-item>
              </v-list>
            </v-card>
            <div v-if="User_Entrance" class="text-center my-5">
              <v-btn
                rounded
                color="primary"
                dark
                @click="removeItemWeek(card.id)"
              >
                Видалити
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-fab-transition v-if="User_Entrance">
      <v-btn
        class="my-10"
        to="/addPlayListWeek"
        color="pink"
        fab
        dark
        large
        absolute
        bottom
        left
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    linkTitle: 'Плейлист в Ютубі'
  }),
  computed: {
    ...mapGetters([
      'User_Entrance',
      'USER_ID'
    ]),
    cards () {
      return this.$store.getters.WEEK
    },
    weekData () {
      return this.$store.getters.WEEK[0]
    },
    songs () {
      return this.weekData.blocks
    }
  },
  mounted () {
    // eslint-disable-next-line no-console
    console.log('cards', this.cards)
    this.userEntrance()
    this.bindCountDocument()
  },
  methods: {
    ...mapActions([
      'bindCountDocument',
      'userEntrance'
    ]),
    weekClick (id) {
      this.$router.push({ name: 'week', query: { week: id } })
    },
    editWeek (id) {
      this.$router.push({ name: 'editPlayListWeek', query: { week: id } })
    },
    songClick (id) {
      this.$router.push({ name: 'song', query: { song: id } })
    },
    removeItemWeek (id) {
      this.deleteWeek(id)
    },
    async deleteWeek (id) {
      const confirmResult = await Swal.fire({
        title: 'Ви впевнені?',
        text: 'Ви не зможете відновити це!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Так, видалити це!'
      })

      if (confirmResult.value) {
        try {
          await this.$fireStore.collection('week').doc(`${id}`).delete()
          Swal.close()
          Swal.fire({
            title: 'Видалено!',
            type: 'success'
          })
        } catch (error) {
          // Обробка помилок
          // eslint-disable-next-line no-console
          console.error('Помилка при видаленні документа:', error)
          Swal.close()
          Swal.fire({
            title: 'Помилка при видаленні!',
            type: 'error'
          })
        }
      }
    }
  }
}
</script>
