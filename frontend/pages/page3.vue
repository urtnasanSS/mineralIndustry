<template>
  <div>
    <HeaderWithNavbar />
    <div id="content_area" class="center">
      <div id="left_content" style="width: 40%; margin: 5% 0% 5% 0%; float: left;">
        <p class="title">Холбоо барих</p>
        <a> Сэтгэгдэл бичих
        </a><br>
        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="" rows="7"></textarea>
          </div>
        </div>
        <a>Утасны дугаар</a>
        <input class="input" type="tel" placeholder="">
        <a>Цахим хаяг</a>
        <input class="input" type="email" placeholder="">
        <div class="buttons">
          <button class="button">Илгээх</button>
        </div>
      </div>
      <div id="right_content" style="width: 22%; float: left; margin: 10% 0% 10% 5%">
        <p>{{ value.name }}</p>
        <p>Утас: {{ value.phone }}</p>
        <p>Факс: {{ value.Fax }}</p>
        <p>Цахим шуудан: {{ value.Email }}</p>
        <div style="margin-top: 30px">
          <p>
            {{ value.uPosition }} {{ value.uName }}
            Утас: {{ value.uPhone }}, өрөөний
            дугаар {{ value.uWork }}
          </p>
        </div>
      </div>
    </div>
    <foother />
  </div>
</template>

<script>
import HeaderWithNavbar from '~/components/HeaderWithNavbar.vue'
import foother from '~/components/foother.vue'
import AddressServices from '@/services/AddressServices.js'

export default {
  components: {
    HeaderWithNavbar,
    foother
  },

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
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  display:block;
  margin-left:10%;
  margin-right:10%;
  padding:0%;
  a {
    width: 117px;
    opacity: 0.49;
    font-family: SegoeUI;
    font-size: 15px;
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
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  .title {
    width: 159px;
    height: 31px;
    margin-bottom: 7px;
    font-family: SegoeUI;
    font-size: 23px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.35;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
  }
  .textarea {
    margin: 5px 0 2px 0;
  }
  .input {
    margin: 5px 0 2px 0;
  }
  .buttons {
    .button {
      margin: 10px 0 0 0;
      width: 168px;
      height: 38px;
      border-radius: 9px;
      background-color: #1a3675;
      color: white;
    }
  }
}
.logo_mmhi {
width: 263px;
height: 82px;
object-fit: contain;
}

.text {
width: 1293px;
height: 665px;
font-family: SegoeUI;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: italic;
line-height: 1.36;
letter-spacing: normal;
text-align: left;
color: #000000;
}
.title {
  font-weight: bold;
  font-style: normal;
}
</style>
