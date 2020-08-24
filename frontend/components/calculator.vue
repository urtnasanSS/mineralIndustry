<template>
  <div class="mapsComponents">
    <div class="columns">
      <div class="column is-3 searchType">
        <div class="map-main-container">
          <div class="search">
            <div class="container">
              <div class="Searchtitle">
                <p>ХАЙЛТ /байршил КМ/</p>
              </div>
              <el-form
                :rules="distanceFromRules"
                ref="formDistance"
                :model="distanceForm"
                label-position="top"
                label-width="150px"
                class="rangeInput"
              >
                <el-form-item prop="fromModel">
                  <div class="columns">
                    <div class="column is-10">
                      <input
                        v-model="distanceForm.fromModel"
                        id="from-input"
                        class="controls"
                        type="text"
                        placeholder="Эхлэх цэг"
                        style="z-index:9999;"
                      >
                    </div>
                    <div class="column is-2">
                      <i class="el-icon-location" style="color: red; font-size: 20px"></i>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item prop="toModel">
                  <div class="columns">
                    <div class="column is-10">
                      <input
                        v-model="distanceForm.toModel"
                        id="to-input"
                        class="controls"
                        type="text"
                        placeholder="Дуусах цэг"
                        style="z-index:9999;"
                      >
                    </div>
                    <div class="column is-2">
                      <i class="el-icon-location" style="color: #0054fd; font-size: 20px"></i>
                    </div>
                  </div>
                </el-form-item>
                <div>
                  <span slot="footer" class="searchButtons">
                    <el-tooltip class="location" effect="light" :content="'Км-ын байршил тавих'" key="search-place">
                      <el-button type="info" size="mini" icon="el-icon-place" circle @click="handleSetDistancePoint"></el-button>
                    </el-tooltip>
                    <el-button class="search" type="primary" size="mini" @click="handleSearchDistance">Хайх</el-button>
                    <el-button class="clear" type="warning" size="mini" @click="handleRefreshDistance">Цэвэрлэх</el-button>
                  </span>
                </div>
              </el-form>
              <fieldset class="fieldset">
                <legend>
                  <p style="font-size: 14px; margin-left: 10px font-weight: bold">Тооцоолуур:</p>
                </legend>
                <div style="text-align: center; margin-bottom: 5%; font-size: 12px">
                  Урт/км: <input class="textAuto" type="text" readonly v-model="distanceForm.distance" style="font-weight:bold; text-align:center; margin:2%; border: 1px solid #B2B0B0;">
                </div>
              </fieldset>
            </div>
            <article class="panel is-primary">
              <p style="margin-top: 10%; border-bottom: solid 1px #B2B0B0; font-weight: bold">
                ХАЙЛТ /Тусгай зөвшөөрөл/
              </p>
              <el-form :model="searchTemp" ref="form" label-width="120px" :label-position="'top'" style="margin-top:5px; font-weight: bold">
                <el-form-item label="Байгууллага:" prop="">
                  <el-select
                    clearable
                    size="mini"
                    filterable
                    v-model="searchTemp.organizationId"
                    value-key="_id"
                    @change="handleChangeOrganization"
                    style="width: 100%"
                  >
                    <el-option v-for="listItem in listOrganization" :key="listItem._id" :label="listItem.name" :value="listItem">{{ listItem.name }}</el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </article>
            <div style="margin-top:5px; font-weight: bold">
              <legend>Шатахууны төрөл:</legend>
              <el-checkbox-group v-model="searchTemp.checkedType" @change="handleChangeRadioProductType" class="fuel">
                <div class="columns">
                  <div class="column is-6">
                    <el-checkbox label="A80"></el-checkbox>
                    <el-checkbox label="AI92"></el-checkbox>
                    <el-checkbox label="AI95"></el-checkbox>
                  </div>
                  <div class="column is-6">
                    <el-checkbox label="AI98"></el-checkbox>
                    <el-checkbox style="margin-right: 30px;" label="DT"></el-checkbox>
                  </div>
                </div>
              </el-checkbox-group>
            </div>
            <span slot="footer" style="display:flex; justify-content:flex-end; margin-top:10px;">
              <el-tooltip effect="light" key="refresh">
                <!-- <el-tooltip effect="light" :content="$t('smartActionButtons.refresh')" key="refresh"> -->
                <el-button type="warning" size="mini" @click="handleRefresh">Цэвэрлэх</el-button>
              </el-tooltip>
            </span>
          </div>
        </div>
      </div>
      <div class="column is-9 searchMap">
        <div class="map" ref="map" style="width:100%; height:100%;"></div>
      </div>
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
      distanceForm: {
        fromModel: '',
        toModel: '',
        fromPosition: { lat: 0, lng: 0 },
        toPosition: { lat: 0, lng: 0 },
        distance: 0 // km
      },
      layers: [],
      distanceFromRules: {
        fromModel: [
          { required: true, message: 'утга шаардана', trigger: 'blur' }
        ],
        toModel: [
          { required: true, message: 'утга шаардана', trigger: 'blur' }
        ]
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
      await this.initDirections()
    })
  },
  methods: {
		async changeAimagCity (aimagCityId) {
      if (!isNull(aimagCityId)) {
      }
    },
    async refData() {
      this.listOrganization = (await MpetroService.organizationList()).data
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
      for (const unit of data) {
        if (unit && unit.address) {
          let icon_path = require(`../static/img/charging-station-30.png`)
          if ((unit.organizationId.image !== null)) {
            switch(unit.organizationId.image) {
              case '5b2e18789995ff5880c5cd79':
              case '5de8c2ae0081a351dc0cf227': {
                // icon_path = require(`../../assets/org_icons/` + unit.organizationId.image + `.jpg`)
                break
              }
              case '5de9bab31842af31702e267b':
              case '5de9bc0a2f6ca425e0ce39a2':
              case '5de9d7ef83411027e0db06f0':
              case '5de9d98b83411027e0db06f4': {
                // icon_path = require(`../../assets/org_icons/` + unit.organizationId.image + `.png`)
                break
              }
              default:
                break
            }
          }
          // x - long
          // y - lat
          point = null
          point = new google.maps.LatLng(unit.lat, unit.long)
          tmpMarker  = new google.maps.Marker({
            icon: {
              url: icon_path,
              scaledSize: new google.maps.Size(20, 18),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 32)
            },
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
      this.resetDistanceForm()
      this.clearMarkersAll()
      this.removeMarkerClusterAll()
      await this.setPointers(data)
    },
    resetDistanceForm() {
      this.distanceForm = {
        fromModel: '',
        toModel: '',
        fromPosition: { lat: 0, lng: 0 },
        toPosition: { lat: 0, lng: 0 },
        distance: 0 // km
      }
      this.isDistanceSearch = false
    },
    clearMarkersAll() {
      for (var i = 0; i < this.markers.length; i++ ) {
        this.markers[i].marker.setMap(null)
      }
      this.markers = []
    },
    removeMarkerClusterAll() {
      for (var i = 0; i < this.markerClusterList.length; i++ ) {
        this.markerClusterList[i].cluster.clearMarkers()
      }
      this.markerClusterList = []
    },
    clearMarkers() {
      for (var i = 0; i < this.markers.length; i++ ) {
        this.markers[i].setMap(null)
      }
      this.markers = []
    },
    clearMarkers(type, idName, idValue) {
      for (var i = 0; i < this.markers.length; i++ ) {
        if (this.markers[i].type === type && this.markers[i][idName] === idValue) {
          this.markers[i].marker.setMap(null)
          this.markers.splice(i, 1)
          i--
        }
      }
    },
    async handleRefresh() {
      this.resetAll()
      // const data = (await MapService.getPoints()).data
      // await this.setPointers(data)
      this.setLayer()
    },
    resetAll() {
      this.resetSearchTemp()
      this.clearMarkersAll()
      this.removeMarkerClusterAll()
      this.resetDistanceForm()
      this.clearDirection()
      this.removeOverlayAll()
      // Аймаг Diaolog хаах
      this.handleCloseDialog()
    },
    handleSetDistancePoint () {
      this.distanceForm.fromModel = 'Улаанбаатар, Монгол Улс'
      this.distanceForm.fromPosition = new google.maps.LatLng(47.88639879999999, 106.9057439)
      this.distanceForm.toModel = 'Арвайхээр, Монгол Улс'
      this.distanceForm.toPosition = new google.maps.LatLng(46.272878, 102.7790303)
      this.isDistanceSearch = true
      this.resetMarkerCluster()
      this.searchDistance()
    },
    resetMarkerCluster() {
      this.clearMarkersAll()
      this.removeMarkerClusterAll()
      this.resetSearchTemp()
    },
    resetSearchTemp() {
      this.searchTemp = {
        aimagCityId: null,
        soumDistrictId: null,
        organizationId: null,
        productType: '',
        checkedType: []
      }
    },
    searchDistance () {
      // const computeDistanceBetween = google.maps.geometry.spherical.computeDistanceBetween
      // this.distanceForm.distance = (computeDistanceBetween(this.distanceForm.fromPosition, this.distanceForm.toPosition)/1000).toFixed(2)
      const self = this
      var directionsService = new google.maps.DirectionsService
      directionsService.route({
        origin: this.distanceForm.fromPosition,
        destination: this.distanceForm.toPosition,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, async function(response, status) {
        if (status === 'OK') {
          await self.setDirection(response)
        } else {
          window.alert('Google Maps DirectionsService request failed due to ' + status)
        }
      })
      var service = new google.maps.DistanceMatrixService()
      service.getDistanceMatrix({
        origins: [this.distanceForm.fromPosition, this.distanceForm.fromModel],
        destinations: [this.distanceForm.toPosition, this.distanceForm.toModel],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      }, async function(response, status) {
        if (status === 'OK') {
          if (response && response.rows.length > 0) {
            if (response.rows[0].elements.length > 0) {
              self.distanceForm.distance = response.rows[0].elements[0].distance.text
            }
          }
        } else {
          window.alert('Google Maps DistanceMatrixService request failed due to ' + status)
        }
      })
    },
    handleSearchDistance() {
      this.$refs.formDistance.validate((valid, fields) => {
        if (valid) {
          this.isDistanceSearch = true
          this.resetMarkerCluster()
          this.searchDistance()
        }
      })
    },
    handleRefreshDistance() {
      this.resetAll()
    },
    async actionsMap(inputType) {
      var self = this
      let input
      if (inputType === 'from') {
        input = document.getElementById('from-input')
      } else if (inputType === 'to') {
        input = document.getElementById('to-input')
      }
      var searchBox = new google.maps.places.SearchBox(input)
      google.maps.event.addListener(searchBox, 'places_changed', function() {
        searchBox.set('map', null)
        var places = searchBox.getPlaces()
        var i, place
        for (i = 0; place = places[i]; i++) {
          (function(place) {
            self.updateLatLong(inputType, place, place.geometry.location.lat(), place.geometry.location.lng())
          }(place))
        }
        searchBox.set('map', self.map)
      })
    },
    async initDirections() {
      await this.actionsMap('from')
      await this.actionsMap('to')
    },
    updateLatLong(inputType, place, lat, lng) {
      this.clearMarkersAll()
      this.removeMarkerClusterAll()
      if (inputType === 'from') {
        this.distanceForm.fromModel = place.formatted_address
        this.distanceForm.fromPosition = new google.maps.LatLng(lat, lng) // { lat, lng }
      } else if (inputType === 'to') {
        this.distanceForm.toModel = place.formatted_address
        this.distanceForm.toPosition = new google.maps.LatLng(lat, lng) // { lat, lng }
      }
    },
    async setDirection(response) {
      const routes = response.routes
      const directionsDisplays = []
      await this.clearDirection()
      for (var i = 0; i < routes.length; i++) {
        this.directionsRenderer = new google.maps.DirectionsRenderer({
          map: this.map,
          directions: response,
          routeIndex: i,
          draggable : true
        })
        directionsDisplays.push(this.directionsRenderer)

        // Listen for the directions_changed event for each route
        const self = this
        google.maps.event.addListener(this.directionsRenderer, 'directions_changed', (function(directionsDisplay, i) {
          return function() {
            const directions = directionsDisplay.getDirections()
            const new_start = directions.routes[0].legs[0].start_location
            const new_end = directions.routes[0].legs[0].end_location
            if ((new_start.toString() !== self.distanceForm.fromPosition.toString()) || (new_end.toString() !== self.distanceForm.toPosition.toString())) {
              // Remove every route from map
              for (var j = 0; j < directionsDisplays.length; j++) {
                directionsDisplays[j].setMap(null)
              }
              // Redraw routes with new start/end coordinates
              self.distanceForm.fromModel = directions.routes[0].legs[0].start_address
              self.distanceForm.fromPosition = new_start
              self.distanceForm.toModel = directions.routes[0].legs[0].end_address
              self.distanceForm.toPosition = new_end
              self.searchDistance()
            }
          }
        })(this.directionsRenderer, i)) // End listener
      }
    },
    clearDirection() {
      if (this.directionsRenderer) {
        this.directionsRenderer.setMap(null)
        this.directionsRenderer = null
      }
    },
    removeOverlayAll() {
      for (var i = 0; i < this.layers.length; i++ ) {
        this.layers[i].layer.setMap(null)
      }
      this.layers = []
    },
    handleCloseDialog() {
      this.dialogVisibleAimag = false
      this.removeOverlayAll()
      this.resetMap()
      this.setLayer()
    },
    resetMap() {
      this.map.setZoom(5)
      this.map.setCenter(new google.maps.LatLng(this.centerLat, this.centerLong))
    },
    async setLayer() {
      this.kmzPath = 'https://backend-erp.ulaanbaatar.mn:443/kmz/Aimag_bnd.kmz'
      // this.kmzPath = 'https://file.io/jUaVokQU' // aimag
      // await this.addOverlayAimag()
      this.checkAimagLayer = true
    },
    /** Аймгийн kmz харуулна */
    addOverlayAimag(name = 'aimag') {
      // KMZ file
      this.kmzLayer = new google.maps.KmlLayer(this.kmzPath, { suppressInfoWindows: true, map: this.map, preserveViewport: true })
      var self = this
      this.layers.push({name: name, layer: this.kmzLayer})
      google.maps.event.addListener(this.kmzLayer, 'click', async function(event) { // Аймаг дээр дарах үйлдэл
        await self.removeOverlayAll()
        await self.clickOnOverlay(name, event.featureData.name, event.featureData.description.slice(-4).trim(), event.latLng)
      })
    },
    async clickOnOverlay(aimagOrsoum, name, aimagCode, latlong) {
      if (aimagOrsoum === 'aimag') {
        console.log('----clickOnOverlay---Аймаг---', aimagOrsoum, name, aimagCode, latlong)

        await this.addOverlaySoum('https://backend-erp.ulaanbaatar.mn:443/kmz/' + aimagCode + '.kmz')

        this.isDialogAimag = true
        this.checkAimagLayer = false
        this.map.setCenter(latlong)
        this.map.setZoom(7)
        // // Data дуудалт
        this.dialogName = name.includes('Улаанбаатар') ? name : name + ' аймаг'
        // this.dialogData = (await MapService.aimag(aimagCode)).data
        // console.log('--aimag--dialogData------', this.dialogData)
        this.dialogVisibleAimag = true
      } else if (aimagOrsoum === 'soum') {
      }
    },
    async handleChangeRadioProductType() {
      const data = (await MpetroService.getPoints(this.searchTemp)).data
      this.resetDistanceForm()
      this.clearMarkersAll()
      this.removeMarkerClusterAll()
      await this.setPointers(data)
    },
  }
}
</script>
<style lang="scss" scoped>
.mapsComponents {
  padding: 0.75rem;
  .columns {
    .searchType {
      border-radius: 15px;
      border: 1px solid #d9e2ec;
      box-shadow: -2px -2px 21px -3px #bcccdc;
      padding: 0.75rem;
      @media screen and (max-width: 850px) {
        display: none;
      }
      .map-main-container {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        border: solid 1px #B2B0B0;
        border-radius: 12px;;
        .search {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 5%;
          // margin: var(--primary-padding);
          box-sizing: border-box;
          -webkit-transition: width 900ms ease;
          transition: width 900ms ease;
          .container {
            .Searchtitle {
              border-bottom: 1px solid #B2B0B0;;
              margin:1% 1% 1% 0;
              p {
                font-size: 15px;
                line-height: var(--text-default-line-height);
                color: var(--black);
                font-weight: bold;
              }
            }
            .rangeInput {
              padding: 10px;
              display: block;
              .controls {
                -webkit-appearance: none;
                background-color: var(--bg-content-color);
                background-image: none;
                border-radius: 5px;
                border: 1px solid #B2B0B0;
                box-sizing: border-box;
                color: var(--text-primary-color);
                display: inline-block;
                font-size: inherit;
                height: 28px;
                line-height: 40px;
                outline: 0;
                padding: 0 15px;
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                width: 100%;
                margin-left: -10px;
              }
              .searchButtons {
                display: flex;
                justify-content: flex-end;
                flex-direction: row;
                float: right;
                .search {
                  @media screen and (max-width: 999px) {
                    padding: 5% 0;
                  }
                }
                .clear {
                  @media screen and (max-width: 999px) {
                    padding: 5% 15px;
                  }
                  @media screen and (max-width: 935px) {
                    padding: 5% 10px;
                  }
                  @media screen and (max-width: 873px) {
                    padding: 5% 5px;
                  }
                  @media screen and (max-width: 828px) {
                    padding: 5% 0px;
                  }
                }
              }
            }
            .fieldset {
              width: 100%;
              margin-top:10px;
              border: solid 1px #B2B0B0;
              border-radius: 5px;
              .textAuto {
                @media screen and (max-width: 915px) {
                  width: 100%;
                  margin: 0;
                }
              }
            }
          }
          .fuel {
            display: flex;
            border: solid 1px #B2B0B0;
            border-radius: 5px;
            padding: 2%;
            .columns {
              .column {
                @media screen and (max-width: 836px) {
                  width: 41.66667%;
                }
              }
            }
          }
        }
      }
    }
    .searchMap {
      height: 570px;
      @media screen and (max-width: 850px) {
        width: 100%;
      }
      .map {
        flex: 1;
        width: 100%;
        height: 100%;
        margin: var(--primary-padding);
      }
    }
  }
}
</style>
