<template>
  <div>
    <leftMenu />
    <rightMenu />
    <section ref="headerRef" class="hero" style="background-image: url('/img/bg1.png'); background-repeat: repeat;  position:relative; margin-bottom:1px;">
      <div class="hero-body" style="padding:0px;">
        <div class="container">
          <div style="position:relative">
            <div class="backgroundImage">
              <div class="columns is-gapless">
                <div class="column" />
                <div class="column">
                  <div
                    class="square1"
                    :style="`border-bottom: ${backgroundHeight}px solid rgba(255, 255, 255, 0.26); `"
                  />
                  <div
                    class="square2"
                    :style="
                      `border-bottom: ${backgroundHeight}px solid rgba(255, 255, 255, 0.26); `
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="headerLine">
          <div class="container">
            <ul class="header-line-left">
              <li v-for="item in listHeaderMenu" :key="item.id">
                <a v-if="item.isRedirect" :href="item.link" target="_blank"> {{ languages == 'mn' ? item.name : item.nameEn }}</a>
                <nuxt-link v-else :to="item.link"> {{ languages == 'mn' ? item.name : item.nameEn }}</nuxt-link>
              </li>
            </ul>
            <div class="header-line-right">
              <nuxt-link v-for="locale in $i18n.locales" :key="locale.code" :to="switchLocalePath(locale.code)">
                <img :src="`../img/${locale.code === 'en' ? 'eng-flag.png' : 'mn-flag.png'}`" @click="setLanguage(locale)" style="height:10px;" alt="">
                <span @click="setLanguage(locale)" style="font-size:11px; color:white;">{{ locale.name }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="container">
          <div class style="text-align:center; padding: 31px 0px 32px 0px; min-height:184px;">
            <div class="columns">
              <div class="column">
                <img class="logo" src="/img/logoAndName.png" @click="$nuxt.$router.replace({ path: '/home/' })">
              </div>
              <div class="column is-right" style="text-align: center">
                <img src="/img/symbolAndText.png">
              </div>
            </div>
          </div>
        </div>
        <div id="navbar" class="menuBackground">
          <div class="container is-paddingless is-gapless">
            <Navbar />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import MenuServices from '../services/MenuServices'
import rightMenu from '../components/rightMenu.vue'
import leftMenu from '~/components/leftMenu.vue'
export default {
  components: {
    Navbar,
    rightMenu,
    leftMenu
  },
  props: {
  },
  data () {
    return {
      listQueryHeaderMenu: {
        limit: 100,
        currentPage: 1,
        sort: {
          prop: 'sortOrder',
          order: 'ascending'
        },
        search: {
          menuTypeId: 2
        }
      },
      languages: '',
      listHeaderMenu: [],
      backgroundHeight: 0
    }
  },
  watch () {
    this.languages = this.$store.state.language.language.code
  },
  mounted () {
    this.languages = this.$store.state.language.language.code
    this.getHeaderMenu()
    const self = this
    setTimeout(function () {
      if (process.client) {
        window.$nuxt = self
        self.myEventHandler()
        window.addEventListener('resize', self.myEventHandler)
        window.addEventListener('scroll', self.handleScroll)
      }
    }, 10)
  },
  destroyed () {
    if (process.client) {
      window.$nuxt = this
      window.removeEventListener('resize', this.myEventHandler)
    }
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
    },
    handleClickLogin () {
      this.$router.push({
        path: '/admin'
      })
    },
    myEventHandler (e) {
      if (this.$refs.headerRef.clientHeight === 259) {
        this.backgroundHeight = this.$refs.headerRef.clientHeight - 52
      } else {
        this.backgroundHeight = this.$refs.headerRef.clientHeight - 52
      }
    },
    handleScroll (event) {
      const navbar = document.getElementById('navbar')
      if (window.pageYOffset >= 195) {
        navbar.classList.add('stickynavbar')
      } else {
        navbar.classList.remove('stickynavbar')
      }
    },
    setLanguage (locale) {
      this.$store.dispatch('SetLanguageInfo', locale)
    },
    getHeaderMenu () {
      MenuServices.index(this.listQueryHeaderMenu).then((response) => {
        const data = response.data
        if (data.rows.length > 0) {
          this.listHeaderMenu = JSON.parse(JSON.stringify(data.rows))
        }
        this.totalHeaderMenu = data.count
      }).catch((err) => {
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    },
    handleClickHeaderMenu (item) {
      if (!item.isRedirect) {
        this.$nuxt.$router.replace({ path: item.link })
      } else {
        window.open(item.link, '_blank')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hero {
  min-height: 250px;
  @media screen and (max-width: 1407px) {
    min-height: 249px;
  }
  @media screen and (max-width: 1215px) {
    min-height: 232px;
  }
  @media screen and (max-width: 1023px) {
    min-height: 188px;
  }
}
.backgroundImage {
  position: absolute;
  width: 100%;
  height: 100%;
  .columns {
    .column {
      position: relative;
      display: flex;
      justify-content: flex-end;
      .square1 {
        position: absolute;
        border-left: 140px solid transparent;
        height: 0;
        width: 100%;
      }
      .square2 {
        position: absolute;
        border-left: 140px solid transparent;
        height: 0;
        width: 45%;
      }
    }
  }
  // z-index: 0;
  // position: absolute;
  // // border: solid 1px red;
  // height: 200px;
  // width: 100%;
  // // top:-250px;
  // background: url('/img/headerbgcover.png');
  // background-repeat: no-repeat;
  // background-position: right;
  //   background-size: contain;
}
.headerLine {
  min-height: 25px;
  border-bottom: solid 1px #dcdfe6;
  line-height: 20px;
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .header-line-left {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        border-right: solid 1px #dcdfe6;
        text-align: center;
        width: 80px;
      }
    }
    .header-line-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    a {
      color: white;
      font-size: 10px;
      height: 15px;
      text-transform: uppercase;
      width: 80px;
      text-align: center;
      &:hover {
        color: #cbdff7;
      }
    }
    img {
      height: 12px;
    }
  }
}
.headerLin2222 {
  border-bottom: solid 1px #dcdfe6;
  height: 35px;
  .container {
    position: relative;
    .columns {
      .column {
        padding: 8px;
        .headerNav {
          list-style-type: none;
          z-index: 2222;
          margin: 0;
          padding: 0;
          // float: right;
          // margin-top: 5px;
          // height: 15px !important;
          padding-right: 10px;
          li {
            display: inline-flex;
            border-right: solid 1px #dcdfe6;
            padding-right: 8px;
            padding-top: 7px;
            a {
              color: white;
              font-size: 10px;
              height: 15px;
              text-transform: uppercase;
              &:hover {
                // font-weight: bold;
                color: #cbdff7;
              }
            }
            img {
              // margin-top: 5px;
              height: 12px;
              margin-right: 5px;
            }
          }
          li:last-child {
            border-right: none;
          }
        }
      }
    }
  }
}
.menuBackground {
  background-color: #da0717;
  z-index: 99 !important;
}

.stickynavbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 4;
  box-shadow: 0 4px 4px -2px #23232377;
  -moz-box-shadow: 0 4px 4px -2px #23232377;
  -webkit-box-shadow: 0 4px 4px -2px #23232377;
}
.logo{
  &:hover{
    cursor:pointer;
  }
}
</style>
