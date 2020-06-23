<template>
  <div v-show="isActive" style="padding: 10px;">
    <slot />
  </div>
</template>
<script>
// if (process.client) {
//   require('window')
// }
export default {
  name: 'Tab',
  props: {
    name: { type: String, required: true },
    // nameEn: { type: String, required: true },
    selected: { type: Boolean, default: false }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    // href () {
    //   if (this.name) {
    //     return '#' + this.name.toLowerCase().replace(/ /g, '-')
    //   }
    // }
  },
  watch: {},
  mounted () {
    this.isActive = this.selected
  },
  created () {
    // if (process.browser) {
    //     window.addEventListener('scroll', this.handleScroll);
    // }
  },
  destroyed () {
    // if (process.browser) {
    //     window.removeEventListener('scroll', this.handleScroll);
    // }
  },
  methods: {
    // handleScroll (event) {
    // 	if (this.$refs.navbarref){
    // 		console.log(this.$refs.navbarref.offsetParent.offsetHeight, 'this.$refs.navbarref')
    // 		if (event.target.scrollingElement.offsetTop >= this.$refs.navbarref.offsetTop){
    // 			console.log('ende')
    // 			this.$refs.navbarref.classList.add('sticky')
    // 		} else {
    // 			this.$refs.navbarref.classList.remove('sticky')
    // 		}
    // 	}
    // }
  }
}
</script>
