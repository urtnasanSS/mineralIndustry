<template>
  <div class="newsOuter">
    <breadcrumb />
    <GroupTitle :name="'ЖАГСААЛТ МЭДЭЭЛЭЛ'" style="margin-bottom: 15px" />
    <div v-for="value in list" :key="value.id">
      <div class="columns">
        <div class="column">
          <div class="columns">
            <div class="column is-4">
              <div class="card-image">
                <figure class="image is-4by3 customImage">
                  <div v-if="value.files.length > 0">
                    <div v-for="(item, count) in value.files.filter(i=> i.fileType.includes('image'))" :key="count.id">
                      <div v-if="count == 0">
                        <img :src="baseUrl + item.storageName " alt="" class="image1">
                        <!-- <el-image
                          :src="baseUrl + item.storageName"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline" />
                          </div>
                        </el-image> -->
                      </div>
                    </div>
                  </div>
                  <el-image v-else class="error">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline" />
                    </div>
                  </el-image>
                </figure>
              </div>
            </div>
            <div class="column is-8">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4" @click="handleClickMore(value)">
                    {{ value.title }}
                  </p>
                  <p class="subtitle is-6">
                    <i class="fas fa-eye" /> {{ value.count }}
                    <i class="fas fa-clock" style="margin-left:10px;" />
                    {{ moment(value.publishDate).format("YYYY-MM-DD") }}
                  </p>
                </div>
              </div>

              <div class="content">
                {{ value.description }}
                <br>
              </div>
              <CustomButton type="big" :item="value" @handleClickMore="handleClickMore" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <p style="padding: 20px; right: 0px" />
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
    <p style="padding: 20px; right: 0px" />
  </div>
</template>
<script>
import moment from 'moment'
import GroupTitle from '~/components/custom/GroupTitle.vue'
import CustomButton from '~/components/custom/Button.vue'
import ContentServices from '~/services/ContentServices'
export default {
  name: 'RelatedNews',
  layout: 'contentLayout',
  components: {
    GroupTitle,
    CustomButton
  },
  data () {
    return {
      list: [],
      listLoading: false,
      total: 0,
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 3,
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
  created () {},
  mounted () {
    this.getList(this.$route.query)
  },
  destroyed () {},
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
            // console.log(this.list, 'this.list')
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
.newsOuter{
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
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        // font-size: 19px;
      }
    }
  }
}
</style>
