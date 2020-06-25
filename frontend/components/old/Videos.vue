<template>
  <div
    class="hero is-mini has-background-black is-gapless"
    style="background-image: url('/img/bg1.png'); background-repeat: repeat;  position:relative; margin-top:30px; "
  >
    <div class="hero-body" style="    padding: 2rem 1.5rem;">
      <div class="container">
        <GroupTitle
          :name="lang == 'mn' ? 'Видео мэдээ' : 'Video news'"
          shortline-color="red"
          title-color="white"
          title-margin-bottom="15px"
        />
        <div class="columns is-gapless" style="margin-top:40px;">
          <div class="column is-8" style="padding-right:15px !important;">
            <div v-for="item in list.slice(0, 1)" :key="item.id" style="height:100%;">
              <div class="titleVideo">
                <span @click="handleClickTitle(item)">{{ lang == 'mn' ? item.title : item.titleEn }}</span>
                <p class="subtitle is-6" style=" color:white; font-size:11px; margin-top:5px;">
                  <i class="fas fa-eye" style=" color:white;" /> {{ item.count }}
                  <i class="fas fa-clock" style="margin-left:10px; color:white;" />
                  {{ moment(item.createdAt).format("YYYY-MM-DD") }}
                </p>
              </div>
              <div v-if="item.youtubeIframe !== ''" style="height:100%;">
                <iframe width="100% " height="500" style="height:500px;" :src="'http://www.youtube.com/embed/' + item.youtubeIframe" />
              </div>
              <div v-else style="height:100%;">
                <video v-if="item.files.filter(c=> c.fileType.includes('video')).length>0" width="100%" style="height:500px;" controls>
                  <source :src="baseUrl + item.files.filter(c=> c.fileType.includes('video'))[0].storageName" type="video/mp4">
                  <source :src="baseUrl + item.files.filter(c=> c.fileType.includes('video'))[0].storageName" type="video/ogg">
                  Таны хөтөч энэхүү бичлэгийг тоглуулах боломжгүй байна.
                </video>
                <div v-else class="noneVideo">
                  <p class="fa fa-video" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4" style="padding-left:8px !important; ">
            <div v-for="item in list.slice(1, 3)" :key="item.id" style="height:280px;">
              <div class="titleVideo" style="width:85%">
                <span @click="handleClickTitle(item)">{{ lang == 'mn' ? item.title : item.titleEn }}</span>
                <p class="subtitle is-6" style=" color:white; font-size:11px; margin-top:5px;">
                  <i class="fas fa-eye" style=" color:white;" /> {{ item.count }}
                  <i class="fas fa-clock" style="margin-left:10px; color:white;" />
                  {{ moment(item.createdAt).format("YYYY-MM-DD") }}
                </p>
              </div>
              <div v-if="item.youtubeIframe !== ''">
                <iframe :src="'http://www.youtube.com/embed/' + item.youtubeIframe" style="height: 221px;width: 86%;" />
              </div>
              <div v-else>
                <video v-if="item.files.filter(c=> c.fileType.includes('video')).length>0" controls style="height: 217px;width: 86%;">
                  <source :src="baseUrl + item.files.filter(c=> c.fileType.includes('video'))[0].storageName" type="video/mp4">
                  <source :src="baseUrl + item.files.filter(c=> c.fileType.includes('video'))[0].storageName" type="video/ogg">
                  Таны хөтөч энэхүү бичлэгийг тоглуулах боломжгүй байна.
                </video>
                <div v-else class="rightVideos">
                  <p class="fa fa-video videos" aria-hidden="true" />
                </div>
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
import ContentServices from '~/services/ContentServices'
export default {
  name: '',
  components: {
    GroupTitle
  },
  data () {
    return {
      listLoading: false,
      list: [],
      total: [],
      lang: '',
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 3,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          categoryId: 2
        }
      }
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
    this.getList()
  },
  destroyed () {},
  methods: {
    moment,
    getList () {
      this.listLoading = true
      ContentServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          if (data.rows.length > 0) {
            this.list = JSON.parse(JSON.stringify(data.rows))
          }
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
    handleClickTitle (item) {
      if (item) {
        this.$nuxt.$router.replace({ path: '/content/' + item.id })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.titleVideo{
  font-size: 18px;
  margin-bottom: 15px;
  padding-left: 15px;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inherit;
  &:hover{
    span{
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.noneVideo {
  background: #f5f7fa;
  height:500px;
  width: 100%;
  color: #909399;
  .fa-video {
    font-size: 30px;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 24%;
  }
}
.rightVideos {
  background: #f5f7fa;
  height:221px;
  width: 86%;
  color: #909399;
  .videos {
    font-size: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 24%;
    padding-left: 44%;
  }
}
</style>
