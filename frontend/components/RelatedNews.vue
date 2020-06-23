<template>
  <div class="newsOuter">
    <GroupTitle :name="lang == 'mn' ? 'Эрэлттэй мэдээ' : 'Related News'" />
    <div class="news">
      <div class="columns">
        <div class="column is-full">
          <figure class="image is-4by3 relatedLast">
            <div v-if="files && files.length >0">
              <div v-for="(value, count) in files" :key="count.id">
                <div v-if="count == 0">
                  <img :src="baseUrl + value.storageName" alt="Placeholder image" class="image2">
                </div>
              </div>
            </div>
            <div v-else class="error customImage">
              <div slot="error" class="image-slot-top">
                <i class="el-icon-picture-outline" />
              </div>
            </div>
            <div class="relatedLastText">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4" @click="handleClickMore(firstValue)">
                    {{ lang == 'mn' ? firstValue.title : firstValue.titleEn }}
                  </p>
                  <p class="subtitle is-6">
                    <i class="fas fa-eye" /> {{ firstValue.count }}
                    <i class="fas fa-clock" style="margin-left:10px;" />
                    {{ moment(firstValue.createdAt).format("YYYY-MM-DD") }}
                  </p>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>
      <div class="newslist">
        <div v-for="item in list" :key="item.id" class="columns">
          <div class="column">
            <div class="columns">
              <div class="column is-3">
                <div class="card-image">
                  <figure v-for="(image, count) in item.files.filter(i => i.fileType.includes('image'))" :key="count.id" class="image is-4by3 customImageClass">
                    <div v-if="count == 0">
                      <img :src="baseUrl + image.storageName" alt="">
                    </div>
                  </figure>
                </div>
              </div>
              <div class="column is-9">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">
                      {{ lang == 'mn' ? item.title : item.titleEn }}
                    </p>
                    <p class="subtitle is-6">
                      <i class="fas fa-eye" /> {{ item.count }}
                      <i class="fas fa-clock" style="margin-left:10px;" />
                      {{ moment(item.createdAt).format("YYYY-MM-DD") }}
                    </p>
                  </div>
                </div>

                <CustomButton type="small" :item="item" @handleClickMore="handleClickMore" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import GroupTitle from '~/components/custom/GroupTitle.vue'
import CustomButton from '~/components/custom/Button.vue'
import ContentServices from '~/services/ContentServices'
export default {
  name: 'RelatedNews',
  components: {
    GroupTitle,
    CustomButton
  },
  data () {
    return {
      list: [],
      files: [],
      firstValue: [],
      firstValueImage: [],
      baseUrl: process.env.baseUrl,
      lang: '',
      listQuery: {
        limit: 4,
        currentPage: 1,
        sort: {
          prop: 'count',
          order: 'descending'
        },
        search: {
          categoryIds: [1, 2, 3]
        }
      }
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
    this.getData()
  },
  destroyed () {},
  methods: {
    moment,
    getData () {
      ContentServices.index(this.listQuery).then((response) => {
        const data = response.data
        this.list = JSON.parse(JSON.stringify(data.rows))
        this.firstValue = this.list.shift()
        this.files = this.firstValue.files.filter(i => i.fileType.includes('image'))
        // console.log(this.list, 'another')
      }).catch((err) => {
        this.list = []
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    },
    handleClickMore (item) {
      if (item) {
        this.$nuxt.$router.replace({ path: '/content/' + item.id })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.newsOuter {
  padding-left: 10px;
  .news {
    margin-top: 34px;
    margin-bottom: 20px;
    .image2 {
      object-fit: cover;
      object-position: 50% 25%;
    }
    .customImage {
      color: #909399;
      height: 100%;
      font-size: 20px;
      // padding-top: unset !important;
      // height: 100%;
      // .image-slot-top {
      //   font-size: 30px;
      //   position: relative;
      //   height: 100%;
      //   width: 100%;
      //   text-align: center;
      // }
    }
    .newslist {
      .image-slot {
        font-size: 24px;
        text-align: center;
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 12px;
        margin-bottom: 18px;
      }
      .subtitle {
        padding: 5px 0px 0px 0px;
        font-size: 10px;
        color: #909399;
      }
    }
    .relatedLast {
    background: #f5f7fa;
      min-height: 250px;
      padding: 0px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .relatedLastText {
        position: absolute;
        width: 100%;
        bottom: 0;
        background-color: #0000006c;
        padding: 10px;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 16px;
          margin-bottom: 25px;
          color: white;
        }
        .subtitle {
          padding: 5px 0px 0px 0px;
          font-size: 10px;
          color: white;
        }
      }
    }
  }
}
.customImageClass{
  padding: 0px;
  height: 100%;
  .image1{
    height: 100%;
    width: 100%;
  }
}
</style>
