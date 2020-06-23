const { AudioType, AllFile } = require('../../models')
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
        response = await AudioType.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          include: [
            { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
          ],
          distinct: true,
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await AudioType.findAll({
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
    let temp // AudioType
    let newAudioType
    let files
    let response
    try {
      console.log('AudioType -> post-------------------------', req.body.files)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      files = req.body.files
      newAudioType = await AudioType.create(temp)
      console.log('---------------------------456', newAudioType.id, '---------------------------456')
      for (const obj of files) {
        const attachment = {}
        attachment.createdBy = 1
        attachment.contentId = newAudioType.id
        attachment.type = 'Audio'
        attachment.name = obj.name
        attachment.storageName = obj.name
        attachment.url = obj.url
        attachment.size = obj.size
        attachment.fileType = obj.fileType
        attachment.isActive = true
        attachment.isDelete = false
        await AllFile.create(attachment)
      }
      response = await AudioType.findOne({
        where: { id: newAudioType.id },
        include: [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
      })
      console.log(response, 'thisresponse---------------------ssss')
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async update (req, res) {
    let response
    let temp
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      await AudioType.update(
        { updatedAt: new Date(), name: temp.name, code: temp.code },
        { where: { id: temp.id } }
      )
      await AllFile.destroy({where: {contentId: temp.id}})
      for (const obj of temp.files) {
        console.log('Slide -> update', req.body)
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
          attachment.contentId = temp.id
          attachment.type = 'Audio'
          attachment.storageName = obj.name
          attachment.name = obj.name
          attachment.url = obj.url
          attachment.size = obj.size
          attachment.fileType = obj.fileType
          attachment.isActive = true
          attachment.isDelete = false
          // console.log(attachment, 'attachment---------------------------------------')
          await AllFile.create(attachment)
        }
      }
      response = await AudioType.findOne({
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
        await AudioType.update(
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
