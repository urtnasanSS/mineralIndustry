<template>
  <div>
    <div class="newsOuter">
      <breadcrumb />
      <GroupTitle :name="'Хайлтын илэрц'" />
      <ul>
        <div v-if="NothingValue === 'true'">
          <p>Утга олдсонгүй</p>
        </div>
        <div v-else>
          <div v-for="item in list.rows" :key="item.id">
            <li @click="handleClickMore(item)">
              {{ item.title }}
            </li>
          </div>
        </div>
      </ul>
      <!-- <el-pagination
        background
        :page-sizes="[10, 20, 30, 40]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="position: absolute; left: 5px; bottom: 0px; padding: 20px;"
        :current-page.sync="listQuery.currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
    </div>
  </div>
</template>
<script>
import SearchService from '../services/SearchService'
import GroupTitle from '~/components/custom/GroupTitle.vue'
export default {
  layout: 'contentLayout',
  name: 'RelatedNews',
  components: {
    GroupTitle
  },
  data () {
    return {
      list: [],
      listLoading: false,
      total: 0,
      nothing: {
        title: 'Утга илэрцгүй'
      },
      text: '',
      NothingValue: 'false'
      // listQuery: {
      //   limit: 10,
      //   currentPage: 1,
      //   sort: {
      //     prop: 'createdAt',
      //     order: 'descending'
      //   }
      // }
    }
  },
  watch: {
    '$route.query.item' (value) {
      this.searchValue = value
      this.refData()
    }
  },
  created () {
    this.text = this.$route.query.item
    this.getList()
  },
  mounted () {
    this.getList(this.$route.query)
  },
  destroyed () {},
  methods: {
    getList (params) {
      SearchService.index(this.$route.query.item)
        .then((response) => {
          const data = response.data
          if (data.rows.length > 0) {
            this.list = data
            this.total = data.count
            this.NothingValue = 'false'
          } else {
            this.NothingValue = 'true'
            this.total = 0
          }
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
    refData () {
      SearchService.index(this.searchValue)
        .then((response) => {
          const data = response.data
          if (data.rows.length > 0) {
            this.NothingValue = 'false'
            this.list = data
            this.total = data.count
          } else {
            this.NothingValue = 'true'
            this.total = 0
          }
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
    // handleSizeChange (val) {
    //   this.listQuery.limit = val
    //   this.getList()
    // },
    // handleCurrentChange (val) {
    //   this.listQuery.currentPage = val
    //   this.getList()
    // },
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
  ul {
    margin-top: 34px;
    margin-bottom: 20px;
    li {
      padding: 8px 0;
      width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: uppercase;
    &:hover {
      text-decoration: underline;
      font-weight: bold;
    }
    &:hover:before {
      background-color: black;
    }
    &:before {
      display: inline-block;
      content: '';
      -webkit-border-radius: 0.375rem;
      border-radius: 0.375rem;
      height: 0.55rem;
      width: 0.55rem;
      margin-right: 0.5rem;
      background-color: #bdbdbd;
    }
    }
  }
}
</style>
