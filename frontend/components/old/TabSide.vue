<template>
  <tabs class="customTab" @handleClickTab="handleClickTab">
    <tab v-for="i in customTabs" :key="i.id" v-loading="listLoading" :name="lang == 'mn' ? i.name : i.nameEn" :selected="i.selected">
      <div v-for="item in list" :key="item.id" class="columns">
        <div class="column">
          <div class="columns">
            <div class="column is-4">
              <div class="card-image">
                <figure class="image is-4by3 customImage">
                  <div v-if="item.files.filter(c=> c.fileType.includes('image')).length > 0 ">
                    <div
                      v-for="(file, count) in item.files.filter(c=> c.fileType.includes('image'))"
                      :key="count.id"
                    >
                      <div v-if="count == 0">
                        <img :src="baseUrl + file.storageName" alt="" class="image1">
                      </div>
                    </div>
                  </div>
                  <div v-else-if="item.files.filter(c=> c.fileType.includes('video')).length > 0 ">
                    <div
                      v-for="(file, count) in item.files.filter(c=> c.fileType.includes('video'))"
                      :key="count.id"
                    >
                      <div v-if="count == 0">
                        <div class="videodetail" width="100%" style="height:100%;" controls>
                          <video controls>
                            <source :src="baseUrl + file.storageName" fileType="video/mp4">
                            <source :src="baseUrl + file.storageName" fileType="video/ogg">
                            Таны хөтөч энэхүү бичлэгийг тоглуулах боломжгүй байна.
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="item.youtubeIframe.length > 0">
                    <div style="height:100%;">
                      <iframe width="100% " style="height:100%;" :src="'http://www.youtube.com/embed/' + item.youtubeIframe" />
                    </div>
                  </div>
                  <div v-else style="height: 100%;">
                    <el-image class="error">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline" />
                      </div>
                    </el-image>
                  </div>
                </figure>
              </div>
            </div>
            <div class="column is-8">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">
                    <!-- @click="handleClickMore(item)" -->
                    <nuxt-link :to="'/content/' + item.id">
                      {{ lang == 'mn' ? item.title : item.titleEn }}
                    </nuxt-link>
                  </p>
                  <p class="subtitle is-6">
                    <i class="fas fa-eye" />
                    {{ item.count }}
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
                {{ lang == 'mn' ? item.description : item.descriptionEn }}
                <br>
              </div>
              <CustomButton type="big" :item="item" />
            </div>
          </div>
        </div>
      </div>
      <div style="text-align:left;">
        <div class="block">
          <el-pagination
            background
            :page-sizes="[3, 6, 9, 12]"
            :page-size="listQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :current-page.sync="listQuery.currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </tab>
    <tab :name="lang == 'mn' ? 'Аудио мэдээ' : 'audioNews'">
      <audioNews />
    </tab>
    <tab :name="$lang == 'mn' ? 'Календар' : 'Calendar'">
      <timelines />
    </tab>
  </tabs>
</template>
<script>
import moment from 'moment'
import ContentServices from '../../frontend/services/ContentServices'
import Tabs from '~/components/custom/Tabs.vue'
import Tab from '~/components/custom/Tab.vue'
import timelines from '~/components/timelines.vue'
import audioNews from '~/components/audioNews.vue'
import CustomButton from '~/components/custom/Button.vue'
export default {
  components: {
    Tabs,
    Tab,
    CustomButton,
    timelines,
    audioNews
  },
  data () {
    return {
      customTabs: [
        { id: 1, name: 'Сүүлд нэмэгдсэн мэдээ', nameEn: 'lastNews', selected: true }
      ],
      baseUrl: process.env.baseUrl,
      list: [],
      lang: '',
      listLoading: false,
      total: 0,
      listQuery: {
        limit: 3,
        currentPage: 1,
        sort: {
          prop: 'publishDate',
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
  created () {
    this.lang = this.$store.state.language.language.code
    this.getList()
  },
  methods: {
    moment,
    getList () {
      this.listLoading = true
      ContentServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          this.list = JSON.parse(JSON.stringify(data.rows))
          // console.log(this.list, 'this.list')
          this.total = data.count
          this.listLoading = false
        })
        .catch((err) => {
          this.list = []
          this.total = 0
          this.listLoading = false
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleClickTab (name) {
      if (name === 'lastNews') {
        this.listQuery.search.categoryIds = [1, 2, 3]
      } else if (name === 'audioNews') {
        this.listQuery.search.categoryIds = [3] // audio medeenii category id
      } else if (name === 'calendar') {
        this.listQuery.search.categoryIds = [4] // audio medeenii category id
      }
      this.listQuery.currentPage = 1
      this.getList()
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
.customTab {
    .block{
      .el-pagination {
        .el-pager {
          background-color: red
        }
      }
    }
  .columns {
    .column {
      .image1 {
        object-fit: cover;
        object-position: 50% 25%;
      }
      .error {
        width: 100%;
        height: 100%;
        .image-slot {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #f5f7fa;
          color: #909399;
          font-size: 14px;
        }
      }
      .title {
        // font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
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
      .content {
        color: #909399;
        text-align: justify;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        // font-size: 19px;
      }
    }
  }
  .columns + .columns {
    margin-top: 5px;
  }
}
</style>
