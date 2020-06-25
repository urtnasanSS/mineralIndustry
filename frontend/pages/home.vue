<template>
  <div>
    <HeaderWithNavbar
      :sidebar-and-marqueeoffset-top="sidebarAndMarqueeoffsetTop"
    />
    <SlideBar />
    <div ref="sidebarAndMarquee" class="container has-background-white">
      <div class="columns is-gapless">
        <div class="column is-9">
        </div>
        <div class="column is-3">
          <RelatedNews />
        </div>
      </div>
    </div>
    <div class="container has-background-white is-gapless">
    </div>
    <Contact />
    <div class="container">
      <div class="columns" style="margin-top:5px; font-size: 14px;">
        <div class="column is-4">
          2020 © УУЛ УУРХАЙ ХҮНД ҮЙЛДВЭРИЙН ЯАМ.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import SlideBar from '~/components/SlideBar.vue'
import RelatedNews from '~/components/RelatedNews.vue'
import Contact from '~/components/Contact.vue'
export default {
  components: {
    HeaderWithNavbar,
    RelatedNews,
    SlideBar,
    Contact
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
