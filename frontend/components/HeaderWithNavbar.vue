<template>
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

        <form
          action="#"
          method="post"
          id="search_form"
          style="
          margin-top: 4%;
					float: right;
					width: 361px;
					height: auto;
					border-radius: 12px;
					border: solid 0.5px #707070;
					background-color:white;"
        >
          <img src="img/search (1).png" style="width: 15px; margin: 1% 2% 1% 0%">
        </form>
      </div>
    </div>
    <div class="main_menu_area" style="background-color: #1a3675 ;">
      <div class="center">
        <ul>
          <div>
            <li><a href="home">Нүүр хуудас</a></li>
            <li><a>Мэдээ мэдээлэл<img src="img/down-arrow1.png" style="padding: 0 0 0 5px;"></a></li>
            <li><a>Тусгай зөвшөөрөл<img src="img/down-arrow1.png" style="padding: 0 0 0 5px;"></a></li>
            <li><a href="maps">Газрын зураг</a></li>
            <li><a>Статистик мэдээлэл<img src="img/down-arrow1.png" style="padding: 0 0 0 5px;"></a></li>
            <li><a>Эрх зүйн баримт бичиг<img src="img/down-arrow1.png" style="padding: 0 0 0 5px;"></a></li>
          </div>
          <li style="float: right; margin: 0% 0% 0% 0%;"><a href="contact">Холбоо барих</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MenuServices from '@/services/MenuServices'
export default {
  data() {

  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      console.log('data------------------------')
      // ҮНДСЭН ЖАГСААЛТЫГ ДУУДАХ
      MenuServices.index()
        .then((response) => {
          const data = response.data
          console.log(data, 'data------------------------;')
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
