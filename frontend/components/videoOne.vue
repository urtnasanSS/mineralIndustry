<template>
  <div>
    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-full" style="padding-left:8px !important;">
          <GroupTitle
            :name="lang == 'mn' ? 'Видео мэдээ' : 'Video news'"
            title-color="black"
            title-margin-bottom="1px"
            class="Title"
          />
          <div v-for="item in list.slice(0, 1)" :key="item.id" style="height:100%;">
            <div class="titleVideo" style="margin-bottom:10px;">
              <p style="font-size:16px; cursor:pointer" @click="handleClickTitle(item)">
                {{ lang == 'mn' ? item.title : item.titleEn }}
              </p>
              <p class="subtitle is-6" style=" color:#909399; font-size:11px; margin-top:5px;">
                <i class="fas fa-eye" style=" color:#909399;" /> {{ item.count }}
                <i class="fas fa-clock" style="margin-left:10px; color:#909399;" />
                {{ moment(item.createdAt).format("YYYY-MM-DD") }}
              </p>
            </div>
            <div v-if="item.youtubeIframe !== ''" style="height:100%;">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <iframe width="100% " style="height:200px;" :src="'http://www.youtube.com/embed/' + item.youtubeIframe" />
            </div>
            <div v-else style="text-align:center;">
              <video v-if="item.files.filter(c=> c.fileType.includes('video')).length>0" width="100%" controls>
                <source :src="baseUrl + item.files.filter(c=> c.fileType.includes('video'))[0].storageName" type="video/mp4">
                <source :src="baseUrl + item.files.filter(c=> c.fileType.includes('video'))[0].storageName" type="video/ogg">
                Таны хөтөч энэхүү бичлэгийг тоглуулах боломжгүй байна.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ContentServices from '~/services/ContentServices'
import GroupTitle from '~/components/custom/GroupTitle.vue'
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
    this.getList()
  },
  destroyed () {},
  methods: {
    moment,
    getList () {
      this.lang = this.$store.state.language.language.code
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
.Title {
  margin-bottom: 10px;
}
</style>
