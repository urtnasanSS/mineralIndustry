<template>
  <nav
    id="navbar"
    ref="navbar"
    class="navbar is-link mainMenu"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item is-hidden-desktop" href="#">
        <img src="/img/logoNoWord.png" height="29">
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': showNav }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="showNav = !showNav"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }">
      <div :lang="lang" class="navbar-start">
        <template v-for="item in portalMenus">
          <div
            v-if="item.children && item.children.length>0 "
            :key="item.id"
            class="navbar-item has-dropdown is-hoverable"
          >
            <a class="navbar-link" @click="handleClickMenuHeader(item)">{{ lang == 'mn' ? item.label : item.labelEn }}</a>
            <div class="navbar-dropdown">
              <template v-for="i in item.children">
                <c-navbar-menu :item="i" :key="i.key" @click="handleClickMenu($event)" />
              </template>
            </div>
          </div>
          <a v-else :key="item.id" class="navbar-item" @click="handleClickMenu(item)">{{ lang == 'mn' ? item.label : item.labelEn }}</a>
        </template>
      </div>
      <div class="navbar-end" />
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
// import MenuServices from '../../frontend/services/MenuServices'
import ContentServices from '~/services/ContentServices'
export default {
  name: 'Navbar',
  props: {
    sidebarAndMarqueeoffsetTop: {
      type: Number,
      default: 250
    }
  },
  data () {
    return {
      showNav: false,
      list: [],
      lang: '',
      listContent: [],
      listLoading: false,
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
  },
  created () {
    // this.getMenu()
    this.lang = this.$store.state.language.language.code
    this.$store.dispatch('main_menu_list')
  },
  destroyed () {},
  methods: {
    handleClickMenuHeader (item) {
      this.$nuxt.$router.replace({ path: '/menuStructure', query: { menuId: item } })
    },
    handleClickMenu (item) {
      // console.log('item', item)
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
      }
    },
    getContentByMenuId (menuId) {
      this.listLoading = true
      this.listQuery.search.menuId = menuId
      ContentServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          // console.log(data, 'adsadssda')
          if (data.rows.length > 0) {
            this.$nuxt.$router.replace({ path: '/content/' + data.rows[0].id })
          } else {
            this.$nuxt.$router.replace({ path: '/404.vue' })
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
.mainMenu {
  // padding-right: 10px;
  // border:solid 1px red !important;
  .navbar-brand {
    margin: 0px;
    // display: none !important;
  }
  .navbar-menu {
    .navbar-start {
      .navbar-dropdown {
        width: 190px;
      }
      a:lang(mn) {
        // color:white;
        border-right: solid 1px #dcdfe6;
        text-transform: uppercase;
        padding: 5px 23.2px;
        &:hover {
          // color: #3b8beb;
        }
        &:after {
          display: none;
        }
        @media screen and (max-width: 1407px) {
          padding: 3px 15px;
          font-size: 15px;
        }
        @media screen and (max-width: 1215px) {
          // padding: 0px 5px;
          padding: 2px 10.4px;
          font-size: 13px;
        }
      }
      a:lang(en) {
        // color:white;
        border-right: solid 1px #dcdfe6;
        text-transform: uppercase;
        padding: 5px 8.4px;
        &:hover {
          // color: #3b8beb;
        }
        &:after {
          display: none;
        }
        @media screen and (max-width: 1407px) {
          padding: 3px 15px;
          font-size: 15px;
        }
        @media screen and (max-width: 1215px) {
          // padding: 0px 5px;
          padding: 2px 10.4px;
          font-size: 13px;
        }
      }
      a:last-child {
        border-right: none !important;
      }
      .navbar-item:last-child a {
        border-left: none !important;
      }
    }
  }
}
.nested.dropdown {
  &:hover > .dropdown-menu {
    display: flex;
  }
  .dropdown-menu {
    top: -12px;
    margin-left: 100%;
  }
  .dropdown-trigger {
    button::after {
      // content: '⦠'
    }
    .button{
      background-color: none !important;
      span {
        text-transform: none !important;
      }
    }
    span {
      background-color: unset !important;
      padding: 0px 0px;
      border: 0px;
      font-size: 14px;
      font-weight: 400;
      height: 1.5em;
      text-transform: none !important;
    }
  }
  .dropdown-menu {
    a {
      text-transform: none !important;
    }
  }
}
.navbar-item {
  border-top: 1px solid #f2f0ec;
  text-transform: none !important;
  text-align: justify;
  white-space: pre-line;
}
</style>
