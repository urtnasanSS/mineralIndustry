const { Links, AllFile } = require('../../models')
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
        if (!helper.isNullOrWhitespace(listQuery.search.nameEn)) {
          filter.nameEn = {}
          filter.nameEn.$like = `%${listQuery.search.nameEn}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.link)) {
          filter.link = {}
          filter.link.$like = `%${listQuery.search.link}%`
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
        response = await Links.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          include: [
            // { model: RefRespond, as: 'respondIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            // { model: RefStatus, as: 'statusIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
          ],
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await Links.findAll({
          // attributes: ['id', 'register', 'surname', 'givenName'],
          where: { isActive: true, isDelete: false },
          order: [['createdAt', 'DESC']],
          include: [
            { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
          ]
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
    let temp // Links
    let newLinks
    let files
    let response
    try {
      // console.log('Links -> post', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      // temp.createdBy = req.user.id
      // console.log(req.body.files, 'req.body.files-----------**********-------------')
      files = req.body.files
      // var existuser = await User.findOne({
      //   where: {id: req.user.id}
      // })
      // console.log('Links -> post 2 -------------', temp)
      newLinks = await Links.create(temp)
      for (const obj of files) {
        const attachment = {}
        attachment.createdBy = 1
        attachment.linksId = newLinks.id
        attachment.type = 'Links'
        attachment.name = obj.name
        attachment.storageName = obj.response.response.filename
        attachment.url = obj.url
        attachment.size = obj.response.size
        attachment.isActive = true
        attachment.isDelete = false
        // console.log(attachment, 'attachment---------------------------------------')
        await AllFile.create(attachment)
      }
      response = await Links.findOne({
        where: { id: newLinks.id },
        include: [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
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
      console.log('Links -> update', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      await AllFile.destroy({where: {linksId: temp.id}})
      for (const obj of temp.files) {
        if (!obj.isDelete) {
          const attachment = {}
          if (obj.id === null) {
            attachment.storageName = obj.response.response.filename
            attachment.size = obj.response.size
          } else {
            attachment.storageName = obj.filename
            attachment.size = obj.size
          }
          attachment.createdBy = 1
          attachment.linksId = temp.id
          attachment.type = 'Links'
          attachment.storageName = obj.storageName
          attachment.fileType = obj.fileType
          attachment.name = obj.name
          attachment.url = obj.url
          attachment.isActive = true
          attachment.isDelete = false
          await AllFile.create(attachment)
        }
      }
      await Links.update(
        { updatedAt: new Date(), name: temp.name, nameEn: temp.nameEn, link: temp.link, bannerTypeId: temp.bannerTypeId, files: temp.files },
        { where: { id: temp.id } }
      )
      response = await Links.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: temp.id },
        include: [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
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
        await Links.update(
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
  //       await Links.update({ isActive: false }, { where: { id: req.body[i].id } })
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
  //       await Links.update({ isActive: true }, { where: { id: req.body[i].id } })
  //     }
  //     res.send('success')
  //   } catch (err) {
  //     res.status(500).send({
  //       error: err
  //     })
  //   }
  // }
}
