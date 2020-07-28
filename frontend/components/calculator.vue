<template>
  <div class="columns" style="height:500px">
    <div class="column is-3">
      <div class="map-main-container">
        <div class="search">
          <article class="panel is-primary">
            <p class="panel-heading">
              ХАЙЛТ /Тусгай зөвшөөрөл/
            </p>
            <el-form :model="searchTemp" ref="form" label-width="120px" :label-position="'top'" style="margin-top:10px;">
              <el-form-item label="Байгууллага:" prop="">
                <el-select
                  clearable
                  size="mini"
                  filterable
                  v-model="searchTemp.organizationId"
                  value-key="_id"
                  @change="handleChangeOrganization"
                >
                  <el-option v-for="listItem in listOrganization" :key="listItem._id" :label="listItem.name" :value="listItem"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer" style="display:flex; justify-content:flex-end; margin-top:10px;">
              <el-tooltip effect="light" :content="$t('smartActionButtons.refresh')" key="refresh">
                <el-button type="warning" size="mini">Цэвэрлэх</el-button>
              </el-tooltip>
            </span>
          </article>
        </div>
      </div>
    </div>
    <div class="column is-9">
      <div id="map" ref="map" style="width:100%; height:100%;"></div>
    </div>
  </div>
</template>
<script>
import MpetroService from '@/services/MpetroService'

export default {
  name: 'Map',
  data () {
    return {
      centerLat: 46.856739169432466,
      centerLong: 103.09617393124995,
      map: null,
      // aimagCityList: [],
      searchTemp: {
        aimagCityId: null,
        soumDistrictId: null,
        organizationId: null,
        productType: '',
        checkedType: []
      },
      tempOrganization: {
        unitCount: 0
      },
      listOrganization: [],
      markers: [],
      markerClusterList: []
    }
  },
  beforeMount () {
    this.refData()
    this.getPointers()
  },
  /* eslint-disable */
  mounted() {
    this.$nextTick(async function () {
      await this.initMap()
    //   await this.initDirections()
    })
  },
  methods: {
		async changeAimagCity (aimagCityId) {
      if (!isNull(aimagCityId)) {
      }
    },
    async refData() {
      console.log('----------this.listOrganization------------')
      this.listOrganization = (await MpetroService.organizationList())
      console.log('----------this.listOrganization------------', this.listOrganization)
    },
    async initMap() {
      this.map = new google.maps.Map(this.$refs.map, {
        zoom: 5,
        center: new google.maps.LatLng(this.centerLat, this.centerLong),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        draggable: true,
        styles: [
          {
            'featureType': 'administrative',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#444444'
              }
            ]
          },
          {
            'featureType': 'landscape',
            'elementType': 'all',
            'stylers': [
              {
                'color': '#f2f2f2'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'all',
            'stylers': [
              {
                'saturation': -100
              },
              {
                'lightness': 45
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'simplified'
              }
            ]
          },
          {
            'featureType': 'road.arterial',
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'all',
            'stylers': [
              {
                'color': '#46bcec'
              },
              {
                'visibility': 'on'
              }
            ]
          }
        ]
      })
			console.log('------initMap-------', this.listOrganization)
    },
    async getPointers() {
      const data = (await MpetroService.getPoints(this.searchTemp)).data
      await this.setPointers(data)
    },
    setPointers(data) {
      var point = null
      var self = this
      var infowindow = new google.maps.InfoWindow()
      var infowindow_poly = new google.maps.InfoWindow()
      var tmpMarker = null
      var clusterMarkers = []
			console.log('------setPointers-------', data)
      for (const unit of data) {
        if (unit && unit.address) {
          // x - long
          // y - lat
          point = null
          point = new google.maps.LatLng(unit.lat, unit.long)
          tmpMarker  = new google.maps.Marker({
            position: point,
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP
          })
          // Clusters
          clusterMarkers.push(tmpMarker)
          google.maps.event.addListener(tmpMarker, 'click', function(event) {
            var content = ''
            content = 
              '<div id="iw-container">' +
                '<div class="iw-title">' + unit.organizationId.name + '</div>' + 
                '<div class="iw-title-sub">' + unit.name + '</div>' + 
                '<div class="iw-content">' + unit.address +
                '</div>' +
              '</div>'
            infowindow.setContent(content)
            infowindow.open(self.map, this)
          }.bind( tmpMarker ))
          this.markers.push({type: 'ШТС', organizationId: unit.organizationId, unitId: unit._id, marker: tmpMarker})
        }
      }
      // Clusters
      const tmpCluster = new MarkerClusterer(this.map, clusterMarkers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      })
      this.markerClusterList.push({type: 'ШТС', cluster: tmpCluster})
      this.tempOrganization.unitCount = data.length
    },
    async handleChangeOrganization() {
      const data = (await MpetroService.getPoints(this.searchTemp)).data
      await this.setPointers(data)
    },
  }
}
</script>
<style lang="scss" scoped>
.map-main-container {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  .expandButton {
    z-index: 1000;
    position: absolute;
    top: 30px;
    left: 20px;
    cursor: pointer;
    background-color: var(--bg-side-color);
  }
  .search {
    position: relative;
    width: 300px;
    height: 100%;
    // margin: var(--primary-padding);
    box-sizing: border-box;
    -webkit-transition: width 900ms ease;
    transition: width 900ms ease;
  }
  .map {
    flex: 1;
    width: 100%;
    height: 100%;
    margin: var(--primary-padding);
  }
}

</style>
