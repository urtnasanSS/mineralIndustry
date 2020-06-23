const { Content } = require('../../models')
// const helper = require('../../utils/Helper')
module.exports = {
  async index (req, res) {
    let temp = null
    let response = null
    try {
      temp = JSON.parse(JSON.stringify(req.query.query))
      response = await Content.findAndCountAll({
        where: { title: { $like: '%' + temp + '%' } }
      })
      res.send(response)
    } catch (err) {
    }
  },
  async post (req, res) {
    let temp = null
    let response = null
    try {
      console.log(req.body, 'body-------------------------------')
      console.log(req.param, 'param-------------------------------')
      console.log(req.query, 'body-------------------------------')
      temp = JSON.parse(JSON.stringify(req.body.item))
      console.log(temp, 'tempeeee-----------')
      response = await Content.findAndCountAll({
        where: { title: { $like: '%' + temp + '%' } }
      })
      res.send(response)
      console.log(response.rows, 'response')
      console.log(response.count, 'response')
    } catch (err) {
    }
  }
}
