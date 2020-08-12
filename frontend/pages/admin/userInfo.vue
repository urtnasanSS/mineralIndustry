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
              <!-- <input v-if="placeholder===null">
              <a class="header"> Овог нэр </a>
              </input>
              <input v-else>
              <a class="header"> {{ list.surName }} </a>
              </input> -->
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
            <span style="display: inline-flex">
              <span class="icon is-small">
                <i class="fas fa-user " style="color: #838383; ">
                  <!-- <i class="fas fa-correct fa-stack-0.5x"></i> -->
                </i>
              </span>
              <div v-if="list.role == 1">
                <a class="header">Системийн админ</a>
              </div>
              <div v-if="list.role == 2">
                <p class="header">Мэдээний админ</p>
              </div>
              <div v-if="list.role == 3">
                <p class="header  ">Харах эрхтэй</p>
              </div>
            </span>
          </div>
        </div>
        <div>
          <button class="button is-link is-rounded" style="margin-top: 40px;margin-left: auto;display: block;margin-right: auto;">Хувийн мэдээлэл засах   </button>
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
    height: 45%;
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
          height: 60px;
        }
      }
      .info {
        padding: 10px 10%;
        .line {
          border-bottom: solid 1px black;
          .header {
            color: #838383;
            text-align: center;
            margin-left: 20px;
          }
          .value {
            padding-left: 5%;
          }
        }
      }
      .btn{
        margin-left: auto;

        margin-top: 40px;
        margin-bottom: auto;
        display: block;
      }
    }
  }
}
</style>
