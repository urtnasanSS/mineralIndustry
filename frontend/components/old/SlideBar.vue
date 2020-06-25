<template>
  <div class="columns is-gapless" style="margin-top:5px;">
    <div class="column is-8" style="height:335px;">
      <Slider
        v-if="slides.length > 0"
        :images="slides"
        :interval-duration="slideDuration"
        :height="'335px'"
        :width="'1000px'"
        class="sliderClass"
        style="overflow: hidden; width:100%;"
        @handleClickTitle="handleClickTitle"
      />
    </div>
    <div class="column is-4" style="padding-left:5px !important;">
      <div class="columns is-gapless is-paddingless is-marginless">
        <div class="column is-6">
          <div class="menuButton" style="background-color:#da0717; " @click="OnlineSearch()">
            <div class="columns ">
              <div class="column is-4 iconSide">
                <span class="icon">
                  <i class="fas fa-search" />
                </span>
              </div>
              <div class="column is-8 textSide">
                <span class="text">{{ lang == 'mn' ? 'Баримтын онлайн хайлт' : 'Document online search' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6" style="padding-left:5px !important;">
          <div class="menuButton" style="background-color:#3b8beb; cursor:pointer" @click="$nuxt.$router.replace({ path: '/faq' })">
            <div class="columns ">
              <div class="column is-4 iconSide">
                <span class="icon">
                  <i class="fas fa-reply" />
                </span>
              </div>
              <div class="column is-8 textSide">
                <span class="text">{{ lang == 'mn' ? 'Түгээмэл асуулт, хариулт' : 'Frequently Asked Questions' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-gapless is-paddingless is-marginless" style="margin-top:5px !important;">
        <div class="column is-6">
          <div class="menuButton" style="background-color:#3b8beb; ">
            <div class="columns " @click="handleClickOnline">
              <div class="column is-4 iconSide">
                <span class="icon">
                  <i class="fas fa-file" />
                </span>
              </div>
              <div class="column is-8 textSide">
                <span class="text">{{ lang == 'mn' ? 'Онлайн лавлагаа авах' : 'Get online inquiry' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6" style="padding-left:5px !important; ">
          <div class="menuButton" style="background-color:#da0717; ">
            <div class="columns" @click="$nuxt.$router.replace({ path: '/content/217' })">
              <div class="column is-4 iconSide">
                <span class="icon">
                  <i class="fas fa-user" />
                </span>
              </div>
              <div class="column is-8 textSide">
                <span class="text">{{ lang == 'mn' ? 'Иргэдийг хүлээн авах хуваарь' : 'Schedule of citizens' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="miniBanner.id > 0" v-loading="loadingMiniBanner" class="miniBanner">
        <div v-for="data in miniBanner.files" :key="data.id">
          <img :src="baseUrl + data.storageName" alt="" class="miniImage">
        </div>
        <div class="bannerInner">
          <div class="bannerText">
            <a :href="miniBanner.link" target="_blank"><H3 style="color:white;text-transform:uppercase; font-size:26px; font-weight:bold;">
              {{ lang == 'mn' ? miniBanner.name : 'General archives' }}
            </H3></a>
          </div>
        </div>
        <div class="layer" />
      </div>
      <div v-else>
      </div>
    </div>
  </div>
</template>
<script>
import OnlineCountService from '../services/OnlineCountService'
import BannerServices from '~/services/BannerServices'
import ContentServces from '~/services/ContentServices'
import Slider from '~/components/custom/Slider.vue'
export default {
  components: {
    // BannerServices,
    Slider
  },
  data () {
    return {
      loadingMiniBanner: false,
      loadingContent: false,
      lang: '',
      miniBanner: {},
      slideDuration: 4000,
      slides: [],
      listQueryBanner: {
        limit: 10,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          bannerTypeId: 1
        }
      },
      listQuery: {
        limit: 10,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          isSpecial: true
        }
      },
      baseUrl: process.env.baseUrl
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
    this.getMiniBanner()
    this.getSpecialContent()
  },
  methods: {
    getMiniBanner () {
      this.loadingMiniBanner = true
      BannerServices.index(this.listQueryBanner)
        .then((response) => {
          // console.log(response, 'response.data.rows11++++')
          if (response.data.rows[0]) {
            this.miniBanner = JSON.parse(JSON.stringify(response.data.rows[0]))
          }
          this.loadingMiniBanner = false
        })
        .catch((err) => {
          this.loadingMiniBanner = false
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
    },
    getFileUrl (item) {
      if (item.files && item.files) {
        const files = item.files.filter(i => i.fileType.includes('image'))
        // console.log(files[0], ' ---')
        if (files[0]) {
          return this.baseUrl + files[0].storageName
        } else {
          return this.baseUrl + 'noImageBackground.jpg'
        }
      } else {
        return this.baseUrl + 'noImageBackground.jpg'
      }
    },
    getSpecialContent () {
      this.loadingContent = true
      ContentServces.index(this.listQuery)
        .then((response) => {
          // console.log(response, 'response.data.rows11++++22')
          if (response.data && response.data.rows) {
            const list = response.data.rows
            const data = []
            for (const item of list) {
              // console.log(item, '++++')
              data.push({ id: item.id, url: this.getFileUrl(item), title: item.title.length > 100 ? item.title.slice(0, 100) + '...' : item.title, isShow: false })
            }
            this.slides = data
            // this.slides.push(data[5])
          }
          //    {
          //   id: 4,
          //   url: '/img/ub.jpg',
          //   title: 'МОНГОЛЫН АРХИТЕКТУРЫН ХӨГЖЛИЙН ӨНГӨРСӨН БА ОДОО',
          //   description:
          //     'Архитектурын бүтээл нь зөвхөн урлахуйн  асуудал биш бөгөөд  техник технологи, улс төр нийгэм, эдийн засаг, байгаль, физик, математик  зэрэг хэд хэдэн салбар шинжлэх ухааныг хамарсан инженерчлэлийн цогц бүтээл юм. Мөн архитектурын бүтээл нь гоо зүй, чанар, орон зайн төлөвлөлт, аюулгүй байдал, тав тух гээд хүний амьдралын олон талт хэрэгцээ шаардлагатай холбогддог маш өргөн ойлголт билээ. Тиймдээ ч  архитектурыг бүхий л урлагийн ээж хэмээн өргөмжилдөг.',
          //   isShow: false
          // }
          this.loadingContent = false
        })
        .catch((err) => {
          this.loadingContent = false
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
    },
    handleClickTitle (id) {
      if (id) {
        this.$nuxt.$router.replace({ path: '/content/' + id })
      }
    },
    handleClickOnline () {
      try {
        OnlineCountService.incrementCount()
        window.open('http://43.228.129.159:8088/eorder/?src=&agency=25&solved=', '_blank')
      } catch (err) {
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      }
    },
    OnlineSearch () {
      try {
        window.open('http://43.228.129.159/', '_blank')
      } catch (err) {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menuButton {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: white;
  height: 82px;
  .iconSide {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 28px;
    }
  }
  .textSide {
    line-height: 16px;
    padding-right: 10px;
    .text {
      font-size: 14px;
      text-transform: uppercase;
    }
  }
}
.miniBanner {
  margin-top: 5px;
  height: 162px;
  width: 100%;
  border-radius: 5px;
  z-index: 0;
  .miniImage {
    height: 162px;
    width: 100%;
    border-radius:5px;
  }
  .layer {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .bannerInner {
    margin: -147px 20px 20px 20px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border: solid 1px white;
    border-radius: 5px;
    z-index: 1;
    position: relative;
    .bannerText {
      height: 100%;
      padding: 7%;
      text-align: center;
    }
  }
}
.sliderClass{
  /deep/ .slideImage{
    // border:solid 1px red;
    // background-size: contain !important;
    .slideTitle{
      bottom: 40px !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      white-space: nowrap !important;
    }
  }
}
</style>
