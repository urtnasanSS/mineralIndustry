<template>
  <div>
    <client-only>
      <HeaderWithNavbar />
      <div class="hero leftTabs">
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-8">
                <leftColoumNews />
                <leftColoumNewsS />
                <leftColoumChart />
                <leftColoumDiscussion />
              </div>
              <div class="column is-4">
                <rightColoum />
                <rightColoumAnnoun />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero secondTabs">
        <div class="hero-body">
          <div class="container">
            <calculator />
          </div>
        </div>
      </div>
      <foother />
    </client-only>
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

<style lang="scss" scoped>
.hero-body {
  padding: 2rem 1.5rem;
}
.leftTabs {
  @media screen and (max-width: 768px) {
    float: left;
    max-width: 100%;
  }
}
.secondTabs {
  @media screen and (max-width: 768px) {
    float: left;
  }
}
</style>
