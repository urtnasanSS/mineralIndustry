<template>
  <div style="margin-top:30px;">
    <GroupTitle :name="lang == 'mn' ? 'Хэрэгцээт холбоос' : 'Links'" title-margin-bottom="10px" />
    <div class="logoSize">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <marquee-text :duration="slides.length * 10" :paused="paused">
            <nuxt-link
              @mouseover.native="paused = true"
              @mouseleave.native="paused = false"
              v-for="unit in AllData"
              :key="unit.id"
              :href="unit.link"
              :to="unit.link"
              target="_blank"
              style="float: left; margin-right: 100px"
            >
              <div :title="unit.name">
                <img :href="unit.link" :src="baseUrl + unit.files[0].storageName" class="imageSize" />
                <p class="textSize">{{ lang == 'mn' ? unit.name : unit.nameEn }}</p>
              </div>
            </nuxt-link>
          </marquee-text>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>
    </div>
  </div>
</template>
<script>
import LinksServices from '~/services/LinksServices'
import GroupTitle from '~/components/custom/GroupTitle.vue'
export default {
  name: '',
  components: { GroupTitle },
  data () {
    return {
      baseUrl: process.env.baseUrl,
      AllData: [],
      slides: [],
      paused: false,
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 2,
        slidesPerGroup: 6,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      lang: ''
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted() {
    setTimeout(() => {
    }, 2000)
    this.mySwiper.slideTo(1)
  },
  created () {
    this.refDatas()
    this.lang = this.$store.state.language.language.code
  },
  destroyed () {},
  methods: {
    async refDatas () {
      this.AllData = (await LinksServices.index()).data
      const list = this.AllData
      this.slides = list
    }
  }
}
</script>
<style lang="scss" scoped>
.logoSize {
  margin-top: 10px;
  padding: 30px 0px 20px 0px;
  width: 90%;
  margin-left: 5%;
  text-align: center;
  .imageSize {
    height: 100px;
    max-width: 130px;
  }
  .textSize {
    font-size: 14px;
    text-transform: uppercase;
    line-height: 1.2;
    max-width: 130px;
  }
}
</style>
