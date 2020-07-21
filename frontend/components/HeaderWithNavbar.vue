<template>
  <div class="hero-body">
    <div class="header_area center">
      <div id="header_area_1" style="width: 50%; float: left;">
        <img class="logo" src="/img/logo_mmhi.png" @click="$nuxt.$router.replace({ path: '/home/' })">
      </div>
      <div id="header_area_2" style="width: 50%; float:left; text-align: right;">
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
    <div class="main_menu_area">
      <div>
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
.hero-body {
  padding: 3rem 0;
  .header_area{
    margin-top: 1%;
    margin-left: 10%;
    margin-right: 10%;
  }
  .field {
    width: 49%;
    float:right;
    margin: 2% 0
  }
}
.main_menu_area{float: left; width: 100%;  min-height:50px}

.contact {
  height: auto;
  font-family: SegoeUI;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #000000
}
</style>
