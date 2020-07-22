<template>
  <div id="right_coloum">
    <div id="right_coloum_news_header_2">
      <h3>Зарлал</h3>
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
            <nuxt-link tag="span" :to="'/content/' + item.id">Дэлгэрэнгүй...</nuxt-link>
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
        limit: 7,
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
        console.log(this.list, '------------------------list------------')
      }).catch((err) => {
        this.list = []
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    }
  }
}
</script>
<style>
#right_coloum {
float: left;
width: 30%;
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
