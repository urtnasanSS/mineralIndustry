<template>
  <div>
    <HeaderWithNavbar />
    <div id="content_area " class="center" style=" float: left; margin-top: 10px;">
      <div id="left_coloum">
        <leftColoumNews />
        <leftColoumNewsS />
        <leftColoumChart />
        <leftColoumDiscussion />
      </div>
      <rightColoum />
    </div>
    <calculator />
    <foother />
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import foother from '~/components/foother.vue'
import leftColoumNews from '~/components/leftColoumNews.vue'
import leftColoumNewsS from '~/components/leftColoumNewsS.vue'
import leftColoumChart from '~/components/leftColoumChart.vue'
import leftColoumDiscussion from '~/components/leftColoumDiscussion.vue'
import rightColoum from '~/components/rightColoum.vue'
import calculator from '~/components/calculator.vue'

export default {
  components: {
    HeaderWithNavbar,
    leftColoumNews,
    leftColoumChart,
    leftColoumDiscussion,
    rightColoum,
    calculator,
    foother,
    leftColoumNewsS
  }
}

</script>

<style>
.center{ display:block; margin-left:10% ; margin-right:10%}

#upper_line p{
margin: 1% 1% 1% 1%;
width: auto;
height: auto;
font-family: SegoeUI;
font-size: 18px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #000000;
}
.logo_mmhi {
width: 263px;
height: 82px;
object-fit: contain;
}

#left_coloum {
padding-right: 5%;
float: left;
width: 65%;
min-height:600px;
overflow: hidden;
}
</style>
