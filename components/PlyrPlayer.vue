<template>
  <div>
    <vue-plyr ref="plyr">
      <div
        class="plyr__video-embed"
        data-plyr-provider="youtube"
        :data-plyr-embed-id="videoId"
      />
    </vue-plyr>
  </div>
</template>

<script>
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

export default {
  name: 'PlyrPlayer',
  components: {
    VuePlyr
  },
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$refs.plyr.player.on('ready', () => {
      // eslint-disable-next-line
      console.log('Plyr is ready')
    })
  },
  beforeDestroy () {
    if (this.$refs.plyr && this.$refs.plyr.player) {
      this.$refs.plyr.player.destroy() // Уничтожаем экземпляр Plyr перед удалением компонента
    }
  }
}
</script>
