<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="center">
          <img src="/img/profile.png">
          <p class="title is-3 is-spaced" style="padding: 1%">{{ list.givenName }}</p>
        </div>
        <div class="info">
          <div class="line">
            <p class="header">Овог:</p>
            <p class="value">{{ list.surName }}</p>
          </div>
          <div class="line">
            <p class="header">Нэвтрэх нэр:</p>
            <p class="value">{{ list.userName }}</p>
          </div>
          <div class="line">
            <p class="header" style="float:left">Утас:</p>
            <p class="value">{{ list.phoneNumber }}</p>
          </div>
          <div class="line">
            <p class="header">Хандах эрх:</p>
            <div v-if="list.role == 1">
              <p class="value">Системийн админ</p>
            </div>
            <div v-if="list.role == 2">
              <p class="value">Мэдээний админ</p>
            </div>
            <div v-if="list.role == 3">
              <p class="value">Харах эрхтэй</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  layout: 'adminLayout',
  data () {
    return {
      list: []
    }
  },
  watch: {},
  created () {
    this.list = JSON.parse(JSON.stringify(this.$store.getters.userKey))
  },
  methods: {
    moment
  }
}
</script>
<style lang="scss" scoped>
.hero {
  .hero-body {
    height: calc(100% - 50px);
    background: #fff;
    .container {
      .center {
        text-align: center;
        img {
          border-radius: 50%;
          height: 70px;
        }
        .title {
          border-bottom: 1px solid black;
        }
      }
      .info {
        padding: 10px 10%;
        .line {
          width: 50%;
          padding: 0 10%;
          float: left;
          .header {
            font-weight: bold;
            font-size: 20px;
            padding: 1%;
            float: left;
            width: 100%;
          }
          .value {
            float: left;
            padding-left: 5%;
          }
        }
      }
    }
  }
}
</style>
