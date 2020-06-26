import { Doughnut } from 'vue-chartjs'
export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      labels: ['Android', 'Windows', 'ios', 'OS X'],
      datasets: [
        {
          label: 'chart',
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#971B00'],
          data: [40.47, 34.2, 14.92, 7.24]
        }
      ]
    })
  }
}
