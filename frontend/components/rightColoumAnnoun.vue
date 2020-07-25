<template>
  <div id="right_coloum_zar">
    <div id="right_coloum_news_header_2">
      <h3 class="headerTitle">Зарлал</h3>
      <hr
        style="
        display: block;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        margin-left: auto;
        margin-right: auto;
        border-style: inset;
        border-width: 1px;"
      >
    </div>

    <div id="right_coloum_announcement">
      <div id="right_coloum_announcement_1" style="float:left; margin-bottom: 16px; max-width: 100%;">
        <div v-for="item in list" :key="item.id">
          <a>{{ item.title }}</a>
          <small
            style=" float:left; width: 40%; margin:5px 0 0 0; height: auto; opacity: 0.4; font-family: SegoeUI; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: italic; line-height: 1.33;
            letter-spacing: normal; text-align: left; color: #000000;"
          >{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
          <button class="button is-rounded is-small" style="margin: 10px 0 0 100px">
            <nuxt-link class="more" tag="span" :to="'/content/' + item.id"><span class="text">Дэлгэрэнгүй...</span></nuxt-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ContentServices from '~/services/ContentServices'

export default {
  components: {
  },
  data () {
    return {
      list: [],
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 14,
        currentPage: 1,
        sort: {
          prop: 'publishDate',
          order: 'descending'
        },
        search: {
          categoryIds: [1]
        }
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    moment,
    getData () {
      ContentServices.index(this.listQuery).then((response) => {
        this.list = response.data.rows
      }).catch((err) => {
        this.list = []
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    }
  }
}
</script>
<style>
.headerTitle {
  height: 24px;
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
#right_coloum_zar {
  float: left;
  margin-top: 21px;
}
.more {
  float: left;
  margin: 10px 10px 10px 0;
  height: 19px;
  border-radius: 6px;
  background-color: #ffffff;
  text-align: center;
}
.text {
  padding: 3% 4% 1% 14%;
  float: left;
  width: 50%;
  height: 16px;
  opacity: 0.4;
  font-family: SegoeUI;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000
}
#right_coloum_announcement_1 a{
float: left;
width: 366px;
height: auto;
font-family: SegoeUI;
font-size: 15px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #000000;
}
</style>
