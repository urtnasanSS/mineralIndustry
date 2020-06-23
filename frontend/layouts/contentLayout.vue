<template>
  <div>
    <HeaderWithNavbar
      :sidebar-and-marqueeoffset-top="sidebarAndMarqueeoffsetTop"
    />
    <div ref="sidebarAndMarquee" class="container has-background-white" style="margin-top:30px;">
      <!-- <Marquee /> -->
      <!-- <TabAndList /> -->
      <div class="columns is-gapless">
        <div class="column is-9">
          <nuxt />
        </div>
        <div class="column is-3">
          <RelatedNews />
          <videoOne />
        </div>
      </div>
    </div>
    <bigBanner />
    <div class="container has-background-white is-gapless">
      <Links />
    </div>
    <Contact />
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
// import SlideBar from '~/components/SlideBar.vue'
import bigBanner from '~/components/bigBanner.vue'
// import Marquee from '~/components/Marquee.vue'
import videoOne from '~/components/videoOne.vue'
import Links from '~/components/Links.vue'
import RelatedNews from '~/components/RelatedNews.vue'
import Contact from '~/components/Contact.vue'
export default {
  components: {
    HeaderWithNavbar,
    // SlideBar,
    videoOne,
    // Marquee,
    bigBanner,
    RelatedNews,
    Links,
    Contact
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
