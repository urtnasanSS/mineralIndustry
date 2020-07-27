
import axios from 'axios'
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
      data: [],
      names: [],
      counts: [],
      labels: [],
      value: []
    }
  },
  async created () {
    this.data = (await axios({ method: 'get', url: 'https://mpetro.smartsolution.mn:8085/report/import/productByMonth?year=2020' })).data.rows
    console.log(this.data, '----------------------daraaaa')
    for (let index = 0; index < this.data.length; index++) {
      this.names[index] = this.data[index].month
    }
    for (let value = 0; value < this.data.length; value++) {
      this.counts[value] = this.data[value].total
    }
    this.labels = this.names
    this.value = this.counts
    this.test(this.labels, this.value)
  },
  methods: {
    test(labels, value) {
      console.log(this.value, '----lables')
      const datasets = [{
        label: 'chart',
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#971B00', '#ebfc03', '#0f03fc', '#fc0328', '#fc1403', '#03fcce', '#036bfc'],
        data: []
      }]
      datasets[0].data = value
      this.renderChart({ labels, datasets })
    }
  }
}
