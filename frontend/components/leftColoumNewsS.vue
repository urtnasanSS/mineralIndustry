<template>
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
</template>
<script>
export default {
   components: {
    Slider
  },
  data () {
    return {
      list: [],
      files: [],
      slides: [],
      firstValue: [],
      slideDuration: 4000,
      firstValueImage: [],
      baseUrl: process.env.baseUrl,
      listQuery: {
        limit: 3,
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
}
</script>

<style>
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
</style>
