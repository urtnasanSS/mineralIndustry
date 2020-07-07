<template>
  <div>
    <div class="left_coloum_top">
      <!-- <img class="wscnph" src="img/f48235f96fadaa78fbd96a76aa929d17.png" width="100%"> -->
      <!-- <pre slot="src" v-html="value.content">{{ value.content }}</pre> -->
      <div>
        <img src="value.content">
      </div>
      <h3>
        {{ value.title }}
      </h3>
    </div>
    <div id="left_coloum_mid">
      <div id="upper_line" style="width: 100%;">
        <hr style=" float:left; width: 4px; height: 18px; margin: 0; padding: 0; background-color: #1a3675;">
        <p>Мэдээ мэдээлэл </p>
      </div>
      <div class="left_coloum_mid_1" style="width: 50%; float: left; padding-right: 5%;">
        <img src="img/f48235f96fadaa78fbd96a76aa929d17.png">
        <h3 style="text-align: left;">
          {{ value.title }}
        </h3>
      </div>
      <div class="left_coloum_mid_2" style="width: 50%; float: left;  padding-left: 5%;">
        <img src="img/f48235f96fadaa78fbd96a76aa929d17.png">
        <h3>
          {{ value.title }}
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
import ContentServices from '@/services/ContentServices.js'

export default {
  data() {
    return {
      data: [],
      value: {}
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      // ҮНДСЭН ЖАГСААЛТЫГ ДУУДАХ
      ContentServices.index()
        .then((response) => {
          this.data = response.data
          this.value = this.data[0]
          console.log(this.value, 'data------------------------121;')
        })
        .catch((err) => {
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
      this.listLoading = false
    }
  }
}
</script>
<style>
#left_coloum_top h3{
width: 1040px;
height: 48px;
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
width: 100%; height: auto;
float: left;
}
#left_coloum_mid {
/* overflow to handle inner floating block */
overflow: hidden;
}
.left_coloum_mid_1 img{
width: 100%; height: auto;
float: left;}
.left_coloum_mid_1 h3{
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

.left_coloum_mid_2 img{
float: right;
width: 100%; height: auto;
}

.left_coloum_mid_2 h3{
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
