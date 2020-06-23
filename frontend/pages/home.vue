<template>
  <div>
    <HeaderWithNavbar
      :sidebar-and-marqueeoffset-top="sidebarAndMarqueeoffsetTop"
    />
    <div ref="sidebarAndMarquee" class="container has-background-white">
      <SlideBar />
      <Marquee />

      <div class="columns is-gapless">
        <div class="column is-9">
          <!-- <TabSide /> -->
        </div>
        <div class="column is-3">
          <!-- <RelatedNews /> -->
        </div>
      </div>
      <!-- <bigBanner /> -->
    </div>
    <Videos />
    <div class="container has-background-white is-gapless">
      <!-- <ServiceAndArchive /> -->
      <!-- <Links /> -->
    </div>
    <!-- <Contact /> -->
    <div class="container">
      <div class="columns" style="margin-top:5px; font-size: 14px;">
        <div class="column is-4">
          www.archives.gov.mn
        </div>
        <div class="column is-8 is-right" style="text-align:right">
          {{ lang == 'mn' ? 'Зохиогчийн эрх © 2019. Бүх эрхийг хуулиар хамгаалсан. УХААЛАГ ШИЙДЭЛ ХХК' : 'Copyright © 2019. All Rights Reserved. Ухаалаг шийдэл XXK' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import SlideBar from '~/components/SlideBar.vue'
import Marquee from '~/components/Marquee.vue'
// import bigBanner from '~/components/bigBanner.vue'
// import TabSide from '~/components/TabSide.vue'
// import Videos from '~/components/Videos.vue'
// import ServiceAndArchive from '~/components/ServiceAndArchive.vue'
// import Links from '~/components/Links.vue'
// import RelatedNews from '~/components/RelatedNews.vue'
// import Contact from '~/components/Contact.vue'
export default {
  components: {
    HeaderWithNavbar,
    SlideBar,
    // TabSide,
    // bigBanner,
    // ServiceAndArchive,
    // Videos,
    Marquee
    // RelatedNews,
    // Links,
    // Contact
  },
  data () {
    return {
      lang: '',
      showModal: false,
      sidebarAndMarqueeoffsetTop: 0
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  created () {
    this.lang = this.$store.state.language.language.code
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed () {},
  methods: {
    handleScroll () {
      // navbar-ын өндөрийг авахын тулд хэрэглэв.
      // const sidebarAndMarquee = this.$refs.sidebarAndMarquee
      // const sticky = sidebarAndMarquee.offsetTop
      // this.sidebarAndMarqueeoffsetTop = sticky
    }
  }
}
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.5s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
