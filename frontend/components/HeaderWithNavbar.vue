<template>
  <div>
    <div>
      <div class="header_area center">
        <div id="header_area_1" style="width: 50%; float: left;">
          <img src="img/logo_mmhi.png">
        </div>

        <div id="header_area_2" style="width: 50%; float:left; text-align: right;">
          <p class="contact">
            Утас: (51)-263506, (51)-264373
            Цахим шуудан: info@mmhi.gov.mn
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
    <div class="main_menu_area" style="background-color: #1a3675 ;">
      <div class="center">
        <ul>
          <div v-for="(item, index) in value" :key="item.id">
            <div v-if="index == value.length - 1">
              <li style="float: right; margin: 0% 0% 0% 0%"><a href="home">{{ item.name }}</a></li>
            </div>
            <div v-else>
              <li><a href="home">{{ item.name }}</a></li>
            </div>
          </div>
          <!-- <div v-for="(item, index) in value" :key="item.id">
            <div v-if="index == item.length - 1">
              <li style="float: right; margin: 0% 0% 0% 0%;"><a>Холбоо</a></li>
            </div>
          </div> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MenuServices from '@/services/MenuServices'
import SearchService from '@/services/SearchService'
export default {
  data() {
    return {
      value: [],
      value1: []
    }
  },
  created () {
    this.getList()
    this.valuelist()
  },
  methods: {
    getList () {
      console.log('data------------------------')
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
    }
  }
}
</script>
<style lang="scss" scoped>
.header_area{
  margin-top: 1%

}
.center{ display:block; margin-left:10% ; margin-right:10% ;padding:0%}
.main_menu_area{width: 100%; ; background:#1a3675; min-height:50px; overflow: hidden}
.main_menu_area ul{margin:0; padding:0; list-style:none; overflow: hidden}
.main_menu_area ul li{float:left; position:relative; overflow: hidden}
.main_menu_area ul li a{
  color:#FFF;
  overflow: hidden;
  display:block;
  font-family: SegoeUI;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  text-decoration: none;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left; padding:18px 18.7px
}
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
