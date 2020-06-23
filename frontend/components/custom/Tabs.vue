<template>
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :key="tab.name" :class="{ 'is-active': tab.isActive }">
          <a
            :href="tab.href"
            :style="
              `text-transform: uppercase; font-weight:${
                tab.isActive ? 'bold' : ''
              }; `
            "
            @click="selectTab(tab)"
          >{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <div class="tabs-details">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  data () {
    return { tabs: [] }
  },
  watch: {},
  created () {
    this.tabs = this.$children
  },
  destroyed () {
    // if (process.browser) {
    //     window.removeEventListener('scroll', this.handleScroll);
    // }
  },
  methods: {
    selectTab (selectedTab) {
      this.tabs.forEach((tab) => {
        tab.isActive = tab.name === selectedTab.name
      })
      this.$emit('handleClickTab', selectedTab.nameEn)
    }
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
