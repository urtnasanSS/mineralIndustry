import axios from 'axios'
export default () => {
  return axios.create({
    baseURL: 'https://mpetro.smartsolution.mn:8085'
  })
}
