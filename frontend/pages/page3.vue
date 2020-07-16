<template>
  <div>
    <HeaderWithNavbar />
    <div id="content_area" class="center">
      <div id="left_content" style="width: 40%; margin: 5% 0% 5% 0%; float: left;">
        <a>
          Холбоо барих
        </a>
        <a
          style="
          float: left;
          width: 100%;
          height: 20px;
          opacity: 0.49;
          font-family: SegoeUI;
          font-size: 15px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.33;
          letter-spacing: normal;
          text-align: left;
          color: #000000;"
        > Сэтгэгдэл бичих
        </a><br>
        <hr
          style="  float: left;
            width: 100%;
            height: 170px;
            opacity: 0.2;
            border-radius: 11px;
            border: solid 1px #707070;
            background-color: white"
        >
        <a
          style="  float: left;
              width: 105px;
              height: 20px;
              opacity: 0.49;
              font-family: SegoeUI;
              font-size: 15px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.33;
              letter-spacing: normal;
              text-align: left;
              color: #000000;"
        >Утасны дугаар</a>
        <hr
          style="
              float: left;
              width: 100%;
              height: 38px;
              opacity: 0.2;
              border-radius: 9px;
              border: solid 1px #707070;
              background-color: white;"
        >
        <a
          style="
              float:left;
              width: 85px;
              height: 20px;
              opacity: 0.49;
              font-family: SegoeUI;
              font-size: 15px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.33;
              letter-spacing: normal;
              text-align: left;
              color: #000000;"
        >Цахим хаяг</a>
        <hr
          style="
              float: left;
              width: 100%;
              height: 38px;
              opacity: 0.2;
              border-radius: 9px;
              border: solid 1px #707070;
              background-color: white;"
        >
        <div
          style="
              margin: 5% 5% 5% 0%;
              float: left;
              width: 168px;
              height: 38px;
              border-radius: 9px;
              background-color: #1a3675;"
        >
          <a
            style="
              margin: 5% 35% 5% 35%;
              float: left;
              width: 50px;
              height: 20px;
              font-family: SegoeUI;
              font-size: 15px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.33;
              letter-spacing: normal;
              text-align: left;
              color: white;"
          >Илгээх</a>
        </div>
      </div>
      <div id="right_content" style="width: 20%; float: left; margin: 10% 0% 10% 5%">
        <a
          style="
              float: left;
              margin: 0% 0% 10% 0% ;
              width: 269px;
              height: 160px;
              font-family: SegoeUI;
              font-size: 15px;
              font-weight: 600;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.33;
              letter-spacing: normal;
              text-align: left;
              color: #000000;"
        >Монгол улс, Улаанбаатар,
          Нэгдсэн Үндэстний гудамж-5/2,
          Засгийн газрын II байр
          Утас: (51)-263506, (51)-260864
          Факс: (11)-318169
          Цахим шуудан: mpetro@mmhi.gov.mn</a>
        <a
          style="  width: 331px;
              height: 80px;
              font-family: SegoeUI;
              font-size: 15px;
              font-weight: 600;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.33;
              letter-spacing: normal;
              text-align: left;
          color: #000000;"
        >Иргэд, байгууллагаас захидал, өргөдөл хүлээн
          авах ажилтан Ш.Уранчимэг
          Утас 263506, 318169 /факс/, өрөөний
          дугаар 201 тоот</a>
      </div>
    </div>
    <foother />
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import foother from '~/components/foother.vue'

export default {
  components: {
    HeaderWithNavbar,
    foother
  }
}

</script>

<style>
.center{display:block; margin-left:10% ; margin-right:10% ;padding:0%; }
.logo_mmhi {
width: 263px;
height: 82px;
object-fit: contain;
}

.text{
width: 1293px;
height: 665px;
font-family: SegoeUI;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: italic;
line-height: 1.36;
letter-spacing: normal;
text-align: left;
color: #000000;
}
.title {
  font-weight: bold;
  font-style: normal;
}
</style>
