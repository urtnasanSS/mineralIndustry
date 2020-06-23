<template>
  <div class="customTab">
    <div v-for="item in list" :key="item.id" class="columns">
      <div class="column">
        <div class="columns">
          <div class="column is-4">
            <div class="card-image">
              <figure class="image is-4by3 customImage">
                <div v-if="item.files.length > 0">
                  <div
                    v-for="(file, count) in item.files.filter(c=> c.fileType.includes('image'))"
                    :key="count.id"
                  >
                    <div v-if="count == 0">
                      <img :src="baseUrl + file.storageName" alt="" class="image1">
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
          :page-sizes="[4, 6, 8, 12]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :current-page.sync="listQuery.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ContentServices from '../../frontend/services/ContentServices'
import CustomButton from '~/components/custom/Button.vue'
export default {
  components: {
    CustomButton
  },
  data () {
    return {
      list: [],
      total: 0,
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
          categoryId: 3
        }
      }
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  created () {
    this.lang = this.$store.state.language.language.code
    this.getData()
  },
  destroyed () {},
  methods: {
    moment,
    getData () {
      this.listLoading = true
      ContentServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          this.list = JSON.parse(JSON.stringify(data.rows))
          this.listLoading = false
          this.total = data.count
        })
        .catch((err) => {
          this.list = []
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
      this.getData()
    },
    handleCurrentChange (val) {
      this.listQuery.currentPage = val
      this.getData()
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
