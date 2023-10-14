<template>
  <div class="category-songs-select">
    <p
      v-for="option in options"
      :key="option.value"
      :class="{ active: option.name === selectedOptions }"
      @click.stop="selectOption(option)"
    >
      {{ option.name }}
    </p>
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
      padding: 5px;
      border: 1px solid #6c6262;
      border-radius: 5px;
      margin: 0 5px;

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
