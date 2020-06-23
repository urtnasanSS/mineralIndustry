const { BannerType } = require('../../models')
const helper = require('../../utils/Helper')
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
        if (!helper.isNullOrWhitespace(listQuery.search.code)) {
          filter.code = {}
          filter.code.$like = `%${listQuery.search.code}%`
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
        response = await BannerType.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await BannerType.findAll({
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
    let temp // BannerType
    let newBannerType
    // let files
    let response
    try {
      console.log('BannerType -> post', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      // temp.createdBy = req.user.id
      // files = req.body.files
      // var existuser = await User.findOne({
      //   where: {id: req.user.id}
      // })
      // if (existuser !== null && existuser !== undefined) {
      //   temp.organizationId = existuser.organizationId
      // }
      console.log('BannerType -> post 2 -------------', temp)
      newBannerType = await BannerType.create(temp)
      // for (const obj of files) {
      //   const attachment = {}
      //   attachment.createdBy = req.user.id
      //   attachment.BannerTypeId = newBannerType.id
      //   attachment.type = 'BannerType'
      //   attachment.fileName = obj.name
      //   attachment.storageName = obj.response.response.filename
      //   attachment.path = obj.url
      //   attachment.size = obj.response.size
      //   attachment.isActive = true
      //   attachment.isDelete = false
      //   await AllFile.create(attachment)
      //   console.log('------------==========attachment=========----------------', attachment)
      // }
      response = await BannerType.findOne({
        where: { id: newBannerType.id }
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
      console.log('BannerType -> update', req.body)
      // req.body.updateBy = req.user.id
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      // temp.updateBy = req.user.id
      await BannerType.update(
        { updatedAt: new Date(), name: temp.name, code: temp.code },
        { where: { id: temp.id } }
      )
      response = await BannerType.findOne({
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
        await BannerType.update(
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
  // ,
  // async manyDeActive (req, res) {
  //   try {
  //     for (var i = 0; i < req.body.length; i++) {
  //       await BannerType.update({ isActive: false }, { where: { id: req.body[i].id } })
  //     }
  //     res.send('success')
  //   } catch (err) {
  //     res.status(500).send({
  //       error: err
  //     })
  //   }
  // },
  // async manyRestore (req, res) {
  //   try {
  //     for (var i = 0; i < req.body.length; i++) {
  //       await BannerType.update({ isActive: true }, { where: { id: req.body[i].id } })
  //     }
  //     res.send('success')
  //   } catch (err) {
  //     res.status(500).send({
  //       error: err
  //     })
  //   }
  // }
}
