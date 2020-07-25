<template>
  <div>
    <HeaderWithNavbar />
    <div id="content_area " class="container">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <leftColoumNews />
          <leftColoumNewsS />
          <leftColoumChart />
          <leftColoumDiscussion />
        </div>
        <div class="tile">
          <div class="tile is-vertical is-1"></div>
          <div class="tile is-vertical is-11">
            <rightColoum />
            <rightColoumAnnoun />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <calculator />
    </div>
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
import rightColoumAnnoun from '~/components/rightColoumAnnoun.vue'
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
    leftColoumNewsS,
    rightColoumAnnoun
  }
}

</script>

<style>

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
</style>
