<template>
  <div>
    <div class="header_area center">
      <div id="header_area_1" style="width: 50%; float: left;">
        <img src="img/logo_mmhi.png">
      </div>

      <div id="header_area_2" style="width: 50%; float:left; text-align: right;">
        <p
          style=" height: auto; font-family: SegoeUI; font-size: 15px;
				font-weight: bold; font-stretch: normal; font-style: normal; line-height: 1.33; letter-spacing: normal;color: #000000; "
        >
          Утас: (51)-263506, (51)-264373
          Цахим шуудан: info@mmhi.gov.mn
        </p>

        <form
          action="#"
          method="post"
          id="search_form"
          style="
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
          <li style="float: right; margin: 0% 0% 0% 0%;"><a href="contactUs">Холбоо барих</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
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

</style>
