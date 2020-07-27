<template>
  <nav id="navbar" ref="navbar" class="navbar is-link mainMenu" role="navigation" aria-label="main navigation">
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
      <div class="container">
        <div class="navbar-start">
          <div class="menus">
            <div class="menus2">
              <a class="navbar-item" @click="$nuxt.$router.replace({ path: '/home/' })">Нүүр хуудас</a>
            </div>
          </div>
          <div v-for="( item, index ) in portalMenus" :key="item.id" class="menus">
            <div v-if="portalMenus.length > index+1" class="menus2">
              <div v-if="item.children && item.children.length>0" :key="item.id" class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-item">{{ item.label }}</a>
                <div class="navbar-dropdown">
                  <template v-for="i in item.children">
                    <c-navbar-menu :item="i" :key="i.key" @click="handleClickMenuHeader(page2)" />
                  </template>
                </div>
              </div>
              <a v-else :key="item.id" class="navbar-item" @click="handleClickMenu(item)">{{ item.label }}</a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div v-for="( item, index ) in portalMenus" :key="index.id" class="menusEnd">
            <div v-if="portalMenus.length <= index+1" class="menusEnd2">
              <div v-if="item.children && item.children.length>0" :key="item.id" class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" @click="handleClickMenuHeader(item)">{{ item.label }}</a>
                <div class="navbar-dropdown">
                  <template v-for="i in item.children">
                    <c-navbar-menu :item="i" :key="i.key" @click="handleClickMenu($event)" />
                  </template>
                </div>
              </div>
              <a v-else :key="item.id" class="navbar-item" @click="handleClickMenu(item)">{{ item.label }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex'
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
      lang: '',
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
  created () {
    this.lang = this.$store.state.language.language.code
    this.$store.dispatch('main_menu_list')
  },
  destroyed () {},
  methods: {
    handleClickMenuHeader (item) {
      this.$nuxt.$router.replace({ path: '/page2', query: { menuId: item } })
    },
    handleClickMenu (item) {
      this.lang = this.$store.state.language.language.code
      if (item.menuViewTypeId === 1) {
        if (this.lang === 'mn') {
          this.getContentByMenuId(item.value)
        } else {
          this.getContentByMenuIdEn(item.value)
        }
      } else if (item.menuViewTypeId === 2) {
        if (this.lang === 'mn') {
          this.$nuxt.$router.replace({ path: '/news', query: { menuId: item.value } })
        } else {
          this.$nuxt.$router.replace({ path: '/en/news', query: { menuId: item.value } })
        }
      } else if (item.menuViewTypeId === 3) {
        if (this.lang === 'mn') {
          this.$nuxt.$router.replace({ path: '/listCard', query: { menuId: item.value } })
        } else {
          this.$nuxt.$router.replace({ path: '/en/listCard', query: { menuId: item.value } })
        }
      } else if (item.menuViewTypeId === 4) {
        if (this.lang === 'mn') {
          this.$nuxt.$router.replace({ path: '/linkList', query: { menuId: item.value } })
        } else {
          this.$nuxt.$router.replace({ path: '/en/linkList', query: { menuId: item.value } })
        }
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
            this.$nuxt.$router.replace({ path: '/page2/' + data.rows[0].page2 })
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
    },
    getContentByMenuIdEn (menuId) {
      this.listLoading = true
      this.listQuery.search.menuId = menuId
      ContentServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          if (data.rows.length > 0) {
            this.$nuxt.$router.replace({ path: '/en/content/' + data.rows[0].id })
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
  background-color: #1a3675;
  .navbar-brand {
    margin: 0px;
  }
  .navbar-menu {
    .container {
      .navbar-start {
        margin: 0px;
        float: left;
        .menus {
          .menus2 {
            height: 100%;
            a {
              font-family: SegoeUI;
              line-height: 1.8;
              font-size: 18px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: normal;
              text-align: left;
              color: white;
              @media screen and (max-width: 1407px) {
                padding: 10px 15px;
                font-size: 16px;
              }
              @media screen and (max-width: 1215px) {
                padding: 10px 10.4px;
                font-size: 14px;
              }
              &:hover {
                height: 100%;
                background-color: white;
                color: #1a3675;
              }
            }
            .navbar-item {
              .navbar-link {
                font-family: SegoeUI;
                font-size: 18px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.8;
                letter-spacing: normal;
                text-align: left;
                color: white;
                &:hover {
                  height: 100%;
                  background-color: white;
                  color: #1a3675;
                }
                @media screen and (max-width: 1407px) {
                  padding: 10px 15px;
                  font-size: 16px;
                }
                @media screen and (max-width: 1215px) {
                  padding: 10px 10.4px;
                  font-size: 14px;
                }
              }
              .navbar-dropdown {
                font-family: SegoeUI;
                font-size: 15px;
                font-weight: bold;
                line-height: 1.8;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.33;
                letter-spacing: normal;
                text-align: left;
                color: white;
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
      }
      .navbar-end {
        .menusEnd {
          .menusEnd2 {
            height: 100%;
            a {
              font-family: SegoeUI;
              line-height: 1.8;
              font-size: 18px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: normal;
              text-align: left;
              color: white;
              @media screen and (max-width: 1407px) {
                padding:10px 15px;
                font-size: 16px;
              }
              @media screen and (max-width: 1215px) {
                padding: 10px 10.4px;
                font-size: 14px;
              }
              &:hover {
                height: 100%;
                background-color: white;
                color: #1a3675;
              }
            }
              .navbar-item {
                &:hover {
                  height: 100%;
                  background-color: white;
                  color: #1a3675;
                }
                .navbar-link {
                  font-family: SegoeUI;
                  font-size: 18px;
                  font-weight: bold;
                  font-stretch: normal;
                  line-height: 1.8;
                  font-style: normal;
                  letter-spacing: normal;
                  text-align: left;
                  color: white;
                  @media screen and (max-width: 1407px) {
                    padding: 10px 15px;
                    font-size: 16px;
                  }
                  @media screen and (max-width: 1215px) {
                    padding: 10px 10.4px;
                    font-size: 14px;
                  }
                }
                .navbar-dropdown {
                  font-family: SegoeUI;
                  font-size: 15px;
                  font-weight: bold;
                  font-stretch: normal;
                  font-style: normal;
                  line-height: 1.8;
                  letter-spacing: normal;
                  text-align: left;
                  color: white;
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
  text-transform: none !important;
  text-align: justify;
  white-space: pre-line;
}
</style>
