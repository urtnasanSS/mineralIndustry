<template>
  <div>
    <div class="foother">
      <div class="container">
        <div class="columns">
          <div class="column is-4 foother_left">
            <a>Холбоо барих</a>
            <hr
              style="
                  float: left;
                  width: 100%;
                  border-style: inset;
                  border-width: 1px;
                  margin: 0.3rem 0 1.5rem 0;"
            >
            <p>{{ value.name }}</p>
            <p>Утас: {{ value.phone }}</p>
            <p>Email: {{ value.Email }}</p>
            <p>Fax: {{ value.Fax }}</p>
          </div>
          <div class="column is-4 foother_right">
            <img src="/img/logo_mmhi.png" style="width: 263px; height: 82px; object-fit: contain; float: left;">
            <p>{{ value.uPosition }} {{ value.uName }} <br />Утас {{ value.uPhone }} /факс/, өрөөний дугаар {{ value.uWork }}</p>
          </div>
        </div>
      </div>
      <div class="foother_2">
        <div class="container">
          <p>2020 © УУЛ УУРХАЙ ХҮНД ҮЙЛДВЭРИЙН ЯАМ.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddressServices from '@/services/AddressServices.js'

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
      AddressServices.index()
        .then((response) => {
          this.data = response.data
          this.value = this.data[0]
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
<style lang="scss" scoped>
.foother{
  float: left;
  width: 100%;
  height: 275px;
  display: block;
  background-color: #f1f1f1;
  .container {
    display:block;
    margin-left:10%;
    margin-right:10%;
    padding:0%;
    .columns {
      height: 263px;
      .foother_left{
        margin: 2.5% 0 0 0;
        float: left;
        a {
          float: left;
          width: 100%;
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
        p {
          font-family: SegoeUI;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.33;
          letter-spacing: normal;
          text-align: left;
          color: #000000;
        }
      }
      .foother_right {
        margin: 4.5% 5% 3% 1.5%;
        float: left;
        p {
          margin-top: 2%;
          float: left;
          height: 40px;
          font-family: SegoeUI;
          font-size: 15px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.33;
          letter-spacing: normal;
          text-align: left;
          color: #000000;
        }
      }
    }
  }
  .foother_2 {
    position: relative;
    float: left;
    width: 100%;
    height: 57px;
    background-color: #1a3675;
    .container {
      p {
        float: left;
        margin: 2% 0 2% 0;
        width: 100%;
        font-family: SegoeUI;
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.33;
        letter-spacing: normal;
        text-align: left;
        color: white;
      }
    }
  }
}
</style>
