<template>
  <div style="height: 100%">
    <Slider
      v-if="slides1.length>0"
      :images="slides1"
      :interval-duration="slideDuration"
      :height="'inherit'"
      :width="'inherit'"
    />
    <div class="cover">
      <div class="menuOuter">
        <div class="title">
          <div class="titleLogo">
            <img class="logoImg" src="/img/archiveLogo.png">
          </div>
          <div class="minTitle">
            Монгол улсын засгийн газрын хэрэгжүүлэгч агентлаг
          </div>
          <div class="bigtitle">
            Архивын ерөнхий газар
          </div>
          <div class="minTitle">
            Цахим хуудсанд тавтай морилно уу
          </div>
        </div>
        <ul class="menu">
          <li class="menuItem" @click="handleClickHome()">
            <div class="menuIcon">
              <i class="fa fa-home" />
            </div>
            <div class="menuText">
              Вэб сайт
            </div>
          </li>
          <li class="menuItem" v-for="value in Buttonlist" :key="value.id">
            <a :href="value.link" target="_blank" class="newButton">
              <div class="menuIcon">
                <i :class="value.icon" />
              </div>
              <div class="menuText">
                <p>{{ value.name }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div v-if="list.length>0">
        <div v-for="audio in list" :key="audio.id">
          <div v-if="audio.code === '1'">
            <div class="audioPlayer">
              <audio autoplay controls>
                <source :src="audio.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].url" type="audio/ogg" />
                <source :src="audio.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].url" type="audio/mpeg" />
              </audio>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>
<script>
import audioTypeServices from '~/services/audioTypeServices'
import webButton from '~/services/webButtonService'
import Slider from '~/components/custom/Slider.vue'
import SlideServices from '~/services/SlideServices'
import OnlineCountService from '~/services/OnlineCountService'
import SiteRequestPostService from '~/services/SiteRequestPostService'

export default {
  components: {
    Slider
  },
  data () {
    return {
      listQuery: {
        limit: 10,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {}
      },
      percent: 0,
      root: 15,
      list: [],
      Buttonlist: [],
      Buttontotal: '',
      total: '',
      AllData: [],
      slideDuration: 4000,
      slides1: [],
      baseUrl: process.env.baseUrl
    }
  },
  created () {
    this.refDatas()
    this.getData()
  },
  methods: {
    setArray (array) {
      for (const item of array) {
        this.slides1.push({ id: item.id, url: this.baseUrl + item.files[0].storageName, isShow: false })
      }
    },
    handleClickHome () {
      this.$router.push({
        path: '/home'
      })
    },
    handleClickShop (item) {
      try {
        OnlineCountService.incrementCount()
        window.open('http://43.228.129.159:8088/eorder/?src=&agency=25&solved=', '_blank')
      } catch (err) {
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      }
    },
    async refDatas () {
      const data = (await SlideServices.index()).data
      this.setArray(data)
      webButton.index(this.listQuery)
        .then((response) => {
          const buttons = response.data
          this.Buttonlist = JSON.parse(JSON.stringify(buttons.rows))
          this.Buttontotal = buttons.count
        })
        .catch((err) => {
          this.list = []
          this.total = 0
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
    },
    async getData () {
      await SiteRequestPostService.post()
      audioTypeServices.index(this.listQuery)
        .then((response) => {
          const data = response.data
          this.list = JSON.parse(JSON.stringify(data.rows))
          this.total = data.count
        })
        .catch((err) => {
          this.list = []
          this.total = 0
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

<style lang="scss">
.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
  top: 0;
  .audioPlayer {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 240px;
    audio {
      height: 25px;
      font-size: 11px !important;
      opacity: 0.5;
    }
  }
  .menuOuter {
    position: absolute;
    left: calc(50% - 350px);
    top: calc(50% - 300px);
    border-radius: 10px;
    min-width: 700px;
    width: 700px;
    min-height: 300px;
    margin: 0 auto;
    // background-color: rgba(64, 156, 243, 0.445);
    display: grid;
    .menu {
      height: 100%;
      list-style-type: none;
      padding: 20px;
      display: flex;
      justify-content: center;
      .menuItem {
        background-color: rgba(0, 0, 0, 0.5);
        float: left;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
        color: white;
        width: 180px;
        height: 150px;
        cursor: pointer;
        transition: all 200ms ease-out;
        &:hover {
          box-shadow: 0 0 8px rgb(0, 0, 0);
        }
        .menuIcon {
          padding: 5px;
          padding-bottom: 15px;
          text-align: center;
          font-size: 40px;

          border-bottom: solid 2px white;
        }
        .menuText {
          font-family: "Roboto Condensed";
          padding: 10px 0px;
          text-align: center;
          text-transform: uppercase;
        }
        .newButton {
          color: #ffffff
        }
      }
    }
    .title {
      color: white;
      text-transform: uppercase;
      font-family: "Roboto Condensed";
      text-align: center;
      margin-bottom: 30px;
      .titleLogo {
        margin-bottom: 30px;
        .logoImg {
          height: 130px;
        }
      }
      .minTitle {
        font-size: 20px;
      }
      .bigtitle {
        padding: 15px 0px;
        font-size: 60px;
        text-shadow: 0px 2px 0px #b2a98f, 0px 7px 5px rgba(0, 0, 0, 0.15),
          0px 8px 1px rgba(0, 0, 0, 0.1), 0px 12px 15px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
