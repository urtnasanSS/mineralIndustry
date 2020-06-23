<template>
  <div class="columns is-gapless">
    <div class="column is-one-fifth" style="line-height:24px;">
      <span class="breaking-news">{{ lang == 'mn' ? 'Шуурхай мэдээ:' : 'Breaking News:' }}</span>
      <span class="times">
        {{ moment(marqDate).format("YYYY-MM-DD") }}
      </span>
    </div>
    <div class="column" style="padding-left:1px !important; width: 80%;">
      <!-- <transition name="fade"> -->
      <div v-if="slides && slides.length > 0" class="marqueeeeeee">
        <marquee-text :duration="slides.length * 10" :paused="paused">
          <!-- {{ marqtext }} -->
          <nuxt-link
            @mouseover.native="paused = true"
            @mouseleave.native="paused = false"
            v-for="(item, index) in slides"
            :key="item.id"
            :to="'/content/' + item.id"
            style="margin-right: 100px;"
          >
            {{ index + 1 }}. {{ item.title }}
          </nuxt-link>
        </marquee-text>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
import moment from 'moment'
// import marqueetext from 'vue-marquee-text-component'
// import { VueListMarquee } from 'vue-list-marquee'
import ContentServces from '~/services/ContentServices'
// import 'vue-list-marquee/dist/vue-list-marquee.css'
export default {
  components: {
    // VueListMarquee
    // 'marquee-text': marqueetext
  },
  data () {
    return {
      slideDuration: 4000,
      slides: [],
      loadingContent: false,
      paused: false,
      lang: '',
      listQuery: {
        limit: 50,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          isStopPress: true
        }
      },
      marqtext: '',
      marqDate: '',
      marqId: null
    }
  },
  watch () {
    this.lang = this.$store.state.language.language.code
  },
  mounted () {
    this.lang = this.$store.state.language.language.code
    this.getMarq()
  },
  methods: {
    moment,
    handleClickTitle () {
      if (this.marqId) {
        this.$nuxt.$router.replace({ path: '/content/' + this.marqId })
      }
    },
    getMarq () {
      this.loadingContent = true
      ContentServces.index(this.listQuery).then((response) => {
        // console.log(response, 'response.data.rows11++++22')
        if (response.data && response.data.rows) {
          const list = response.data.rows
          this.slides = list
          // console.log('-----------', list)
          const selft = this
          for (let i = 0; i < 1; i++) {
            (function (i) {
              setTimeout(function () {
                selft.marqtext = ''
                selft.marqtext = list[i].title
                selft.marqId = list[i].id
                selft.marqDate = list[i].publishDate
              }, 3000 * i)
            })(i)
          };
        }
        this.loadingContent = false
      })
        .catch((err) => {
          this.loadingContent = false
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
.is-gapless{
  padding: 5px 0 0 0;
  .breaking-news {
    display: inline-block;
    float: left;
    position: relative;
    margin-right: 20px;
    color: #ffffff;
    font-size: 11px;
    line-height: 14px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    padding: 8px 10px;
    padding-right: 17px;
    background: #da0717;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    border-radius: 4px;
    &:after {
      content: "";
      position: absolute;
      width: 22px;
      height: 22px;
      background: #da0717;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -o-border-radius: 5px;
      border-radius: 5px;
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      transform: rotate(45deg);
      top: 3px;
      right: -7px;
    }
  }
}
.times {
  color: #da0717;
  margin-right: 3px;
  font-size: 14px;
  @media screen and (max-width: 1215px) {
    font-size: 9px;
    line-height: 10px;
  }
}
.marqueeeeeee{
  // border: solid 1px red;
  // text-transform: uppercase;
  a {
    color: #606266;
    &:hover {
      color: #3273dc;
    }
  }
  &:hover{
    text-decoration: underline;
    cursor: pointer;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
