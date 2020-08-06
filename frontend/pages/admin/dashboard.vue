<template>
  <div style="height: 100%; width: 100%; overflow-y:auto ">
    <div class="columns is-gapless is-marginless is-paddingless">
      <div class="column is-8">
        <div class="itemBackground">
          <h2>Цэсний мэдээлэл</h2>
          <div
            id="chartdiv"
            ref="chartdivline"
            style="width: 100%; height: 400px;"
          />
        </div>
      </div>
      <div class="column is-4">
        <div class="itemBackground">
          <h2>Категорийн төрөл</h2>
          <!-- <p>{{ value }}</p> -->
          <div
            id="chartdiv"
            ref="chartdivpie"
            style="width: 100%; height: 400px;"
          />
        </div>
      </div>
    </div>
    <div class="columns is-gapless is-marginless is-paddingless">
      <div class="column is-12">
        <div class="itemBackground">
          <!-- <h2>Онлайн захиалга</h2> -->
          <div
            id="chartdiv"
            ref="chartdivline2"
            style="width: 100%; height: 400px;"
          />
        </div>
      </div>
    </div>
    <div class="foother_space" />
  </div>
</template>

<script>
import moment from 'moment'
import MenuCountService from '../../services/MenuCountService'
import OnlineCountService from '../../services/OnlineCountService'
import CategoryCountService from '../../services/CategoryCountService'
export default {
  layout: 'adminLayout',
  components: {},
  data () {
    return {
      list: [],
      value: [],
      test: [],
      secondChart: [],
      ButtonValues: [],
      listQuery: {
        limit: 14,
        currentPage: 1,
        sort: {
          prop: 'createdAt',
          order: 'DESC'
        }
      }
    }
  },
  mounted () {
    const {
      am4core,
      am4charts,
      am4themes_animated,
      am4themes_dark
    } = this.$am4core()
    this.getChartLine(am4core, am4charts, am4themes_animated, am4themes_dark)
    this.getChartPie(am4core, am4charts, am4themes_animated, am4themes_dark)
    this.getChartLine2(am4core, am4charts, am4themes_animated, am4themes_dark)
  },
  methods: {
    getChartLine (am4core, am4charts, am4themes_animated, am4themes_dark) {
      // // Themes begin
      am4core.useTheme(am4themes_animated)
      // // Themes end
      // // Create chart instance
      const chart = am4core.create(this.$refs.chartdivline, am4charts.XYChart)
      // Add data
      MenuCountService.index()
        .then((response) => {
          const data = response.data
          this.value = JSON.parse(JSON.stringify(data))
          this.test = [
            {
              country: 'Мэдээ',
              visits: 3025
            },
            {
              country: 'Категори',
              visits: 1882
            },
            {
              country: 'Хаягын дэлгэрэнгүй',
              visits: 1114
            },
            {
              country: 'Цэс',
              visits: 984
            },
            {
              country: 'Сэтгэгдэл',
              visits: 580
            }
          ]
          for (let i = 0; i < 5; i++) {
            this.test[i].visits = this.value[0][i]
          }
          chart.data = this.test
        })
        .catch((err) => {
          this.list = []
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'country'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 30
      categoryAxis.renderer.labels.template.horizontalCenter = 'right'
      categoryAxis.renderer.labels.template.verticalCenter = 'middle'
      categoryAxis.renderer.labels.template.rotation = 330
      categoryAxis.tooltip.disabled = true
      categoryAxis.renderer.minHeight = 110
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.renderer.minWidth = 50
      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries())
      series.sequencedInterpolation = true
      series.dataFields.valueY = 'visits'
      series.dataFields.categoryX = 'country'
      series.tooltipText = '[{categoryX}: bold]{valueY}[/]'
      series.columns.template.strokeWidth = 0
      series.tooltip.pointerOrientation = 'vertical'
      series.columns.template.column.cornerRadiusTopLeft = 10
      series.columns.template.column.cornerRadiusTopRight = 10
      series.columns.template.column.fillOpacity = 0.8
      // Cursor
      chart.cursor = new am4charts.XYCursor()
    },
    getChartPie (am4core, am4charts, am4themes_animated, am4themes_dark) {
      // Themes begin
      am4core.useTheme(am4themes_animated)
      const chart = am4core.create(this.$refs.chartdivpie, am4charts.PieChart)
      const pieSeries = chart.series.push(new am4charts.PieSeries())
      pieSeries.dataFields.value = 'litres'
      pieSeries.dataFields.category = 'country'
      pieSeries.slices.template.stroke = am4core.color('#fff')
      pieSeries.slices.template.strokeWidth = 5
      pieSeries.slices.template.strokeOpacity = 3
      // Let's cut a hole in our Pie chart the size of 30% the radius
      chart.innerRadius = am4core.percent(30)
      // change the cursor on hover to make it apparent the object can be interacted with
      pieSeries.slices.template.cursorOverStyle = [
        {
          property: 'cursor',
          value: 'pointer'
        }
      ]
      pieSeries.labels.template.radius = 5
      const shadow = pieSeries.slices.template.filters.push(
        new am4core.DropShadowFilter()
      )
      shadow.opacity = 0
      const hoverState = pieSeries.slices.template.states.getKey('hover')
      const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter())
      hoverShadow.opacity = 0.7
      hoverShadow.blur = 5
      // Add a legend
      chart.legend = new am4charts.Legend()
      CategoryCountService.index()
        .then((response) => {
          const data = response.data
          this.list = JSON.parse(JSON.stringify(data))
          this.secondChart = [
            {
              country: 'Слайд',
              litres: 501.9
            },
            {
              country: 'Мэдээ мэдээлэл',
              litres: 165.8
            },
            {
              country: 'Хэлэлцүүлэг',
              litres: 139.9
            },
            {
              country: 'Зарлал',
              litres: 128.3
            }
          ]
          for (let i = 0; i < 4; i++) {
            this.secondChart[i].litres = this.list[0][i]
          }
          chart.data = this.secondChart
        })
        .catch((err) => {
          this.list = []
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
    },
    getChartLine2 (am4core, am4charts, am4themes_animated, am4themes_dark) {
      // Themes begin
      am4core.useTheme(am4themes_animated)
      // Themes end
      // Create chart instance
      const chart = am4core.create(this.$refs.chartdivline2, am4charts.XYChart)
      chart.paddingRight = 20
      // chart.data = this.list
      OnlineCountService.index(this.listQuery)
        .then((response) => {
          const data = response.data
          for (let i = 0; i < data.rows.length; i++) {
            data.rows[i].createdAt = moment(data.rows[i].createdAt).format('YYYY-MM-DD')
          }
          chart.data = JSON.parse(JSON.stringify(data.rows))
        })
        .catch((err) => {
          this.list = []
          err.response && err.response.data
            ? this.$message({
              type: 'warning',
              message: err.response.data.error
            })
            : this.$message({ type: 'error', message: err })
        })
      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'createdAt'
      categoryAxis.renderer.minGridDistance = 60
      categoryAxis.renderer.grid.template.location = 0.6
      categoryAxis.startLocation = 0.5
      categoryAxis.endLocation = 0.5
      // Pre zoom
      chart.events.on('datavalidated', function () {
        categoryAxis.zoomToIndexes(
          Math.round(chart.data.length * 0.4),
          Math.round(chart.data.length * 0.55)
        )
      })
      // Create value axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
      valueAxis.baseValue = 0
      // Create series
      const series = chart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY = 'count'
      series.dataFields.categoryX = 'createdAt'
      series.strokeWidth = 2
      series.tensionX = 0.77
      const range = valueAxis.createSeriesRange(series)
      range.value = 0
      range.endValue = 1000
      range.contents.stroke = am4core.color('#FF0000')
      range.contents.fill = range.contents.stroke
      // Add scrollbar
      const scrollbarX = new am4charts.XYChartScrollbar()
      scrollbarX.series.push(series)
      chart.scrollbarX = scrollbarX
      chart.cursor = new am4charts.XYCursor()
    }
  }
}
</script>

<style lang="scss" scoped>
.itemBackground {
  padding: 10px !important;
  background: white;
}
.columns {
  .column + .column {
    margin-left: 10px;
  }
}
.columns + .columns {
  margin-top: 10px !important;
}
.foother_space {
  margin-bottom: 50px;
  background-color: rgb(238, 238, 238);
  height: 100px;
}
</style>
