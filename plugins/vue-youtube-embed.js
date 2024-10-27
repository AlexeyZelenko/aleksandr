import Vue from 'vue'
import VueYoutubeEmbed from 'vue-youtube-embed'

if (process.client) {
  Vue.use(VueYoutubeEmbed)
}
