<template>
  <div>
    <div id="leftColoumChart">
      <div id="upper_line" style="margin: 1% 1% 1% 1%">
        <hr style="float: left; width: 4px; height: 18px; margin: 0; padding: 0; background-color: #1a3675;">
        <p>Хэлэлцүүлэг</p>
      </div>
      <div id="leftColoumChart_1" style="float:left; margin-bottom: 16px; width: 100%; height: auto;">
        <div v-for="item in list" :key="item.id" class="items">
          <a class="textTitle">{{ item.title }}</a>
          <small
            style=" float:left; width: auto; margin:2% 0% 0% 0%; height: auto; opacity: 0.4; font-family: SegoeUI; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: italic; line-height: 1.33;
              letter-spacing: normal; text-align: left; color: #000000;"
          >{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
          <button class="button is-rounded is-small" style="margin: 10px 0 0 10px">
            <nuxt-link class="more" tag="span" :to="'/content/' + item.id"><span class="text">Дэлгэрэнгүй...</span></nuxt-link>
          </button>
          <div id="comment">
            <img src="img/comment.png" alt="">
            <a>{{ item.commentIds.length }} хариулт</a>
          </div>
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
.items {
  padding: 0px 0 7px 0;
}
.textTitle {
  max-width: 1095px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#leftColoumChart_1 a{
float: left;
width: 100%;
height: auto;
font-family: SegoeUI;
font-size: 16px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.31;
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
#more_2 {
overflow: hidden;
float: left;
margin: 10px;
width: 15%;
height: 19px;
border-radius: 6px;
border: solid 0.5px #707070;
background-color: #ffffff;
text-align: center;

}
#more_2 a{

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
#comment {

overflow: hidden;
float: right;
margin: 10px;
width: 13%;
height: 20px;
border-radius: 6px;
background-color: #e55f5f;
}
#comment img{
float: left;
margin: 4% 0% 4% 4%;
width: 13.6px;
height: 12.5px;
object-fit: contain;
}
#comment a{
width: 57px;
height: 16px;
margin:3% 0% 5% 10%;
font-family: SegoeUI;
font-size: 12px;
font-weight: normal;
font-stretch: normal;
font-style: italic;
line-height: 1.33;
letter-spacing: normal;
text-align: left;
color: #ffffff;
}
</style>
