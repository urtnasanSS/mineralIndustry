<template>
  <div class="customTab">
    <breadcrumb />
    <!-- <GroupTitle :name="this.$store.getters.portalMenus" style="margin-bottom: 15px" /> -->
    <GroupTitle :name="'Холбоотой МЭДЭЭЛЭЛ'" style="margin-bottom: 15px" />
    <div class="columns">
      <div class="column">
        <!-- <pre>{{ list }}</pre> -->
        <div v-for="item in list" :key="item.id">
          <div style="width:50%; float:left; height: 200px;">
            <div class="column is-2" style="width: 40%; float:left; height:100%">
              <div class="card-image" style="height:100%;">
                <div v-if="item.files.filter(c=> c.fileType.includes('image')).length > 0" style="height:100%">
                  <div
                    v-for="(file, count) in item.files.filter(c=> c.fileType.includes('image'))"
                    :key="count.id"
                    style="max-height:100%; display:-webkit-inline-box"
                  >
                    <div v-if="count == 0">
                      <img :src="baseUrl + file.storageName" alt="" class="width">
                    </div>
                  </div>
                </div>
                <div v-else-if="item.files.filter(c=> c.fileType.includes('video')).length > 0 " style="height:100%">
                  <div
                    v-for="(file, count) in item.files.filter(c=> c.fileType.includes('video'))"
                    :key="count.id"
                    style="height:100%;"
                  >
                    <div v-if="count == 0" style="height:100%;">
                      <!-- <video :src="baseUrl + file.storageName" alt="" class="video1"></video> -->
                      <div class="videodetail width" width="100%" heigth="auto" controls>
                        <video class="width" controls>
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
                    <iframe width="100% " style="height:auto;" :src="'http://www.youtube.com/embed/' + item.youtubeIframe" />
                  </div>
                </div>
                <div v-else style="height: 100%;">
                  <img src="/img/test2.jpg" />
                </div>
              </div>
            </div>
            <div class="column is-4" style="width: 60%; float:left">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4" @click="handleClickMore(item)">
                    {{ item.title }}
                  </p>
                  <p class="subtitle is-6">
                    <i class="fas fa-eye" /> {{ item.count }}
                    <i class="fas fa-clock" style="margin-left:10px;" />
                    {{ moment(item.publishDate).format("YYYY-MM-DD") }}
                  </p>
                </div>
              </div>
              <div class="content">
                {{ item.description }}
                <br>
              </div>
              <CustomButton type="big" :item="item" @handleClickMore="handleClickMore" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p style="padding: 20px; right: 0px" />
    <el-pagination
      background
      :page-sizes="[6, 10, 14, 18]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="position: absolute; left: 5px; bottom: 0px; padding: 12px;"
      :current-page.sync="listQuery.currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import moment from 'moment'
import GroupTitle from '~/components/custom/GroupTitle.vue'
import CustomButton from '~/components/custom/Button.vue'
import ContentServices from '~/services/ContentServices'
export default {
  layout: 'contentLayout',
  name: 'News',
  components: {
    GroupTitle,
    CustomButton
  },
  data () {
    return {
      list: [],
      baseUrl: process.env.baseUrl,
      listLoading: false,
      total: 0,
      listQuery: {
        limit: 6,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          menuId: null
        }
      }
    }
  },
  watch: {},
  mounted () {
    this.getList(this.$route.query)
  },
  methods: {
    moment,
    getList (params) {
      this.listLoading = true
      if (params !== undefined && params.menuId !== undefined) {
        this.listQuery.search.menuId = params.menuId
      }
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
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.currentPage = val
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
  .columns {
    padding: 0 10px;
    .column {
      .title {
        // font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
      }
      .subtitle {
        padding: 5px 0px;
        float: right;
        font-size: 11px;
        color: #909399;
      }
      .content {
        font-size: 12px;
        color: #909399;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        // font-size: 19px;
      }
      .width {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
