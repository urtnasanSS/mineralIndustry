<template>
  <div class="groupTitle" :style="`border-bottom: solid 1px ${longlineColor};`">
    <span :style="`color:${titleColor}; margin-bottom: ${titleMarginBottom}`">{{
      name
    }}</span>
    <div
      class="bottomLine"
      :style="`background-color: ${shortlineColor}; width: ${width}`"
    />
  </div>
</template>
<script>
export default {
  name: 'Adasdas',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    longlineColor: {
      type: String,
      default: '#c4dbf6'
    },
    shortlineColor: {
      type: String,
      default: '#3b8beb'
    },
    width: {
      type: String,
      default: '150px'
    },
    titleColor: {
      type: String,
      default: '#303133'
    },
    titleMarginBottom: {
      type: String,
      default: '0px'
    }
  },
  data () {
    return {
      // name: 'Эрэлттэй мэдээ',
      // longlineColor: '#c4dbf6',
      // shortlineColor: '#3b8beb',
      // width: '150px'
    }
  },
  watch: {},
  created () {},
  destroyed () {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.groupTitle {
  font-weight: bold;
  text-align: center;
  padding: 8px 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    text-transform: uppercase;
    font-size: 1rem;
    color: #303133;
  }
  .bottomLine {
    height: 5px;

    position: absolute;
    bottom: -3.5px;
  }
}
</style>
