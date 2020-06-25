<template>
  <div v-if="bigBanner.id > 0" class="container">
    <div v-loading="loading" class="bigBanner">
      <div v-for="item in bigBanner.files" :key="item.id">
        <img :src="baseUrl + item.storageName" alt="" class="imageStyle">
      </div>
      <div class="bannerInner">
        <div class="bannerText">
          <a :href="bigBanner.link" target="_blank"><H3 style="color:white; text-transform:uppercase; font-size:26px; font-weight:bold;">{{ $i18n.locale == 'mn' ? bigBanner.name : 'Capital city archives' }}</H3></a>
        </div>
      </div>
      <div class="layer" />
    </div>
  </div>
  <div v-else>
  </div>
</template>
<script>
import BannerServices from '~/services/BannerServices'
export default {
  components: {
  },
  data () {
    return {
      baseUrl: process.env.baseUrl,
      loading: false,
      bigBanner: {},
      listQuery: {
        limit: 10,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'descending'
        },
        search: {
          bannerTypeId: 2
        }
      }
    }
  },
  created () {
    this.getBigBanner()
  },
  methods: {
    getBigBanner () {
      this.loading = true
      BannerServices.index(this.listQuery)
        .then((response) => {
          if (response.data.rows[0]) {
            this.bigBanner = JSON.parse(JSON.stringify(response.data.rows[0]))
          }
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
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
.container {
  .bigBanner {
    height: 162px;
    width: 100%;
    .bannerInner {
			position: relative;
			margin: -144px 20px 20px 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      border: solid 1px white;
      border-radius: 10px;
      z-index: 91;
      .bannerText {
        height: 100%;
        padding-top: 2.5%;
        text-align: center;
      }
    }
		.layer {
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 0;
		}
		.imageStyle {
			width:100%;
			height:162px;
			border-radius:5px;
			z-index: 0
		}
  }
}
</style>
