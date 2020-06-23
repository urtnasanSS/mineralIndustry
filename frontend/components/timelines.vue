<template>
  <div class="block">
    <div>
    </div>
    <el-timeline>
      <el-timeline-item v-for="item in list" :key="item.id" :timestamp="moment(item.publishDate).format('YYYY/MM/DD')" placement="top">
        <el-card class="timelineText">
          <h2 class="textTitle" @click="handleClickMore(item)">
            {{ lang == 'mn' ? item.title : item.titleEn }}
          </h2>
          <br>
          <p @click="handleClickMore(item)">
            {{ lang == 'mn' ? item.description : item.descriptionEn }}
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
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
export default {
  name: '',
  data () {
    return {
      list: [],
      total: 0,
      lang: '',
      listQuery: {
        limit: 4,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          categoryId: 4
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
.block{
  width:80%;
  margin-top: 30px;
  margin-left: 10%;
  .timelineText {
    border-left: 5px solid #3b8beb;
    transition: all 0.3s ease 0s;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    .textTitle {
      text-transform: uppercase;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
