const { Address } = require('../../models')
const helper = require('../../utils/Helper')
const sequelize = require('../../models').sequelize

module.exports = {
  async index (req, res) {
    let response = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        console.log('----=======------------', req.user)
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
        order = order === 'ascending' ? 'ASC' : 'DESC'
        response = await Address.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await Address.findAll({
          // attributes: ['id', 'register', 'surname', 'givenName'],
          where: { isActive: true, isDelete: false },
          order: [['createdAt', 'DESC']]
        })
        res.send(response)
      }
    } catch (err) {
      console.log(err)
      // res.status(500).send({
      //   error: err
      // })
    }
  },
  async post (req, res) {
    let temp // Address
    let newAddress
    // let files
    let response
    try {
      // console.log('Address -> post', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      // temp.createdBy = req.user.id
      // files = req.body.files
      // var existuser = await User.findOne({
      //   where: {id: req.user.id}
      // })
      console.log('Address -> post 2 -------------', temp)
      newAddress = await Address.create(temp)
      // for (const obj of files) {
      //   const attachment = {}
      //   attachment.createdBy = req.user.id
      //   attachment.AddressId = newAddress.id
      //   attachment.type = 'Address'
      //   attachment.fileName = obj.name
      //   attachment.storageName = obj.response.response.filename
      //   attachment.path = obj.url
      //   attachment.size = obj.response.size
      //   attachment.isActive = true
      //   attachment.isDelete = false
      //   await AllFile.create(attachment)
      // console.log('------------==========attachment=========----------------', attachment)
      // }
      response = await Address.findOne({
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
      await Address.update(
        { updatedAt: new Date(), name: temp.name, nameEn: temp.nameEn, iframe: temp.iframe, phone: temp.phone, Fax: temp.Fax, facebook: temp.facebook, Email: temp.Email },
        { where: { id: temp.id } }
      )
      response = await Address.findOne({
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
        // console.log(req.body[i], 'i--------------------------------------------------------------')
        var temp = JSON.parse(JSON.stringify(req.body[i]))
        await Address.update(
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
  },
  async SiteRequest (req, res) {
    try {
      const response = await sequelize.query('select sum(case when DATE(createdAt) = CURDATE() then 1 else 0 end) today, sum(case when  Date(createdAt) BETWEEN CURDATE() - 6 and CURDATE()  then 1 else 0 end) lastWeek, sum(case when  Date(createdAt) BETWEEN DATE_SUB(curdate(), INTERVAL 1 MONTH) and CURDATE()  then 1 else 0 end) lastMonth, sum(case when  Date(createdAt) BETWEEN DATE_SUB(curdate(), INTERVAL 1 YEAR) and CURDATE()  then 1 else 0 end) lastYear, sum(1) allRequest from LogRequests',
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      res.send(response[0])
    } catch (err) {
    }
  }
}
