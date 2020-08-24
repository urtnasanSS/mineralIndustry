<template>
  <div class="right_coloum_zar">
    <div id="right_coloum_news_header_2">
      <p class="headerTitle">Зарлал</p>
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
    <div class="right_coloum_announcement">
      <div v-for="item in list" :key="item.id" class="Anouns">
        <a>{{ item.title }}</a>
        <small>{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
        <button class="button is-rounded is-small">
          <nuxt-link class="more" tag="span" :to="'/content/' + item.id"><span class="text">Дэлгэрэнгүй...</span></nuxt-link>
        </button>
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
<style lang="scss" scoped>
.right_coloum_zar {
  float: left;
  margin-top: 21px;
  max-width: 100%;
  .right_coloum_announcement a:hover {
    text-decoration: underline;
    color: #1a3675;
  }
  .right_coloum_announcement {
    a {
      float: left;
      max-width: 100%;
      height: auto;
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      line-height: 16px;
      text-transform: uppercase;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
    }
    .Anouns {
      margin: 5px 0;
      float: left;
      width: 98.67%;
      a {
        width: 100%;
      }
      .button {
        margin: 10px 0 0 100px;
        float: right;
        @media screen and (max-width: 1407px) {
          margin: 10px 0 0 70px;
        }
        @media screen and (max-width: 1214px) {
          margin: 10px 0 0 30px;
        }
        @media screen and (max-width: 856px) {
          margin: 10px 0 0 22px;
        }
        @media screen and (max-width: 816px) {
          margin: 10px 0 0 15px;
        }
        @media screen and (max-width: 768px) {
          margin: 10px 0 0 241px
        }
      }
      small {
        float:left;
        width: 40%;
        margin:2% 0 0 0;
        height: auto;
        opacity: 0.4;
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: italic;
        line-height: 1.33;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
      }
    }
  }
}
.headerTitle {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000
}
#right_coloum_announcement a{
}
</style>
