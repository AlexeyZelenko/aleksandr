<template>
  <div class="v-select">
    <p
      v-if="selected"
      class="title"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      {{ selected }}
    </p>
    <p
      v-else
      class="title"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      Категорії
    </p>
    <div
      v-if="areOptionsVisible || isExpanded"
      class="options"
    >
      <p
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VSelect',
  props: {
    options: {
      type: Array,
      default () {
        return {}
      }
    },
    selected: {
      type: String,
      default: ''
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      areOptionsVisible: false
    }
  },
  // mounted () {
  //   document.addEventListener('click', this.hideSelect.bind(this), true)
  // },
  // beforeDestroy () {
  //   document.removeEventListener('click', this.hideSelect)
  // },
  methods: {
    selectOption (option) {
      this.$emit('select', option)
      this.areOptionsVisible = false
    },
    hideSelect () {
      this.areOptionsVisible = false
    }

  }
}
</script>

<style>
  .v-select {
    position: relative;
    width: 150px;
    cursor: pointer;
    text-align: left;
    margin: 15px auto;
  }
  .title {
    border: solid 1px #aeaeae;
    padding: 8px;
  }
  .v-select p {
    margin: 0;
  }

  .options {
    border: solid 1px #aeaeae;
    background: #636262;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    padding: 8px;
  }

  .options p {
    margin: 0;
    padding: 8px;
    cursor: pointer;
  }

  .options p:hover {
    background: #785050;
  }
</style>
