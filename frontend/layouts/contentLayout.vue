<template>
  <div>
    <HeaderWithNavbar
      :sidebar-and-marqueeoffset-top="sidebarAndMarqueeoffsetTop"
    />
    <div ref="sidebarAndMarquee" class="container has-background-white" style="margin-top:30px;">
      <!-- <Marquee /> -->
      <!-- <TabAndList /> -->
      <div class="columns is-gapless">
        <div class="column is-10">
          <nuxt />
        </div>
        <div class="column is-2">
        </div>
      </div>
    </div>
    <div class="container has-background-white is-gapless">
    </div>
    <foother />
  </div>
</template>
<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import foother from '~/components/foother.vue'
export default {
  components: {
    HeaderWithNavbar,
    foother
  },
  data () {
    return {
      lang: '',
      baseUrl: process.env,
      sidebarAndMarqueeoffsetTop: 0
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
  },
  created () {
    this.lang = this.$store.state.language.language.code
  },
  methods: {
  }
}
</script>
