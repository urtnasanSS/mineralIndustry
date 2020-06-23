const { LogRequest } = require('../../models')

module.exports = {
  async LogRequest (req, res) {
    try {
      var ip = '12313'
      const response = await LogRequest.create({IpAddress: ip})
      res.send(response)
    } catch (err) {
      res.status(500).send({error: err})
    }
  }
}
