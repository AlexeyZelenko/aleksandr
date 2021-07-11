<template>
  <div>
    <template>
      <v-card
        class="mx-auto"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Переробка фруктових дерев</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-2">
          Допоможемо зрізати та вивести фруктові дерева.
        </v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Це безкоштовно</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
            to="/priceTrees"
          >
            ЦІНИ
          </v-btn>

          <v-btn
            color="orange"
            text
            to="/contacts"
          >
            КОНТАКТИ
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
    <template>
      <v-item-group>
        <v-container>
          <v-row>
            <v-col
              v-for="video in videoList"
              :key="video.id"
              cols="12"
              md="4"
            >
              <v-item>
                <div
                  class="display-3 flex-grow-1 text-center"
                >
                  <v-card
                    class="mx-auto"
                    max-width="400"
                  >
                    <vue-plyr>
                      <div class="plyr__video-embed">
                        <iframe
                          :src="`https://www.youtube.com/embed/${video.linkIdYoutube}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
                          allowfullscreen
                          allowtransparency
                          allow="autoplay"
                        />
                      </div>
                    </vue-plyr>

                    <v-card-title>{{ video.title }}</v-card-title>
                  </v-card>
                </div>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Trees',
  data () {
    return {
      videoList: [
        {
          id: 1,
          title: 'Обробка-2',
          linkIdYoutube: 'QvaqJypdJNE',
          linkIdVimeo: '496361462'
        },
        {
          id: 2,
          title: 'Обробка-1',
          linkIdYoutube: 'w-tmVgYkw-U',
          linkIdVimeo: ''
        }
      ]
    }
  }
}
</script>
