<template>
  <div>
    <div class="newsOuter">
      <GroupTitle :name="'Холбоост мэдээлэл'" />
      <div v-if="list.length === 0"> {{ "Мэдээлэл олдсонгүй" }}</div>
      <ul>
        <div v-for="item in list" :key="item.id">
          <li @click="handleClickMore(item)">
            {{ item.title }}
          </li>
        </div>
      </ul>
    </div>
    <p style="padding: 20px; right: 0px" />
    <el-pagination
      background
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.limit"
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="position: absolute; left: 5px; bottom: 0px; padding: 20px;"
      :current-page.sync="listQuery.currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import ContentServices from '~/services/ContentServices'
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
      listQuery: {
        limit: 10,
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
            // console.log(this.list, 'linklist')
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
.newsOuter {
  margin-bottom: 20px;
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
.pagination {
  margin-top: 10px;
}
</style>
