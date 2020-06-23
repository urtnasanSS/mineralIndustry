const {RefStatus, RefRespond} = require('../../models')
module.exports = {
  async getRefStatus (req, res) {
    let response = null
    try {
      response = await RefStatus.findAll({
        where: { isActive: true },
        order: [[ 'createdAt', 'DESC' ]]
      })
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async getRefRespond (req, res) {
    let response = null
    try {
      response = await RefRespond.findAll({
        where: { isActive: true },
        order: [[ 'createdAt', 'DESC' ]]
      })
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  }
}
