import axios from 'axios'
// import Cookie from 'cookiejs'
export default () => {
  return axios.create({
    baseURL: 'http://localhost:8083'
    // headers: {
    //   Authorization: `Bearer ${Cookie.get('tokenwebadmin')}`
    // }
  })
}
