<template>
  <div class="header">
    <div class="container">
      <div class="columns">
        <div class="column is-6 responsiveLogo">
          <img class="logo" src="/img/logo_mmhi.png" @click="$nuxt.$router.replace({ path: '/home/' })">
        </div>
        <div class="column is-5 is-offset-1 responsiveSearch">
          <p class="contact">
            Утас: {{ itema.phone }},
            Цахим шуудан: {{ itema.Email }}
          </p>
          <div class="field">
            <div class="control has-icons-left has-icons-right">
              <input class="input" v-model="searchValue" placeholder="" @keyup.enter="handleClickMore(searchValue)" style="width:94%">
              <div @click="handleClickMore(searchValue)" style="background-color: #1a3675; float:right; height:35px; width:6%;">
                <i class="fa fa-search" :style="`color: white; margin: 13px 0px 0px 4px;`" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="main_menu_area">
        <Navbar />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MenuServices from '@/services/MenuServices'
import AddressServices from '@/services/AddressServices.js'
import SearchService from '@/services/SearchService'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      value: [],
      value1: [],
      data: [],
      searchValue: '',
      itema: {}
    }
  },
  created () {
    this.getList()
    this.valuelist()
    this.getData()
  },
  methods: {
    getList () {
      // ҮНДСЭН ЖАГСААЛТЫГ ДУУДАХ
      MenuServices.index()
        .then((response) => {
          const data = response.data
          this.value = data
        })
        .catch((err) => {
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
      this.listLoading = false
    },
    valuelist () {
      // ҮНДСЭН ЖАГСААЛТЫГ ДУУДАХ
      SearchService.index()
        .then((response) => {
          this.data = response.data
          this.value1 = this.data[0]
        })
        .catch((err) => {
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
      this.listLoading = false
    },
    getData () {
      AddressServices.index().then((response) => {
        this.data = response.data
        this.itema = this.data[0]
      })
        .catch((err) => {
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
    },
    handleClickMore (item) {
      this.status = 'show'
      if (item) {
        this.temp = Object.assign({}, item)
        this.$router.push({ path: '/SearchList', query: { item } })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  display: block;
  padding-top: 7px;
  width: 100%;
  background-color: #f1f1f1;
  .responsiveLogo {
    .logo {
      @media screen and (max-width: 1023px) {
        margin-left: 34px;
      }
    }
  }
  .responsiveSearch {
    @media screen and (max-width: 1407px) {
      padding-top: 1%;
    }
    @media screen and (max-width: 1215px) {
      padding-top: 1%;
    }
    .contact {
      width: 100%;
      padding: 10px 0;
      direction: rtl;
      float: right;
      height: auto;
      font-family: roboto;
      font-size: 15px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      color: #000000;
      @media screen and (max-width: 1407px) {
        font-size: 13px;
      }
      @media screen and (max-width: 1215px) {
        font-size: 12px;
      }
      @media screen and (max-width: 1023px) {
        font-size: 12px;
        margin-right: 30px;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
}
.field {
  width: 86%;
  float: right;
  @media screen and (max-width: 1023px) {
    margin-right: 30px;
  }
  @media screen and (max-width: 768px) {
    display: none;
    height: 0;
  }
}
.main_menu_area{float: left; width: 100%;  min-height:50px}

</style>
