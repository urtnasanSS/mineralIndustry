<template>
  <div class="left_coloum_mid">
    <div id="upper_line" style="width: 100%;">
      <hr style=" float:left; width: 4px; text-transform: uppercase; height: 15px; margin: 0; padding: 0; background-color: #1a3675;">
      <p>Мэдээ мэдээлэл </p>
    </div>
    <div class="left_coloum_mid_1" v-for="item in list" :key="item.id">
      <nuxt-link tag="span" :to="'/content/' + item.id">
        <img :src="baseUrl + item.files[0].storageName" alt="Placeholder image">
        <nuxt-link :to="'/content/' + item.id"><h3>{{ item.title }}</h3></nuxt-link>
      </nuxt-link>
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
        limit: 2,
        currentPage: 1,
        sort: {
          prop: 'count',
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
    },
    getFileUrl (value) {
      if (value.files && value.files) {
        const files = value.files.filter(i => i.fileType.includes('image'))
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
}
</script>

<style lang="scss" scoped>
.left_coloum_mid {
  margin: 1.5%;
  overflow: hidden;
  width: 100%;
  height: auto;
  .left_coloum_mid_1 {
    width: 50%;
    float: left;
    padding-right: 3%;
    @media screen and (max-width: 599px) {
      width: 100%;
    }
    img:hover {
      -webkit-box-shadow: 0 0 10px grey;
    }
    img {
      border-radius: 12px;
      width: 100%;
      height: 200px;
      float: left;
    }
    h3:hover {
      text-decoration: underline;
      color: #1a3675;
    }
    h3 {
      font-family: 'Roboto', sans-serif;
      font-size: 13px;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.31;
      letter-spacing: normal;
      text-align: left;
      color: #000000;
      float: left;
      margin-top: 15px;
    }
  }
}
#upper_line p{
  margin:1% 1% 1% 1%;
  width: auto;
  text-transform: uppercase;
  height: auto;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
}
</style>
