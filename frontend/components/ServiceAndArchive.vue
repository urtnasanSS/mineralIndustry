<template>
  <section style="margin-top:40px; ">
    <div class="columns is-is-gapless">
      <div class="column is-6">
        <GroupTitle :name="lang == 'mn' ? 'Үйлчилгээ' : 'Service'" />
        <div class="services">
          <div class="columns is-multiline is-mobile is-gapless">
            <div v-for="(item, index) in listService" :key="item.id" class="column is-half">
              <div class="columns singleItem">
                <div class="column is-3">
                  <span class="icon">
                    <i :class="`fa fa-${icon[index].icon}`" />
                  </span>
                </div>
                <div class="column is-9 crop">
                  <span class="text" @click="handleClickMore(item)">{{ lang == 'mn' ? item.title : item.titleEn }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <GroupTitle :name="lang == 'mn' ? 'ҮТА-ын сан хөмрөгөөс' : 'Archive'" />
        <div class="utaTable">
          <table class="table" style="width: 100%;">
            <thead>
              <tr class="columns is-is-gapless">
                <th class="column is-1">
                  <abbr title="№">№</abbr>
                </th>
                <th class="column is-10">
                  {{ lang == 'mn' ? 'Гарчиг' : 'Title' }}
                </th>
                <th class="column is-1">
                  <p>{{ lang == 'mn' ? 'Үзсэн' : 'Assumed' }}</p>
                </th>
              </tr>
            </thead>
          </table>
          <table class="table" style="width: 100%;">
            <div v-for="value in list" :key="value.id" style="width: 100%;" class="active">
              <tr class="columns is-12">
                <th class="column is-1" style="float:left">
                  {{ list.indexOf(value) +
                    (listQuery2.currentPage - 1) * listQuery2.limit +
                    1
                  }}
                </th>
                <th class="column is-10">
                  <p class="archiveText">
                    <a href="#" title="#" style="text-transform: uppercase; font-weight: normal;" @click="handleClickMore(value)">{{ lang == 'mn' ? value.title : value.titleEn }}</a>
                  </p>
                </th>
                <th class="column is-1" style="font-weight: normal">
                  {{ value.count }}
                </th>
              </tr>
            </div>
          </table>
        </div>
      </div>
    </div>
    <div class="columns paginationNumber">
      <div class="column is-6">
        <div style="text-align:left;">
          <div class="block">
            <el-pagination
              background
              :page-sizes="[6, 9, 12, 15]"
              :page-size="listQuery2.limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total2"
              :current-page.sync="listQuery2.currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import ContentServices from '../../frontend/services/ContentServices'
import GroupTitle from '~/components/custom/GroupTitle.vue'
export default {
  name: '',
  components: { GroupTitle },
  data () {
    return {
      listService: [],
      list: [],
      total: 0,
      total2: 0,
      lang: '',
      listQuery: {
        limit: 8,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'ascending'
        },
        search: {
          categoryId: 7
        }
      },
      listQuery2: {
        limit: 6,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'ascending'
        },
        search: {
          categoryId: 8
        }
      },
      icon: [
        { id: 1, icon: 'file' },
        { id: 2, icon: 'users' },
        { id: 3, icon: 'book' },
        { id: 4, icon: 'pen' },
        { id: 5, icon: 'credit-card' },
        { id: 6, icon: 'file' },
        { id: 7, icon: 'users' },
        { id: 8, icon: 'file' }
      ]
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  created () {
    this.lang = this.$store.state.language.language.code
    this.getServicesData()
    this.getArchiveData()
  },
  destroyed () {},
  methods: {
    getServicesData () {
      ContentServices.index(this.listQuery).then((response) => {
        this.listService = response.data.rows
      }).catch((err) => {
        this.listService = []
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    },
    getArchiveData () {
      this.listLoading = true
      // console.log('this.listQuery2', this.listQuery2)
      ContentServices.index(this.listQuery2).then((response) => {
        const data = response.data
        this.list = JSON.parse(JSON.stringify(data.rows))
        this.total2 = data.count
        // console.log(this.list, '++++++++++getArchiveData-----------')
      }).catch((err) => {
        this.list = []
        this.total2 = 0
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    },
    handleSizeChange (val) {
      this.listQuery2.limit = val
      this.getArchiveData()
    },
    handleCurrentChange (val) {
      this.listQuery2.currentPage = val
      this.getArchiveData()
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
.services {
  padding: 0px;
  margin: 30px 0px 0px 0px;
  .singleItem {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin: 10px;
    // padding: 10px;
    border-radius: 10px;
    border: solid 2px #3b8beb;
    color: #3b8beb;
    line-height: 16px;
    -webkit-transition: border 500ms ease-out;
    -moz-transition: border 500ms ease-out;
    -o-transition: border 500ms ease-out;
    .is-3 {
      text-align: center;
      font-size: 22px;
      i {
        transition: all 500ms ease-in-out;
      }
    }
    .crop {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      .text {
        text-transform: uppercase;
        font-size: 15px;
      }
    }
    &:hover {
      border: 3px solid #da0717;
      i {
        transform: scale(1.1);
        color: #da0717;
      }
    }
  }
}
.utaTable {
  padding: 0px;
  margin: 30px 0px 0px 0px;
  // border: solid 1px red;
  .table {
      .active {
        margin-top: 15px;
        .columns {
          &:hover{
            background-color: #3b8beb;
            th{
              color: white;
            }
            a{
              color: white;
            }
          }
          .column {
            border: none;
          }
          .archiveText {
            max-width: 485px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
        }
      }
      .is-selected {
        background-color: #3b8beb !important;
      }
  }
}
.paginationNumber {
  bottom: 0px;
  width: 50%;
  margin-left: 50%;
}
</style>
