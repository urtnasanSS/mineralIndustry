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
            <i class="el-icon-user" style="color: #1a3675;">
              <a class="header"> {{ list.surName }} </a>
            </i>
          </div>
          <div class="line">
            <i class="el-icon-more-outline" style="color: #1a3675;">
              <a class="header"> {{ list.userName }} </a>
            </i>
          </div>
          <div class="line">
            <i class="el-icon-phone" style="margin: left;">
              <a class="header"> {{ list.phoneNumber }} </a>
            </i>
          </div>
          <div class="line">
            <i class="el-icon-phone" style="margin: left;">
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
            </i>
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
  background-image: url('../../../clean_HTML/img/fff.jpg');
  height: 100%;
  .hero-body {
    width: 25%;
    height: 55%;
    background: white;
    display: block;
    margin-left: auto;
    margin-right: auto;
    flex-grow: 0;
    margin-top: auto;
    margin-bottom: auto;
    .container {
      .center {
        text-align: center;
        img {
          border-radius: 50%;
          height: 70px;
        }
      }
      .info {
        padding: 10px 10%;
        .line {
          width: 100%;
          border-bottom: solid 1px black;
          .header {
            color: #838383;
            text-align: center;
            width: 100%;
            margin-left: 20px;
          }
          .value {
            padding-left: 5%;
          }
        }
      }
    }
  }
}
</style>
