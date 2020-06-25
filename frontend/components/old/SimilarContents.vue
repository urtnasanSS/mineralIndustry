<template>
  <div class="similarNews">
    <div style="margin:50px 20px 20px 20px !important;">
      <el-divider content-position="left">
        {{ lang == 'mn' ? 'Холбоотой мэдээ' : 'Related news' }}
      </el-divider>
    </div>
    <div class="columns is-multiline is-mobile">
      <div v-for="item in data" :key="item.id" class="column is-4">
        <div class="column is-11" style="height:222px">
          <div v-if="item.files && item.files.filter(c=> c.fileType.includes('image')).length > 0" class="card-image">
            <figure v-for="(value, count) in item.files.filter(i=> i.fileType.includes('image'))" :key="count.id" class="image is-4by3 customImage">
              <div v-if="count == 0">
                <img :src="baseUrl + value.storageName" class="image1">
              </div>
            </figure>
          </div>
          <div v-else-if="item.youtubeIframe.length > 0" style="height:100%;">
            <iframe width="100% " style="height:100%;" :src="'http://www.youtube.com/embed/' + item.youtubeIframe" />
          </div>
          <div v-else-if="item.files.filter(c=> c.fileType.includes('video')).length > 0 " style="height:100%;">
            <div
              v-for="(file, count) in item.files.filter(c=> c.fileType.includes('video'))"
              :key="count.id"
              style="height:100%;"
            >
              <div v-if="count == 0" style="height:100%;">
                <div class="videodetail" width="100%" style="height:100%;" controls>
                  <video controls style="height:100%;">
                    <source :src="baseUrl + file.storageName" fileType="video/mp4">
                    <source :src="baseUrl + file.storageName" fileType="video/ogg">
                    Таны хөтөч энэхүү бичлэгийг тоглуулах боломжгүй байна.
                  </video>
                </div>
              </div>
            </div>
          </div>
          <el-image v-else class="error noImage">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </div>
        <div class="column is-11">
          <div class="media">
            <div class="media-content">
              <p class="title is-4" @click="handleClickMore(item)">
                {{ lang == 'mn' ? item.title : item.titleEn }}
              </p>
              <p class="subtitle is-6">
                <i class="fas fa-eye" /> {{ item.count }}
                <i
                  v-if="item.publishDate"
                  class="fas fa-clock"
                  style="margin-left:10px;"
                />
                {{ moment(item.publishDate).format("YYYY-MM-DD") }}
              </p>
            </div>
          </div>
          <div class="content">
            <!-- {{ this.$store.state.language.language.code == 'mn' ? item.description : item.descriptionEn }} -->
            {{ lang == 'mn' ? item.description : item.descriptionEn }}
            <br>
          </div>
          <CustomButton type="big" :item="item" @handleClickMore="handleClickMore" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ContentServices from '../../frontend/services/ContentServices'
import CustomButton from '~/components/custom/Button.vue'
export default {
  name: 'SimilarContents',
  components: {
    CustomButton
  },
  props: {
    categoryId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      listQuery: {
        limit: 3,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          categoryId: this.categoryId
        }
      },
      lang: '',
      data: [],
      list: [],
      baseUrl: process.env.baseUrl
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  created () {
    this.getData()
  },
  destroyed () {},
  methods: {
    moment,
    getData () {
      this.lang = this.$store.state.language.language.code
      ContentServices.index(this.listQuery).then((response) => {
        this.data = response.data.rows
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
.similarNews {
  margin-top: 20px;
  .columns {
    .column {
      .is-11{
        margin-left: 5%;
        .noImage {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #f5f7fa;
          color: #909399;
          font-size: 25px;
        }
      }
      .media {
        .media-content {
          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            text-transform: uppercase;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 19px;
          }
          .subtitle {
            padding: 10px 0px;
            float: right;
            font-size: 12px;
            color: #909399;
          }
        }
      }
      .content {
        color: #909399;
        text-align: justify;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
