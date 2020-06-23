<template>
  <div>
    <p>{{ list }}</p>
  </div>
</template>
<script>
export default {
  layout: 'adminLayout',
  data () {
    return {
      list: []
    }
  },
  watch: {},
  created () {
    this.list = JSON.parse(JSON.stringify(this.$store.getters.userKey))
  }
}
</script>
