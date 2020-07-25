<template>
  <div>
    <div id="right_coloum">
      <div>
        <button id="login" onclick="window.location.href='http://localhost:3300/login'" style="width: 100%; background-color: #486dbf; height: 35px;" class="button login is-info fas fa-sign-in-alt "><h1>Газрын тос нэвтрэх</h1></button>
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
        <div class="column is-6" style="height:103px; float:left">
          <img :src="baseUrl + item.files[0].storageName" style="float: left; width: 80%; height:100%; border-radius: 5px">
        </div>
        <div class="column is-6">
          <a class="textLine">{{ item.title }}</a>
          <small
            style=" float:left; width: 100%; margin:4% 0% 0% 0%; height: auto; opacity: 0.4; font-family: SegoeUI; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: italic; line-height: 1.33;
              letter-spacing: normal; text-align: left; color: #000000;"
          >{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
          <button class="button is-rounded is-small" style="margin: 10px 0 0 0px">
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
<style>

#login{
overflow: hidden;
margin-top: 2%;
margin-bottom: 2%;
width: 80%;
height: auto;
border-radius: 10px;
background-color: #486dbf;
}
#login h1{
margin:0% 0% 0% 3% ;
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
float: left;
color: #ffffff;
}
.textLine {
  font-family: SegoeUI;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
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
#right_coloum {
float: left;
}

#right_coloum_news_1 a{
float: left;
margin-left: 3%;
width: 100%;
height: auto;
font-family: SegoeUI;
font-size: 12px;
font-weight: bold;
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
.more a{
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
font-family: SegoeUI;
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
