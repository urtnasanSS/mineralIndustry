<template>
  <div>
    <HeaderWithNavbar
      :sidebar-and-marqueeoffset-top="sidebarAndMarqueeoffsetTop"
    />
    <div ref="sidebarAndMarquee" class="container has-background-white" style="margin-top:30px;">
      <div class="columns" style="margin-bottom: 0;">
        <div class="column is-11">
          <nuxt />
        </div>
        <div class="column is-1">
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
  methods: {
  }
}
</script>
