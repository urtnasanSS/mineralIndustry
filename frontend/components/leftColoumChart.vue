<template>
  <div>
    <div class="leftColoumChart">
      <div class="leftColoumChart_1">
        <div class="graphHeight">
          <div class="upper_line">
            <hr />
            <p>Газрын тосны үнэ</p>
          </div>
          <div class="cart_1">
            <img src="../static/img/statics.jpg" />
            <div class="title">
              <div class="text"><a href="https://oilprice.com/oil-price-charts/" target="_blank">Oilprice.com тайлан мэдээ</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="leftColoumChart_2">
        <div class="upper_line">
          <hr />
          <p>WTI Cruide</p>
        </div>
        <div class="cart">
          <div style="max-width: 100%;" data-current-size="medium" data-size="medium" class="oilprice_com_widget_iframe_embed_holder"><iframe class="oilprice_com_widget_iframe_embed" style="height:300px; width:304px" src="https://oilprice.com/widgets/oilprice_image/45_2_1597315080" title="WTI Crude Price Chart 7/14/2020 to 8/13/2020"></iframe></div>
          <!-- <PieChart /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import PieChart from '~/components/PieChart.js'
// import CommitChart from '~/components/CommitChart.js'
export default {
  components: {
    // CommitChart
    // PieChart
  }
}
</script>
<style lang="scss" scoped>

.leftColoumChart {
  .leftColoumChart_1 {
    width: 50%;
    float: left;
    padding-right: 5%;
    @media screen and (max-width: 599px) {
      float: left;
      width: 100%;
    }
    .graphHeight {
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
      .upper_line p{
        margin: 1%;
        width: auto;
        height: auto;
        font-family: 'Roboto', sans-serif;
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 700;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
      }
      .cart {
        width : 100%;
        height: auto;
        margin-top: 12px;
      }
      .cart_1:hover {
        .title {
          opacity: 1;
        }
      }
      .cart_1 {
        margin-top: 12px;
        position: relative;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
        .title {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          width: 100%;
          opacity: 0;
          transition: .5s ease;
          background-color: rgba(0,0,0,.5);
          .text a{
            font-family: sans-serif,Arial,Helvetica;
            color: white;
            font-size: 24px;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            text-align: center;
          }
        }
      }
      hr {
        float: left;
        width: 4px;
        height: 18px;
        margin: 0 1%;
        padding: 0;
        background-color: #1a3675;
      }
    }
  }
  .leftColoumChart_2 {
    width: 50%;
    float: left;
    padding-left: 5%;
    @media screen and (max-width: 599px) {
      float: left;
      width: 100%;
    }
    .upper_line p{
      margin: 1%;
      width: auto;
      height: auto;
      font-family: 'Roboto', sans-serif;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
    }
    .cart {
      width : 100%;
      height: auto;
    }
    hr {
      float: left;
      width: 4px;
      height: 18px;
      margin: 0 1%;
      padding: 0;
      background-color: #1a3675;
    }
  }
}
</style>
