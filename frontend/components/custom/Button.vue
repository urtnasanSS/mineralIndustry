<template>
  <button :class="type" style="vertical-align:middle">
    <nuxt-link tag="span" :to="'/content/' + item.id">
      {{ lang == 'mn' ? 'Дэлгэрэнгүй' : 'Read more' }}
    </nuxt-link>
  </button>
</template>
<script>
export default {
  name: '',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'big'
    }
  },
  data () {
    return {
      lang: ''
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  created () {
    this.lang = this.$store.state.language.language.code
  },
  destroyed () {},
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.big {
  font-family: "Roboto Condensed";
  display: inline-block;
  border-radius: 4px;
  background-color: #3273dc;
  border: none;
  color: #ffffff;
  text-align: center;
  padding: 5px;
  width: 120px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  font-size: 1rem;
  height: 2.25em;
  justify-content: flex-start;
  line-height: 1.5;
  &:hover {
    background-color: #da0717;
    span {
      padding-right: 15px;
      &:after {
        opacity: 1;
        right: 0;
      }
    }
  }
  span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
    &:after {
      content: "\00bb";
      position: absolute;
      opacity: 0;
      top: 0;
      right: -20px;
      transition: 0.5s;
    }
  }
}
.small {
  font-family: "Roboto Condensed";
  display: inline-block;
  border-radius: 4px;
  background-color: #3273dc;
  border: none;
  color: #ffffff;
  text-align: center;
  padding: 3px;
  width: 70px;
  transition: all 0.5s;
  cursor: pointer;
  // margin: 5px;
  font-size: 0.6rem;
  height: 2.25em;
  justify-content: flex-start;
  line-height: 1.5;
  &:hover {
    background-color: #da0717;
    span {
      padding-right: 8px;
      &:after {
        opacity: 1;
        right: 0;
      }
    }
  }
  span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
    &:after {
      content: "\00bb";
      position: absolute;
      opacity: 0;
      top: 0;
      right: -20px;
      transition: 0.5s;
    }
  }
}
</style>
