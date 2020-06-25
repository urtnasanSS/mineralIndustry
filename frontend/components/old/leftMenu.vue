<template>
  <div class="sticky-container">
    <div class="audioPlayerHome">
      <div v-for="audiovalue in list" :key="audiovalue.id">
        <div v-if="audiovalue.code === '2'">
          <audio autoplay controls>
            <source :src="audiovalue.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].url" type="audio/ogg" />
            <source :src="audiovalue.files.filter(c=> c.isDelete === false && c.fileType.includes('audio'))[0].url" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
    <ul class="sticky">
      <button id="audioButton" @click="audio()">
        <div v-if="iconBunner === true">
          <i class="fas fa-volume-mute"></i>
        </div>
        <div v-else>
          <i class="fas fa-volume-up"></i>
        </div>
      </button>
      <a target="new_tab">
        <li class="searchInput">
          <input v-model="searchValue" type="text" placeholder="Хайх..." class="searchWords" @keyup.enter="handleClickMore(searchValue)">
          <div class="img" :style="`background-color: #3273dc`" @click="handleClickMore(searchValue)">
            <i class="fa fa-search" :style="`color: white`" />
          </div>
        </li>
      </a>
      <a v-for="item in listLeftMenu" :key="item.id" :href="item.link" target="new_tab">
        <li>
          <p :style="`color: ${getColor(item)}`">{{ item.name }}</p>
          <div class="img" :style="`background-color: ${getColor(item)}`">
            <i :class="getIcon(item)" :style="`color: white`" />
          </div>
        </li>
      </a>
    </ul>
  </div>
</template>
<script>
import audioTypeServices from '~/services/audioTypeServices'
import MenuServices from '~/services/MenuServices'
export default {
  data () {
    return {
      listLeftMenu: [],
      searchData: [],
      iconBunner: '',
      status: 'show',
      searchValue: '',
      listQueryMenu: {
        limit: 5,
        currentPage: 1,
        sort: {
          prop: 'sortOrder',
          order: 'ascending'
        },
        search: {
          menuTypeId: 5
        }
      },
      list: [],
      listQuery: {
        limit: 10,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {}
      },
      listqQuery: {
        sort: {
          prop: 'sortOrder',
          order: 'ascending'
        },
        search: {
          menuTypeId: 5
        }
      },
      icon: [
        { name: 'Facebook', icon: 'fab fa-facebook-f' },
        { name: 'Youtube', icon: 'fab fa-youtube' },
        { name: 'Email', icon: 'fa fa-envelope' },
        { name: 'Fax', icon: 'fa fa-fax' },
        { name: 'Instagram', icon: 'fab fa-instagram' },
        { name: 'Twitter', icon: 'fa fa-twitter' }
      ]
    }
  },
  created () {
    this.getData()
    this.refData()
  },
  methods: {
    getData () {
      MenuServices.index(this.listQueryMenu).then((response) => {
        const data = response.data
        if (data.rows.length > 0) {
          this.listLeftMenu = JSON.parse(JSON.stringify(data.rows))
        }
        this.totalMenu = data.count
      }).catch((err) => {
        err.response && err.response.data ? this.$message({ type: 'warning', message: err.response.data.error }) : this.$message({ type: 'error', message: err })
      })
    },
    refData () {
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
    },
    click (item) {
      window.open(item.link, '_blank')
    },
    audio () {
      const audio = document.querySelector('audio')
      if (this.iconBunner === true) {
        this.iconBunner = false
      } else {
        this.iconBunner = true
      }
      if (audio !== null) {
        if (audio.paused) {
          audio.volume = 0.2
          audio.play()
        } else {
          audio.pause()
        }
      }
    },
    HideAndShow () {
      this.status = 'false'
    },
    handleClickMore (item) {
      this.status = 'show'
      if (item) {
        this.temp = Object.assign({}, item)
        this.$router.push({ path: '/SearchList', query: { item } })
      }
    },
    getIcon (item) {
      if (item.name !== undefined && item.name !== null) {
        switch (item.name) {
          case 'Facebook': return 'fab fa-facebook-f'
          case 'Youtube': return 'fab fa-youtube'
          case 'Email': return 'fa fa-envelope'
          case 'Fax': return 'fa fa-fax'
          case 'Instagram': return 'fab fa-instagram'
          case 'Twitter': return 'fa fa-twitter'
          default: return 'fab fa-plus'
        }
      }
    },
    getColor (item) {
      if (item.name !== undefined && item.name !== null) {
        switch (item.name) {
          case 'Facebook': return '#3b5998'
          case 'Youtube': return '#de0000'
          case 'Email': return '#b3d062'
          case 'Fax': return '#77BEBA'
          case 'Instagram': return '#515BD4'
          case 'Twitter': return '#77BEBA'
          default: return '#fff'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sticky-container{
  padding: 0px;
  margin: 0px;
  position: fixed;
  left: -124px;
  top:28.7%;
  width: 160px;
  z-index: 100;
}
.sticky .searchInput{
  input{
    width: 50px !important;
    text-align: right;
    flex: 1;
    padding: 0px;
    padding-right: 10px;
    margin: 0px;
    text-transform: uppercase;
    line-height: 33px;
  }
}
.sticky li{
  display: flex;
  flex-direction: row;
  list-style-type: none;
  background-color: rgba(240, 240, 240, 0.932);
  color: #efefef;
  height: 35px;
  padding: 0px;
  margin: 0px 0px 0px 0px;
  -webkit-transition:all 0.25s ease-in-out;
  -moz-transition:all 0.25s ease-in-out;
  -o-transition:all 0.25s ease-in-out;
  transition:all 0.25s ease-in-out;
  cursor: pointer;
  // filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
  // filter: rgb(59, 139, 235);
  // -webkit-filter: grayscale(100%);
}
.sticky li:hover{
  margin-right: -115px;
  // filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0\'/></filter></svg>#grayscale");
  // -webkit-filter: grayscale(0%);
}

#audioButton {
  font-size: 16px;
  z-index: 100;
  color: #fff;
  width: 45px;
  margin-left: 115px;
  top: 29.5%;
  height: 35px;
  border: none;
  border-radius: 2px;
  outline: none;
  background: #EE7054;
  cursor: pointer;
  transition: all 0.4s ease-out;
  .fas {
    margin-left: 15px;
  }
}
button.fade:hover {
  opacity: 0.8;
}
.sticky li .img{
  flex: 36px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sticky li p{
  text-align: right;
  flex: 1;
  padding: 0px;
  padding-right: 10px;
  margin: 0px;
  text-transform: uppercase;
  line-height: 33px;
}
.audioPlayerHome {
  visibility: hidden;
  top: 0px;
  left: 0px;
  width: 0px;
  audio {
    height: 1px;
    opacity: 0.5;
  }
}
</style>
