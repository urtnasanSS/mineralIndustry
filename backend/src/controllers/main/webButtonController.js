const { webButton } = require('../../models')
const helper = require('../../utils/Helper')

module.exports = {
  async index (req, res) {
    let response = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        let listQuery = JSON.parse(req.query.listQuery)
        var filter = {}
        filter.isActive = true
        filter.isDelete = false
        if (!helper.isNullOrWhitespace(listQuery.search.name)) {
          filter.name = {}
          filter.name.$like = `%${listQuery.search.name}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.nameEn)) {
          filter.nameEn = {}
          filter.nameEn.$like = `%${listQuery.search.nameEn}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.iframe)) {
          filter.iframe = {}
          filter.iframe.$like = `%${listQuery.search.iframe}%`
        }
        if (
          listQuery.search.isActive !== undefined &&
          listQuery.search.isActive !== null
        ) {
          filter.isActive = {}
          filter.isActive.$like = listQuery.search.isActive
        }
        if (
          listQuery.search.isDelete !== undefined &&
          listQuery.search.isDelete !== null
        ) {
          filter.isDelete = {}
          filter.isDelete.$like = listQuery.search.isDelete
        }
        if (
          !helper.isNull(listQuery.search.createdAt) &&
          listQuery.search.createdAt.length === 2
        ) {
          filter.createdAt = {}
          var result = new Date(listQuery.search.createdAt[1])
          var result0 = new Date(listQuery.search.createdAt[0])
          result.setDate(result.getDate() + 1)
          listQuery.search.createdAt[1] = result
          listQuery.search.createdAt[0] = result0
          filter.createdAt.$between = listQuery.search.createdAt
        }
        let limit = parseInt(listQuery.limit) || 10
        let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
        const prop = listQuery.sort.prop || 'createdAt'
        let order = listQuery.sort.order || 'ascending'
        order = order === 'ascending' ? 'DESC' : 'ASC'
        response = await webButton.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await webButton.findAll({
          where: { isActive: true, isDelete: false },
          order: [['createdAt', 'ASC']]
        })
        res.send(response)
      }
    } catch (err) {
      console.log(err)
    }
  },
  async post (req, res) {
    let temp // Address
    let newAddress
    let response
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      newAddress = await webButton.create(temp)
      response = await webButton.findOne({
        where: { id: newAddress.id }
      })
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async update (req, res) {
    let response = null
    let temp = null
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      await webButton.update(
        { updatedAt: new Date(), name: temp.name, link: temp.link, icon: temp.icon },
        { where: { id: temp.id } }
      )
      response = await webButton.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: temp.id }
      })
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async manyDestroy (req, res) {
    try {
      for (var i = 0; i < req.body.length; i++) {
        var temp = JSON.parse(JSON.stringify(req.body[i]))
        await webButton.update(
          { deletedAt: new Date(), isDelete: true },
          { where: { id: temp.id } }
        )
      }
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}
