<template>
  <div>
    <div class="right_coloum">
      <div>
        <button onclick="window.location.href='/login'" class="button login is-info fas fa-sign-in-alt"><h2>Газрын тос нэвтрэх</h2></button>
      </div>
      <div id="right_coloum_news_header_1">
        <h3 class="headerTitle">Цаг үеийн мэдээлэл</h3>
        <hr
          style="display: block;
						margin-top: 0.5em;
						margin-bottom: 0.5em;
						margin-left: auto;
						margin-right: auto;
						border-style: inset;
						border-width: 1px;"
        >
      </div>
      <div class="columns" v-for="item in list" :key="item.id">
        <div class="column is-5 imageSize">
          <img :src="baseUrl + item.files[0].storageName" class="image">
        </div>
        <div class="column is-6 textSize">
          <nuxt-link :to="'/content/' + item.id">
            <a class="textLine">{{ item.title }}</a>
          </nuxt-link>
          <small>{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
          <p class="subtitle"><i class="fas fa-eye" /> {{ item.count }}</p>
          <!-- <button class="button is-rounded is-small Detail">
            <nuxt-link class="more" tag="span" :to="'/content/' + item.id"><span class="text">Дэлгэрэнгүй...</span></nuxt-link>
          </button> -->
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
        limit: 5,
        currentPage: 1,
        sort: {
          prop: 'publishDate',
          order: 'descending'
        },
        search: {
          categoryIds: [3]
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
.right_coloum {
  float: left;
  .button {
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
  .columns {
    @media screen and (max-width: 768px) {
      float: left;
    }
    height: auto;
    .imageSize {
      height:110px;
      float:left;
      @media screen and (max-width: 768px) {
        height: 125px;
        float: left;
        width: 35%;
      }
      @media screen and (max-width: 480px) {
        width: 100%;
        height: 150px;
      }
      .image {
        float: left;
        min-width: 150px;
        width: 100%;
        height:100%;
        border-radius: 5px;
        @media screen and (max-width: 1215px) {
          min-width: 100px;
        }
        @media screen and (max-width: 768px) {
          min-width: 175px
        }
        @media screen and (max-width: 540px) {
          min-width: 150px
        }
        @media screen and (max-width: 480px) {
          min-width: 100px;
        }
      }
    }
    .textSize {
      @media screen and (max-width: 768px) {
        float: left;
        width: 60%;
      }
      @media screen and (max-width: 480px) {
        width: 100%;
      }
      .textLine:hover {
        text-decoration: underline;
        color: #1a3675;
      }
      .textLine {
        padding-top: 5px;
        font-family: 'Roboto', sans-serif;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;
        position: relative;
        font-stretch: normal;
        font-style: normal;
        line-height: 16px;
        letter-spacing: normal;
        text-align: left;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        -webkit-box-orient: vertical;
      }
      .subtitle {
				float: right;
				font-size: 11px;
				color: #070d1b;
        width: 50%;
        margin: 5% 0% 0% 0%;
        padding: 0 3% 0 0;
        height: auto;
        opacity: 0.4;
        font-family: 'Roboto', sans-serif;
        font-weight: normal;
        font-stretch: normal;
        font-style: italic;
        line-height: 1.33;
        letter-spacing: normal;
        text-align: right;
      }
      small {
        float:left;
        width: 50%;
        margin:7% 0% 0% 0%;
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
        color: #070d1b;
        @media screen and (max-width: 768px) {
          margin: 10px 0;
        }
      }
      .Detail {
        margin: 10px 0 0 0px;
        width:100%;
        @media screen and (max-width: 768px) {
          margin: 10px 0;
          max-width: 100%;
        }
        .more {
          float: left;
          margin: 10px 10px 10px 0;
          height: 19px;
          border-radius: 6px;
          background-color: #ffffff;
          text-align: center;
          a {
            padding: 3% 4% 1% 14%;
            float: left;
            width: 50%;
            height: 16px;
            opacity: 0.4;
            font-family: 'Roboto', sans-serif;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            font-style: italic;
            line-height: 1.33;
            letter-spacing: normal;
            text-align: center;
            color: #000000;
          }
        }
      }
    }
  }
  .login {
    overflow: hidden;
    margin: 2% 5% 3% 5%;
    width: 80%;
    height: auto;
    border-radius: 10px;
    background-color: #486dbf;
    h2 {
      margin:0% 0% 0% 3% ;
      width: auto;
      height: auto;
      font-family: roboto;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.33;
      letter-spacing: normal;
      text-align: left;
      float: left;
      color: #ffffff;
      @media screen and (max-width: 1110px) {
        font-size: 16px;
      }
      @media screen and (max-width: 850px) {
        font-size: 14px;
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
  letter-spacing: normal;
  text-align: left;
  color: #000000;
}

#right_coloum_news_1 a{
float: left;
margin-left: 3%;
width: 100%;
height: auto;
font-family: 'Roboto', sans-serif;
font-size: 12px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #000000;
}

#more_1 {
overflow: hidden;
float: left;
margin: 10px;
width: 40%;
height: 19px;
border-radius: 6px;
border: solid 0.5px #707070;
background-color: #ffffff;
text-align: center;

}
#more_1 a{
padding:   1% 40% 1% 25%;
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
color: #000000;
}
</style>
