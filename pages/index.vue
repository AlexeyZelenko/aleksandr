<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <vuetify-logo />
        </div>
        <v-card>
          <v-img
            class="white--text align-end"
            height="300px"
            :src="Cover"
          >
            <v-btn
              class="ma-2"
              outlined
              color="yellow"
              nuxt
              to="/about"
            >
              Про мене
            </v-btn>
            <v-btn
              class="ma-2"
              outlined
              color="yellow"
              nuxt
              to="/contacts"
            >
              Контакти
            </v-btn>
          </v-img>
        </v-card>
        <div>
          <logo />
        </div>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col
        v-for="elevation in elevations"
        :key="elevation.title"
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-title class="text-h5">
            {{ elevation.title }}
          </v-card-title>
          <v-img
            class="white--text align-end"
            height="300px"
            :src="elevation.src"
          >
            <v-btn
              class="ma-2"
              color="green"
              nuxt
              :to="elevation.link"
            >
              детальніше
            </v-btn>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    elevations: [
      {
        title: 'Вантажоперевезення',
        src: 'https://drive.google.com/uc?export=view&id=13JKitjfCgysOyZhGHwMLgJ5Ch2s7DkY_',
        link: '/inspire'
      },
      {
        title: 'Тріска для копчення',
        src: 'https://drive.google.com/uc?export=view&id=1VaLfVyfEymKFLugIx0lzcxpNqDUHJYMf',
        link: '/chip'
      },
      {
        title: 'Вирубка фруктових дерев',
        src: 'https://drive.google.com/uc?export=view&id=1Y42x6uaZjWBvMy8XhLSipZrYsoS09au3',
        link: '/trees'
      }
    ],
    arrayCover: [
      'https://drive.google.com/uc?export=view&id=1CLUg5PIEDS91Y0RZywyEmR2_jmObrUca'
    ],
    arrayCover2: [
      'https://drive.google.com/uc?export=view&id=13JKitjfCgysOyZhGHwMLgJ5Ch2s7DkY_'
    ],
    arrayCover3: [
      'https://drive.google.com/uc?export=view&id=1VaLfVyfEymKFLugIx0lzcxpNqDUHJYMf'
    ]
  }),
  computed: {
    Cover () {
      return this.arrayCover[Math.floor(Math.random() * this.arrayCover.length)]
    },
    Cover2 () {
      return this.arrayCover2[Math.floor(Math.random() * this.arrayCover2.length)]
    },
    Cover3 () {
      return this.arrayCover3[Math.floor(Math.random() * this.arrayCover3.length)]
    }
  }
}
</script>
