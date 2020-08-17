import axios from 'axios'
// import Cookie from 'cookiejs'
export default () => {
  return axios.create({
    baseURL: 'http://mpetro.smartsolution:8090'
    // headers: {
    //   Authorization: `Bearer ${Cookie.get('tokenwebadmin')}`
    // }
  })
}
