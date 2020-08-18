<template>
  <div class="header">
    <div class="columns headTitle">
      <div class="container">
        <div class="column is-12 upperline">
          <p class="email"><i class="fa fa-envelope" /> Цахим шуудан: {{ itema.Email }}</p>
          <p class="phone"><i class="fa fa-phone" /> Утас: {{ itema.phone }},</p>
        </div>
      </div>
    </div>
    <div class="container back">
      <div class="columns">
        <div class="column is-6 responsiveLogo">
          <img class="logo" src="/img/logo_mmhi.png" @click="$nuxt.$router.replace({ path: '/home/' })">
        </div>
        <div class="column is-5 is-offset-1 responsiveSearch">
          <div class="field">
            <div class="control">
              <input class="input" v-model="searchValue" placeholder="Хайх утгаа оруулна уу.." @keyup.enter="handleClickMore(searchValue)">
              <!-- <div @click="handleClickMore(searchValue)" style="background-color: #1a3675; float:right; height:35px; width:6%;">
                <i class="fa fa-search searchButton" />
              </div> -->
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
    // this.valuelist()
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
  .back {
    // background-image: url("/img/bg.png"); background-repeat: no-repeat; background-position: right; margin-bottom: 1px;
    @media screen and (max-width: 768px) {
      background-image: none;
      height: 0px;
    }
    .responsiveLogo {
      float: left;
      .logo {
        padding-left: 0.75rem;
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
    }
  }
}
.field {
  width: 85%;
  float: right;
  @media screen and (max-width: 1023px) {
    display: none;
  }
  .control {
    padding-right: 1%;
    padding-top: 8%;
    width: 85%;
    float: right;
    .input {
      font-size: 13px;
    }
  }
  // .searchButton {
  //   max-width: 100%;
  //   color: white;
  //   margin: 13px 0px 0px 4px;
  //   @media screen and (max-width: 1280px) {
  //     margin: 10px 0px 0px 4px;
  //     font-size: 15px;
  //   }
  //   @media screen and (max-width: 1214px) {
  //     margin: 10px 0px 0px 2px;
  //     font-size: 15px;
  //   }
  // }
}
.headTitle {
  text-align: right;
  border-bottom: 1px solid #55555530;
  background-color: #fff;
  .upperline {
    margin-bottom: 8px;
    .phone:hover {
      color: #1a3675;
    }
    .phone {
      float: right;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      color: #555;
    }
    .email:hover {
      color: #1a3675;
    }
    .email {
      float: right;
      padding-left: 10px;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      color: #555;
    }
  }
}
.main_menu_area{float: left; width: 100%;  min-height:50px}

</style>
