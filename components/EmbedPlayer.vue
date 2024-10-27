<template>
  <div class="iframe-container">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  name: 'EmbedPlayer',
  props: {
    videoId: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* Соотношение 16:9 */
  height: 0;
  overflow: hidden;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
