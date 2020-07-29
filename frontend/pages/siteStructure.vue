<template>
  <div>
    <div class="newsOuter">
      <GroupTitle :name="'Сайтын бүтэц'" />
      <!-- <pre>{{ portalMenus }}</pre> -->
      <ul>
        <div v-for="item in portalMenus" :key="item.id">
          <!-- <pre>{{ item }}</pre> -->
          <div
            v-if="item.children && item.children.length>0 "
            :key="item.id"
          >
            <li @click="handleClickMore(item)">
              {{ lang == 'mn' ? item.label : item.labelEn }}
            </li>
            <div v-for="i in item.children" :key="i.id">
              <div class="children1" @click="handleClickMore(i)">{{ lang == 'mn' ? i.label : i.labelEn }}</div>
              <div v-if="i.children && i.children.length>0">
                <div v-for="unit in i.children" :key="unit.id">
                  <div class="children2" @click="handleClickMore(unit)">{{ lang == 'mn' ? unit.label : unit.labelEn }}</div>
                  <div v-if="unit.children && unit.children.length>0">
                    <div v-for="value in unit.children" :key="value.id">
                      <div class="children3" @click="handleClickMore(value)">{{ lang == 'mn' ? value.label : value.labelEn }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
    <p style="padding: 20px; right: 0px" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import GroupTitle from '~/components/custom/GroupTitle.vue'
import ContentServices from '~/services/ContentServices'
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
      lang: '',
      total: 0,
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
  computed: {
    ...mapGetters(['portalMenus'])
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
  },
  methods: {
    handleClickMore (item) {
      // if (item) {
      //   this.$nuxt.$router.replace({ path: '/content/' + item.value })
      // }
      if (item.menuViewTypeId === 1) {
        // console.log(item, 'this.item')
        this.getContentByMenuId(item.value)
      } else if (item.menuViewTypeId === 2) {
        // console.log(item, ' item item item')
        this.$nuxt.$router.replace({ path: '/news', query: { menuId: item.value } })
      } else if (item.menuViewTypeId === 3) {
        this.$nuxt.$router.replace({ path: '/listCard', query: { menuId: item.value } })
      } else if (item.menuViewTypeId === 4) {
        this.$nuxt.$router.replace({ path: '/linkList', query: { menuId: item.value } })
      } else if (item.menuViewTypeId === 5) {
        // console.log('5')
      } else if (item.menuViewTypeId === 6) {
        // this.$router.push({ path: item.link })
        // window.location.href = item.link
        window.open(
          item.link, '_blank'
        )
        // console.log('6', item)
      }
    },
    getContentByMenuId (menuId) {
      this.listLoading = true
      this.listQuery.search.menuId = menuId
      ContentServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          console.log(data, 'adsadssda')
          if (data.rows.length > 0) {
            this.$nuxt.$router.replace({ path: '/content/' + data.rows[0].id })
          }
          this.total = data.count
          this.listLoading = false
        })
        .catch((err) => {
          this.total = 0
          this.listLoading = false
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
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
    .children1 {
      padding: 5px 0;
      margin-left: 20px;
      font-size: 14px;
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
      border-radius: 0.175rem;
      height: 0.25rem;
      width: 0.55rem;
      margin-right: 0.5rem;
      background-color: #bdbdbd;
    }
    }
    .children2 {
      padding: 3px 0;
      margin-left: 40px;
      font-size: 14px;
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
      height: 0.35rem;
      width: 0.35rem;
      margin-right: 0.5rem;
      background-color: #bdbdbd;
    }
    }
    .children3 {
      padding: 2px 0;
      margin-left: 60px;
      font-size: 14px;
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
      -webkit-border-radius: 0;
      border-radius: 0;
      height: 0.25rem;
      width: 0.25rem;
      margin-right: 0.5rem;
      background-color: #bdbdbd;
    }
    }
  }
}
</style>
