<template>
  <div class="hero-body">
    <div>
      <div class="header_area center">
        <div id="header_area_1" style="width: 50%; float: left;">
          <img src="img/logo_mmhi.png">
        </div>

        <div id="header_area_2" style="width: 50%; float:left; text-align: right;">
          <p class="contact">
            Утас: {{ itema.phone }},
            Цахим шуудан: {{ itema.Email }}
          </p>
          <div style="width: 60%; float:right; margin: 2%" class="field">
            <div class="control has-icons-left has-icons-right">
              <input class="input" placeholder="Хайлтын хэсэг">
              <span class="icon is-small is-right">
                <i class="fas fa-search fa-xs"></i>
              </span>
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
    }
  }
}
</script>
<style lang="scss" scoped>
.hero-body {
  padding: 3rem 0;
  .header_area{
    margin-top: 1%
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
