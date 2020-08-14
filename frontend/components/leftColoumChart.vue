<template>
  <div>
    <div class="leftColoumChart">
      <div class="leftColoumChart_1">
        <div class="graphHeight">
          <div class="upper_line">
            <hr />
            <p>Импортын тайлан мэдээ (сараар)</p>
          </div>
          <div class="cart">
            <CommitChart />
          </div>
        </div>
      </div>
      <div class="leftColoumChart_2">
        <div class="upper_line">
          <hr />
          <p>Хамгийн их /ШТС/-тэй 10 компани</p>
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
import CommitChart from '~/components/CommitChart.js'
export default {
  components: {
    CommitChart
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
