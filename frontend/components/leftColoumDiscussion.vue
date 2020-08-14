<template>
  <div class="leftColoumChart">
    <div class="upperLine">
      <hr>
      <p>Хэлэлцүүлэг</p>
    </div>
    <div class="leftColoum">
      <div v-for="item in list" :key="item.id" class="items">
        <nuxt-link :to="'/content/' + item.id"><a class="textTitle">{{ item.title }}</a></nuxt-link>
        <small
          style=" float:left; width: auto; margin:2% 0% 0% 0%; height: auto; opacity: 0.4; font-family: roboto; font-size: 11px; font-weight: normal; font-stretch: normal; font-style: italic; line-height: 1.33;
            letter-spacing: normal; text-align: left; color: #000000;"
        >{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
        <button class="button is-rounded is-small" style="margin: 10px 0 0 10px">
          <nuxt-link class="more" tag="span" :to="'/content/' + item.id"><span class="text">Дэлгэрэнгүй...</span></nuxt-link>
        </button>
        <div class="comment">
          <button class="button is-small is-fullwidth">Хариулт</button>
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
      files: [],
      comments: [],
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 5,
        currentPage: 1,
        sort: {
          prop: 'publishDate',
          order: 'descending'
        },
        search: {
          categoryIds: [2]
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
.leftColoumChart {
  padding-top: 1%;
  float: left;
  width: 100%;
  .upperLine {
    margin: 1% 1% 1% 0;
    hr {
      float: left;
      width: 4px;
      height: 18px;
      margin: 0px 5px 0 0;
      background-color: #1a3675;
    }
    p {
      height: 24px;
<<<<<<< HEAD
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
=======
      font-family: 'Roboto', sans-serif;
>>>>>>> f5c87a8f210445532548ac0927e923fb597a0ded
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
  }
  .leftColoum {
    .items {
      padding: 0px 0 15px 0;
      a {
        float: left;
        width: 100%;
        height: auto;
        font-family: roboto;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.31;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
      }
      .textTitle:hover {
        text-decoration: underline;
          color: #1a3675;
      }
      .textTitle {
        white-space: nowrap;
        max-width: 100%;
        font-family: 'Roboto', sans-serif;
        font-size: 13px;
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
      .comment {
        overflow: hidden;
        float: right;
        margin: 10px;
        width: 13%;
        height: 23px;
        border-radius: 6px;
        text-align: center;
        @media screen and (max-width: 599px) {
          width: 15%;
        }
        @media screen and (max-width: 439px) {
          width: 18%;
        }
        button {
          background-color: #e55f5f;
          @media screen and (max-width: 494px) {
            display: none;
          }
        }
        a {
          width:75%;
          padding: 1px;
          height: 16px;
          font-family: roboto;
          font-size: 12px;
          font-weight: normal;
          font-stretch: normal;
          font-style: italic;
          line-height: 1.33;
          letter-spacing: normal;
          text-align: left;
          color: #ffffff;
          @media screen and (max-width: 1007px) {
            font-size: 10px;
          }
          @media screen and (max-width: 935px) {
            font-size: 10px;
          }
          @media screen and (max-width: 777px) {
            padding-top: 4px;
            font-size: 9px;
          }
          @media screen and (max-width: 494px) {
            padding: 5px 0 0 7px;
            font-size: 8px;
          }
          @media screen and (max-width: 373px) {
            font-size: 7px;
          }
        }
      }
    }
  }
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
  font-family: roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: italic;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #000000
}
</style>
