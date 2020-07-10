<template>
  <div>
    <div>
      <div id="left_coloum_top" v-for="(value, index) in list" :key="value">
        <div>
          <div v-if="index === 0">
            <h3>{{ value.title }} </h3>
            <img :src="baseUrl + value.files[0].storageName" style="width:auto;height:auto;" alt="Placeholder image">
          </div>
        </div>
      </div>
      <div id="left_coloum_mid">
        <div id="upper_line" style="width: 100%;">
          <hr style=" float:left; width: 4px; height: 18px; margin: 0; padding: 0; background-color: #1a3675;">
          <p>Мэдээ мэдээлэл </p>
        </div>
        <div id="left_coloum_mid_1" v-for="(value, index) in list" :key="value">
          <div v-if="index === 1">
            <img v-if="index === 1" :src="baseUrl + value.files[0].storageName" style="width:auto;height:auto;" alt="Placeholder image">
            <h3>{{ value.title }} </h3>
          </div>
        </div>
        <div id="left_coloum_mid_2" v-for="(value, index) in list" :key="value">
          <div v-if="index === 2">
            <img :src="baseUrl + value.files[0].storageName" style="width:auto;height:auto;" alt="Placeholder image">
            <h3>{{ value.title }} </h3>
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
  name: 'RelatedNews',
  components: {
  },
  data () {
    return {
      list: [],
      files: [],
      firstValue: [],
      firstValueImage: [],
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 4,
        currentPage: 1,
        sort: {
          prop: 'count',
          order: 'descending'
        },
        search: {
          categoryIds: [1, 2, 3]
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
        const data = response.data
        this.list = JSON.parse(JSON.stringify(data.rows))
        console.log(this.list, '--data--')
      }).catch((err) => {
        this.list = []
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    }
  }

}
</script>
<style>
#left_coloum_top h3{
float: left;
width: 100%;
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
#left_coloum_top img{
width: 100%;
height: auto;
float: left;
}
#left_coloum_mid {
overflow: hidden;
width: 100%;
}
#left_coloum_mid_1{
width: 50%;
float: left;
padding-right: 5%
}
#left_coloum_mid_1 img{
width: 100%;
height: auto;
float: left;
}

#left_coloum_mid_1 h3{
font-family: SegoeUI;
font-size: 14px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.31;
letter-spacing: normal;
text-align: left;
color: #000000;
float: left;
}
#left_coloum_mid_2{
width: 50%;
float: left;
padding-right: 5%
}
#left_coloum_mid_2 img{
float: right;
width: 100%;
height: auto;
}

#left_coloum_mid_2 h3{
width: 100%; height: auto;
font-family: SegoeUI;
font-size: 14px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.31;
letter-spacing: normal;
text-align: left;
color: #000000;
float: right;
}
#upper_line p{
margin: 1% 1% 1% 1%;
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
</style>
