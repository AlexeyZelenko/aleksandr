<template>
  <div class="category-songs-select">
    <div
      v-for="option in options"
      :key="option.value"
      :class="{ active: option.name === selectedOptions }"
      @click.stop="selectOption(option)"
    >
      {{ option.name }}
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
      areOptionsVisible: false,
      selectedOptions: ''
    }
  },
  methods: {
    selectOption (option) {
      this.selectedOptions = option.name
      this.$emit('select', option)
      this.areOptionsVisible = false
    },
    hideSelect () {
      this.areOptionsVisible = false
    }

  }
}
</script>

<style lang="scss" scoped>
  .category-songs-select {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 20px;

    p {
      width: 100%;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 500;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: #f00;
      }

      @media (min-width: 768px) {
        font-size: 1.2rem;
      }
    }
  }

  .active {
    color: #4CAF50 !important;
  }
</style>
