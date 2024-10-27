<template>
  <div style="margin-top: 20px">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: currentTab === tab.name }"
        @click="changeTab(tab.name)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Используем keep-alive для предотвращения ошибок при переключении -->
    <component
      :is="currentTabComponent"
      v-if="currentVideoId"
      :video-id="currentVideoId"
    />
  </div>
</template>

<script>
import VueYouTubeEmbed from 'vue-youtube-embed'
import Vue from 'vue'
import PlyrPlayer from './PlyrPlayer.vue'
import EmbedPlayer from './EmbedPlayer.vue'

Vue.use(VueYouTubeEmbed)

export default {
  name: 'YouTubePlayerTabs',
  components: {
    PlyrPlayer,
    EmbedPlayer
  },
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentTab: 'Plyr',
      tabs: [
        { name: 'Plyr', label: 'Player 1' },
        { name: 'EmbedPlayer', label: 'Player 2' }
      ],
      videoIdCache: {}
    }
  },
  computed: {
    currentTabComponent () {
      switch (this.currentTab) {
        case 'Plyr':
          return 'PlyrPlayer'
        case 'EmbedPlayer':
          return 'EmbedPlayer'
        default:
          return null
      }
    },
    currentVideoId () {
      const currentLink = this.links[0]?.link
      return this.extractVideoId(currentLink)
    }
  },
  methods: {
    extractVideoId (link) {
      if (!link) { return null }
      if (this.videoIdCache[link]) {
        return this.videoIdCache[link]
      }

      const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([a-zA-Z0-9_-]{11})/
      const match = link.match(regex)

      if (match && match[1]) {
        this.videoIdCache[link] = match[1]
        return match[1]
      }
      return null
    },
    changeTab (tabName) {
      this.currentTab = null
      setTimeout(() => {
        this.currentTab = tabName
      }, 100)
    }
  }
}
</script>

<style scoped>
.tabs {
  display: flex;
  margin-bottom: 10px;
}
.tabs button {
  padding: 10px;
  margin-right: 5px;
  cursor: pointer;
  border: none;
  background: #e0e0e0;
}
.tabs button.active {
  background: #6200ea;
  color: white;
}
</style>
