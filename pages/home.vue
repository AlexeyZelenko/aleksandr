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
          />
        </v-card>
        <div>
          <logo />
        </div>
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
    arrayCover: [
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2F1616771447_24-p-baraban-krasivo-30.jpg?alt=media&token=0e729d58-f09b-40d2-920f-618991ab1e95',
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2F391ebb2c69448ece46c429da8e8853c1.jpg?alt=media&token=ab9b1bde-d5c2-4f4f-b06b-0e46cb83894f',
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2F60-muzikalen-instrument-b.jpg?alt=media&token=8a12b3d6-3843-4724-863a-2160c540cc7a',
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2Fbarabany-palochki-makro-chiorno-beloe.jpg?alt=media&token=bf5645a9-ff05-4bdf-8f4f-832109d4feb9',
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2Fd691b8c27fdbe5aa9c9ee33a9610f514.jpeg?alt=media&token=cda56cab-e1a7-418b-af1c-b63d8677d124',
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2Fdrummer-playing-drums-on-stage-gm499754206-80419285-1024x576-1.jpg?alt=media&token=d479922e-aad4-4bf9-9014-625e448f9c63',
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2Fpiano-hand-piano-keys.jpg?alt=media&token=93478e07-dbc5-4603-91d1-f8acd9e0e4da',
      'https://firebasestorage.googleapis.com/v0/b/oleksandr-3787c.appspot.com/o/Site_foto%2Fpiano-keys-wallpaper-preview.jpg?alt=media&token=ce5bd93c-e271-4f42-b22b-b960982524f1'
    ]
  }),
  computed: {
    Cover () {
      return this.arrayCover[Math.floor(Math.random() * this.arrayCover.length)]
    }
  }
}
</script>
