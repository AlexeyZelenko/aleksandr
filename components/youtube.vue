<template>
  <div class="youtube">
    <vue-plyr>
      <div
        data-plyr-provider="youtube"
        :data-plyr-embed-id="extractVideoId"
        :youtube="youtubeOptions"
      />
    </vue-plyr>
  </div>
</template>

<script>
export default {
  name: 'Youtube',
  props: {
    link: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      playerOptions: {
        height: '360',
        width: '640',
        resize: true,
        start: 10,
        end: 0,
        autoplay: 1
      },
      youtubeOptions: {
        start: 10,
        end: 0,
        autoplay: 1
      }
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    },
    extractVideoId () {
      const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))(.*?)(?:\?t=|&t=|&start=|&index=|&list=|$|\n)/

      const match = this.link.match(regex)

      if (match && match[1]) {
        return match[1]
      } else {
        return null
      }
    }
  }
}
</script>
