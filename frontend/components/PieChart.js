import { Doughnut } from 'vue-chartjs'
import axios from 'axios'
export default {
  extends: Doughnut,
  data () {
    return {
      data: [],
      names: [],
      counts: [],
      labels: [],
      value: [],
      color: ['#41B883', '#E46651', '#00D8FF', '#971B00', '#971B00', '#971B00', '#971B00']
    }
  },
  async  mounted () {
    this.data = (await axios({ method: 'get', url: 'https://mpetro.smartsolution.mn:8085/tenCompanyMostStation' })).data
    for (let index = 0; index < this.data.length; index++) {
      this.names[index] = this.data[index].organizationName
    }
    for (let value = 0; value < this.data.length; value++) {
      this.counts[value] = this.data[value].unitCount
    }
    this.labels = this.names
    this.value = this.counts
    this.test(this.labels, this.value)
  },
  methods: {
    test(labels, value) {
      const datasets = [{
        label: 'chart',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#971B00', '#ebfc03', '#0f03fc', '#fc0328', '#fc1403', '#03fcce', '#036bfc', '#eb03fc', '#fc035a', '#0c0d0d', '#d0f5c6'],
        data: []
      }]
      datasets[0].data = value
      this.renderChart({ labels, datasets })
    }
  }
}
