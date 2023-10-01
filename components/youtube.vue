<template>
  <div>
    <div
      v-for="(item, i) in linksYoutube"
      :key="i"
      class="youtube"
    >
      <vue-plyr>
        <div
          class="plyr__video-embed"
        >
          <iframe
            :src="item.extractVideoId"
            allowfullscreen
            allowtransparency
            allow="autoplay"
          />
        </div>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Youtube',
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      videoIdCache: {},
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
    linksYoutube () {
      return this.links.map((item) => {
        return {
          link: item.link,
          extractVideoId: this.extractVideoId(item.link)
        }
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  methods: {
    extractVideoId (link) {
      if (this.videoIdCache[link]) {
        return this.videoIdCache[link]
      }

      const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))(.*?)(?:\?t=|&t=|&start=|&index=|&list=|$|\n)/
      const match = link.match(regex)

      if (match && match[1]) {
        this.videoIdCache[link] = `https://www.youtube.com/embed/${match[1]}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`

        return `https://www.youtube.com/embed/${match[1]}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`
      } else {
        return null
      }
    }
  }
}
</script>
