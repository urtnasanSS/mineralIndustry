<template>
  <div class="rightmenu">
    <a class="button is-small" style="margin-left:45px;" @click="handleClickVisibler()">
      <span class="icon is-small">
        <i :class="'fa ' + (rightMenuStatus === 'hide' ? 'fa-angle-left' : 'fa-angle-right')" aria-hidden="true" />
      </span>
    </a>
    <ul class="rightmenuinner">
      <li v-for="item in listMenu" :key="item.id" :style="'margin-left:' + (rightMenuStatus === 'hide' ? '28px' : '-155px')" @click="handleClickMenu(item)" id="rightMenus">
        <div class="img">
          <img src="/img/archiveLogo.jpg" alt="">
        </div>
        <div class="text">
          {{ lang == 'mn' ? item.name : item.nameEn }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import OnlineCountService from '../services/OnlineCountService'
import MenuServices from '../services/MenuServices'
export default {
  components: {
  },
  data () {
    return {
      listQueryMenu: {
        limit: 11,
        sort: {
          prop: 'sortOrder',
          order: 'ascending'
        },
        search: {
          menuTypeId: 4
        }
      },
      lang: '',
      rightMenuStatus: 'view',
      listMenu: []
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
    this.getMenu()
  },
  destroyed () {
  },
  methods: {
    getMenu () {
      MenuServices.index(this.listQueryMenu).then((response) => {
        const data = response.data
        if (data.rows.length > 0) {
          this.listMenu = JSON.parse(JSON.stringify(data.rows))
          // console.log(this.listMenu, 'this.listMenu')
        }
      }).catch((err) => {
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    },
    handleClickMenu (item) {
      // console.log(item, 'asdads')
      if (!item.isRedirect) {
        this.$nuxt.$router.replace({ path: item.link })
      }
      if (item.link === 'http://43.228.129.159:8088/eorder/?src=&agency=25&solved=') {
        OnlineCountService.incrementCount()
        window.open(item.link, '_blank')
      } else {
        window.open(item.link, '_blank')
      }
    },
    handleClickVisibler () {
      if (this.rightMenuStatus === 'view') {
        this.rightMenuStatus = 'hide'
      } else {
        this.rightMenuStatus = 'view'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rightmenu{
  // position: fixed;
  // top: 150px;
  // width: 100px;
  // right: -50px;
  padding: 0px;
  margin: 0px;
  position: fixed;
  right: -123px;
  top: 225px;
  width: 200px;
  z-index: 2;
}
#rightMenus {
  border-radius: 30px;
  margin: 7px 0;
}
.rightmenuinner li{
  background-color: #ffffffe3;
  background-color: rgb(59, 139, 235);
  display: flex;
  flex-direction: row;
  height: 49px;
  list-style-type: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  -webkit-transition:all 0.25s ease-in-out;
  -moz-transition:all 0.25s ease-in-out;
  -o-transition:all 0.25s ease-in-out;
  transition:all 0.25s ease-in-out;
  cursor: pointer;
  // filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
  // filter: rgb(59, 139, 235);
  // -webkit-filter: grayscale(100%);
}
li:hover{
  margin-left: -180px !important;
  margin-bottom: 0px !important;
  transform: scale(1.03);
  opacity: 1;
  text-align: center;
  .img {
    img {
      margin-top: 5px;
      height: 39px !important;
    }
  }
}
.rightmenuinner li .img{
  flex: 36px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  img{
    margin-left: 20px;
    height: 35px;
    margin-top: 9px;
  }
}
.rightmenuinner li .text{
  display: inline-block;
  color: #fff;
  flex: 1;
  padding: 0px;
  padding-right: 10px;
  margin: 0px;
  line-height: 33px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  // border-left: solid 1px rgb(224, 224, 224);
  padding-left: 15px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
