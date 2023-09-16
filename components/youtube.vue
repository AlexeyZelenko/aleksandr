<template>
  <div class="youtube">
    <vue-plyr>
      <div class="plyr__video-embed">
        <iframe
          :src="`https://www.youtube.com/embed/${extractVideoId}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        />
      </div>
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
