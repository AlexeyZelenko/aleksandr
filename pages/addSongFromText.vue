<template>
  <div>
    <form>
      <v-textarea
        v-model="textSong"
        clearable
        clear-icon="mdi-close-circle"
        label="Text"
        value="This is clearable text."
      />

      <v-btn
        class="mr-4"
        @click="addSong"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>

    <v-row
      class="ma-4"
      justify="center"
    >
      <v-dialog
        v-model="dialog"
        width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            @click="viewSong"
          >
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Use Google's location service?</span>
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor. Ultrices nascetur nulla gravida ante arcu. Pharetra rhoncus morbi ipsum, nunc tempor debitis, ipsum pellentesque, vitae id quam ut mauris dui tempor, aptent non. Quisque turpis. Phasellus quis lectus luctus orci eget rhoncus. Amet donec vestibulum mattis commodo, nulla aliquet, nibh praesent, elementum nulla. Sit lacus pharetra tempus magna neque pellentesque, nulla vel erat.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Disagree
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { parseTextSong } from '../helpers/utils'

export default {
  name: 'AddSongFromText',
  data () {
    return {
      textSong: '',
      parseTextSong: null,
      dialog: false,
      songsJson: null
    }
  },
  methods: {
    addSong () {
      if (this.textSong) {
        this.parseTextSong = parseTextSong(this.textSong)
        // eslint-disable-next-line no-console
        console.log('parseTextSong', this.parseTextSong)

        this.songsJson = JSON.stringify(this.parseTextSong)
      }
    },
    clear () {
      this.textSong = ''
    },
    viewSong () {
      // eslint-disable-next-line no-console
      console.log('viewSong', this.songsJson)

      const parsedData = JSON.parse(this.songsJson)
      // eslint-disable-next-line no-console
      console.log('File contents:', parsedData)
    }
  }
}
</script>

<style scoped>

</style>
