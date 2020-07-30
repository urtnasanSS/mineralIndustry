<template>
  <div id="left_coloum_mid">
    <HeaderWithNavbar />
    <div style="margin: 1% 15% 1%">
      <el-row>
        <div id="headerTitle" style="width: 100%;">
          <h3>Мэдээ мэдээлэл</h3>
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
      </el-row>
      <div class="columns" v-for="item in list" :key="item.id">
        <div class="column is-6 detail">
          <div class="columns">
            <div class="column is-5">
              <img :src="baseUrl + item.files[0].storageName" style="border-radius: 5px" alt="Placeholder image">
            </div>
            <div class="column is-7">
              <a>{{ item.title }}</a>
              <footer style="margin-top: 36%">
                <small
                  style="float:left; width: 50%; margin:4% 0% 0% 0%; height: auto; opacity: 0.4; font-family: SegoeUI; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: italic; line-height: 1.33;
                    letter-spacing: normal; color: #000000;"
                >{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
                <button class="button is-rounded is-small" style="margin: 10px 0 0 0px; width:50%">
                  <nuxt-link class="more" tag="span" :to="'/content/' + item.id"><span class="text">Дэлгэрэнгүй...</span></nuxt-link>
                </button>
              </footer>
            </div>
          </div>
        </div>
        <div class="column is-6 is detail">
          <div class="columns">
            <div class="column is-5">
              <img :src="baseUrl + item.files[0].storageName" style="border-radius: 5px" alt="Placeholder image">
            </div>
            <div class="column is-7">
              <a>{{ item.title }}</a>
              <footer style="margin-top: 36%">
                <small
                  style="float:left; width: 50%; margin:4% 0% 0% 0%; height: auto; opacity: 0.4; font-family: SegoeUI; font-size: 12px; font-weight: normal; font-stretch: normal; font-style: italic; line-height: 1.33;
                    letter-spacing: normal; color: #000000;"
                >{{ moment(item.publishDate).format("YYYY-MM-DD") }}</small>
                <button class="button is-rounded is-small" style="margin: 10px 0 0 0px; width:50%">
                  <nuxt-link class="more" tag="span" :to="'/content/' + item.id"><span class="text">Дэлгэрэнгүй...</span></nuxt-link>
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import ContentServices from '~/services/ContentServices'
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
export default {
  components: {
    HeaderWithNavbar
  },
  data () {
    return {
      list: [],
      baseUrl: process.env.baseUrl,
      listQuery: {
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
  },
  getFileUrl (value) {
    if (value.files && value.files) {
      const files = value.files.filter(i => i.fileType.includes('image'))
      // console.log(files[0], ' ---')
      if (files[0]) {
        return this.baseUrl + files[0].storageName
      } else {
        return this.baseUrl + 'noImageBackground.jpg'
      }
    } else {
      return this.baseUrl + 'noImageBackground.jpg'
    }
  }
}
</script>
<style>
#left_coloum_mid {
overflow: hidden;
width: 100%;
height: auto;
}
.headerTitle {
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
.more {
  float: left;
  margin: 10px 10px 10px 0;
  height: 19px;
  border-radius: 6px;
  background-color: #ffffff;
  text-align: center;
}
.detail {
  margin: 10px 3px;
  width: 100%;
}
.detail a {
  float: right;
  font-family: SegoeUI;
  font-size: 12px;
  font-weight: bold;
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
  margin: auto;
  width: 100%;
  float: left;
}
</style>
