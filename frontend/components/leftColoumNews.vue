<template>
  <div>
    <div>
      <div id="left_coloum_top" v-for="(value, index) in list" :key="value">
        <div v-if="index === 0">
          <h3>{{ value.title }} </h3>
          <img :src="baseUrl + value.files[0].storageName" style="width:auto;height:auto;" alt="Placeholder image">
        </div>
      </div>
      <div class="column is-12" style="height:335px;">
        <Slider
          v-if="slides.length > 0"
          :images="slides"
          :interval-duration="slideDuration"
          :height="'335px'"
          :width="'1000px'"
          class="sliderClass"
          style="overflow: hidden; width:100%;"
        />
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ContentServices from '~/services/ContentServices'
import Slider from '~/components/custom/Slider.vue'
export default {
  name: 'RelatedNews',
  components: {
    Slider
  },
  data () {
    return {
      list: [],
      files: [],
      slides: [],
      firstValue: [],
      slideDuration: 400000,
      firstValueImage: [],
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 3,
        currentPage: 1,
        sort: {
          prop: 'publishDate',
          order: 'descending'
        },
        search: {
          categoryIds: [4]
        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    moment,
    getData () {
      ContentServices.index(this.listQuery).then((response) => {
        if (response.data && response.data.rows) {
          const list = response.data.rows
          const data = []
          for (const item of list) {
            data.push({ id: item.id, url: this.getFileUrl(item), title: item.title.length > 100 ? item.title.slice(0, 100) + '...' : item.title, isShow: false })
          }
          this.slides = data
        }
        this.loadingContent = false
      }).catch((err) => {
        this.list = []
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
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
    }
  }

}
</script>
<style lang="scss" scoped>
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
#left_coloum_top h3{
float: left;
width: 100%;
height: auto;
font-family: SegoeUI;
font-size: 18px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #000000;
}
#left_coloum_top img{
width: 100%;
height: auto;
float: left;
}

</style>
