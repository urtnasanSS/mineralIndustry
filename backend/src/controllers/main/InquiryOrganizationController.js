const {InquiryOrganization, AllFile, RefOrganization, RefRespond, RefStatus, User} = require('../../models')
const helper = require('../../utils/Helper')
const sequelize = require('../../models').sequelize
module.exports = {
  async exportToExcel (req, res) {
    let response = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        let listQuery = JSON.parse(req.query.listQuery)
        console.log('--------listQuery------', listQuery)
        var where = ''
        if (req.user !== null && req.user.permissionTypeId === 3) {
          where = ` AND ic.organizationId = ` + req.user.organizationId
        }
        if (!helper.isNullOrWhitespace(listQuery.search.searchText)) {
          where = ` AND (ic.register LIKE '%` + listQuery.search.searchText + `%' OR ic.name LIKE '%` + listQuery.search.searchText + `%')`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.register)) {
          where = ` AND (ic.register LIKE '%` + listQuery.search.register + `%')`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.name)) {
          where = ` AND (ic.name LIKE '%` + listQuery.search.name + `%')`
        }
        if (!helper.isNull(listQuery.search.createdAt) && listQuery.search.createdAt.length === 2) {
          var result = new Date(listQuery.search.createdAt[1])
          var result0 = new Date(listQuery.search.createdAt[0])
          result.setDate(result.getDate() + 1)
          where = ` AND (ic.createdAt BETWEEN '` + result + `' AND '` + result0 + `')`
        }
        if (listQuery.search.organizationId !== undefined && listQuery.search.organizationId !== null) {
          where = ` AND (ic.organizationId LIKE '%` + listQuery.search.organizationId + `%')`
        }
        if (listQuery.search.respondId !== undefined && listQuery.search.respondId !== null) {
          where = ` AND (ic.respondId LIKE '%` + listQuery.search.respondId + `%')`
        }
        if (listQuery.search.statusId !== undefined && listQuery.search.statusId !== null) {
          where = ` AND (ic.statusId LIKE '%` + listQuery.search.statusId + `%')`
        }
        response = await sequelize.query(
          `
          SELECT 
            o.name AS 'Байгууллага',
            ic.register AS 'Регистр', ic.name AS 'Байгууллагын нэр', ic.createdAt AS 'Илгээсэн огноо',
            rs.name AS 'Лавлагааны хариу',
            ic.updatedAt AS 'Хариулсан огноо',
            u.givenName AS 'Лавлагааны ажилтан'
          FROM InquiryOrganizations AS ic
          INNER JOIN RefOrganizations AS o ON ic.organizationId = o.id
          INNER JOIN RefStatuses AS rs ON ic.statusId = rs.id
          INNER JOIN Users AS u ON ic.updatedBy = u.id
          WHERE (ic.respondId = 3 OR ic.respondId = 4)` + where + `
          `,
          { replacements: { }, type: sequelize.QueryTypes.SELECT }
        )
        res.send(response)
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async index (req, res) {
    let response = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        let listQuery = JSON.parse(req.query.listQuery)
        var filter = {}
        if (req.user !== null && req.user.permissionTypeId === 3) {
          filter.organizationId = {}
          filter.organizationId.$like = req.user.organizationId
        }
        if (!helper.isNullOrWhitespace(listQuery.search.searchText)) {
          filter.$or = ['register', 'name'].map(key => ({[key]: {$like: `%${listQuery.search.searchText}%`}}))
        }
        if (!helper.isNullOrWhitespace(listQuery.search.register)) {
          filter.register = {}
          filter.register.$like = `%${listQuery.search.register}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.name)) {
          filter.name = {}
          filter.name.$like = `%${listQuery.search.name}%`
        }
        if (listQuery.search.isActive !== undefined && listQuery.search.isActive !== null) {
          filter.isActive = {}
          filter.isActive.$like = listQuery.search.isActive
        }
        if (!helper.isNull(listQuery.search.createdAt) && listQuery.search.createdAt.length === 2) {
          filter.createdAt = {}
          var result = new Date(listQuery.search.createdAt[1])
          var result0 = new Date(listQuery.search.createdAt[0])
          result.setDate(result.getDate() + 1)
          listQuery.search.createdAt[1] = result
          listQuery.search.createdAt[0] = result0
          filter.createdAt.$between = listQuery.search.createdAt
        }
        if (listQuery.search.organizationId !== undefined && listQuery.search.organizationId !== null) {
          filter.organizationId = {}
          filter.organizationId.$like = listQuery.search.organizationId
        }
        if (listQuery.search.respondId !== undefined && listQuery.search.respondId !== null) {
          filter.respondId = {}
          filter.respondId.$like = listQuery.search.respondId
        }
        if (listQuery.search.statusId !== undefined && listQuery.search.statusId !== null) {
          filter.statusId = {}
          filter.statusId.$like = listQuery.search.statusId
        }
        let limit = parseInt(listQuery.limit) || 10
        let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
        // const prop = listQuery.sort.prop || 'createdAt'
        // let order = listQuery.sort.order || 'ascending'
        // order = order === 'ascending' ? 'ASC' : 'DESC'
        response = await InquiryOrganization.findAndCountAll({
          attributes: { exclude: ['password'] },
          where: filter,
          order: [
            // [prop, order]
            ['createdAt', 'DESC']
          ],
          include: [
            { model: RefOrganization, as: 'organizationIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            { model: RefRespond, as: 'respondIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            { model: RefStatus, as: 'statusIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
          ],
          distinct: true,
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await InquiryOrganization.findAll({
          attributes: ['id', 'register', 'surname', 'givenName'],
          where: { isActive: true, isDelete: false },
          order: [[ 'createdAt', 'DESC' ]]
        })
        res.send(response)
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async post (req, res) {
    let temp // InquiryOrganization
    let newInquiryOrganization
    let files
    let response
    try {
      console.log('InquiryOrganization -> post', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.createdBy = req.user.id
      temp.updatedAt = null
      files = req.body.files
      var existuser = await User.findOne({
        where: {id: req.user.id}
      })
      if (existuser !== null && existuser !== undefined) {
        temp.organizationId = existuser.organizationId
      }
      console.log('InquiryCivil -> post 2 -------------', temp)
      newInquiryOrganization = await InquiryOrganization.create(temp)
      for (const obj of files) {
        const attachment = {}
        attachment.createdBy = req.user.id
        attachment.inquiryOrganizationId = newInquiryOrganization.id
        attachment.type = 'InquiryOrganization'
        attachment.fileName = obj.name
        attachment.storageName = obj.response.response.filename
        attachment.path = obj.url
        attachment.size = obj.response.size
        attachment.isActive = true
        attachment.isDelete = false
        await AllFile.create(attachment)
        console.log('------------==========attachment=========----------------', attachment)
      }
      response = await InquiryOrganization.findOne({
        where: {id: newInquiryOrganization.id},
        include: [
          { model: RefOrganization, as: 'organizationIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          { model: RefRespond, as: 'respondIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          { model: RefStatus, as: 'statusIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
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
  async view (req, res) {
    let response = null
    let tempId = null
    let tempUserId = null
    try {
      console.log('InquiryOrganization -> view', req.params.itemId, req.user.id)
      tempId = req.params.itemId
      tempUserId = req.user.id
      console.log('hahahahhaa--------------', tempId)
      if ((tempId !== null && tempId !== undefined) && (tempUserId !== null && tempUserId !== undefined)) {
        const temp = await InquiryOrganization.findOne({
          where: {id: tempId, statusId: 1}
        })
        if ((temp !== null && temp !== undefined)) {
          await InquiryOrganization.update({ statusId: 2 }, { where: { id: tempId } })
        }
        response = await InquiryOrganization.findOne({
          attributes: { exclude: ['deletedAt', 'deletedBy'] },
          where: {id: tempId},
          include: [
            { model: RefOrganization, as: 'organizationIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            { model: RefRespond, as: 'respondIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            { model: RefStatus, as: 'statusIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
            { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
          ]
        })
      }
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
      console.log('InquiryOrganization -> update', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      temp.updateBy = req.user.id
      await InquiryOrganization.update({respondId: temp.respondId, statusId: temp.statusId, updatedBy: req.user.id, updatedAt: new Date()}, { where: { id: temp.id } })
      response = await InquiryOrganization.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: {id: temp.id},
        include: [
          { model: RefOrganization, as: 'organizationIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          { model: RefRespond, as: 'respondIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          { model: RefStatus, as: 'statusIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
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
        await InquiryOrganization.destroy({ where: { id: req.body[i].id } })
      }
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async manyDeActive (req, res) {
    try {
      for (var i = 0; i < req.body.length; i++) {
        await InquiryOrganization.update({ isActive: false }, { where: { id: req.body[i].id } })
      }
      res.send('success')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async manyRestore (req, res) {
    try {
      for (var i = 0; i < req.body.length; i++) {
        await InquiryOrganization.update({ isActive: true }, { where: { id: req.body[i].id } })
      }
      res.send('success')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}
