const {InquiryCivil, AllFile, RefOrganization, RefRespond, RefStatus, User} = require('../../models')
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
          where = ` AND (ic.register LIKE '%` + listQuery.search.searchText + `%' OR ic.surname LIKE '%` + listQuery.search.searchText + `%' OR ic.givenName LIKE '%` + listQuery.search.searchText + `%')`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.register)) {
          where = ` AND (ic.register LIKE '%` + listQuery.search.register + `%')`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.surname)) {
          where = ` AND (ic.surname LIKE '%` + listQuery.search.surname + `%')`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.givenName)) {
          where = ` AND (ic.givenName LIKE '%` + listQuery.search.givenName + `%')`
        }
        if (listQuery.search.isActive !== undefined && listQuery.search.isActive !== null) {
          where = ` AND (ic.isActive LIKE '%` + listQuery.search.isActive + `%')`
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
            ic.register AS 'Регистр', ic.surname AS 'Овог', ic.givenName AS 'Нэр', ic.createdAt AS 'Илгээсэн огноо',
            rs.name AS 'Лавлагааны хариу',
            ic.updatedAt AS 'Хариулсан огноо',
            u.givenName AS 'Лавлагааны ажилтан'
          FROM InquiryCivils AS ic
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
        console.log('----=======------------', req.user)
        let listQuery = JSON.parse(req.query.listQuery)
        var filter = {}
        if (req.user !== null && req.user.permissionTypeId === 3) {
          filter.organizationId = {}
          filter.organizationId.$like = req.user.organizationId
        }
        if (!helper.isNullOrWhitespace(listQuery.search.searchText)) {
          filter.$or = ['register', 'surname', 'givenName'].map(key => ({[key]: {$like: `%${listQuery.search.searchText}%`}}))
        }
        if (!helper.isNullOrWhitespace(listQuery.search.register)) {
          filter.register = {}
          filter.register.$like = `%${listQuery.search.register}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.surname)) {
          filter.surname = {}
          filter.surname.$like = `%${listQuery.search.surname}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.givenName)) {
          filter.givenName = {}
          filter.givenName.$like = `%${listQuery.search.givenName}%`
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
        // filter === { statusId: 123 }
        response = await InquiryCivil.findAndCountAll({
          attributes: { exclude: ['password'] },
          where: filter,
          order: [
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
        response = await InquiryCivil.findAll({
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
    let temp // InquiryCivil
    let newInquiryCivil
    let files
    let response
    try {
      console.log('InquiryCivil -> post', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.createdBy = req.user.id
      files = req.body.files
      var existuser = await User.findOne({
        where: {id: req.user.id}
      })
      if (existuser !== null && existuser !== undefined) {
        temp.organizationId = existuser.organizationId
      }
      console.log('InquiryCivil -> post 2 -------------', temp)
      newInquiryCivil = await InquiryCivil.create(temp)
      for (const obj of files) {
        const attachment = {}
        attachment.createdBy = req.user.id
        attachment.inquiryCivilId = newInquiryCivil.id
        attachment.type = 'InquiryCivil'
        attachment.fileName = obj.name
        attachment.storageName = obj.response.response.filename
        attachment.path = obj.url
        attachment.size = obj.response.size
        attachment.isActive = true
        attachment.isDelete = false
        await AllFile.create(attachment)
        console.log('------------==========attachment=========----------------', attachment)
      }
      response = await InquiryCivil.findOne({
        where: {id: newInquiryCivil.id},
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
      console.log('InquiryCivil -> view', req.params.itemId, req.user.id)
      tempId = req.params.itemId
      tempUserId = req.user.id
      console.log('hahahahhaa--------------', tempId)
      if ((tempId !== null && tempId !== undefined) && (tempUserId !== null && tempUserId !== undefined)) {
        const temp = await InquiryCivil.findOne({
          where: {id: tempId, statusId: 1}
        })
        if ((temp !== null && temp !== undefined)) {
          await InquiryCivil.update({ statusId: 2 }, { where: { id: tempId } })
        }
        response = await InquiryCivil.findOne({
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
      console.log('InquiryCivil -> update', req.body)
      req.body.updateBy = req.user.id
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      temp.updateBy = req.user.id
      console.log('InquiryCivil -> update', req.user.id, temp.respondId)
      await InquiryCivil.update({respondId: temp.respondId, statusId: temp.statusId, updatedBy: req.user.id, updatedAt: new Date()}, { where: { id: temp.id } })
      response = await InquiryCivil.findOne({
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
        await InquiryCivil.destroy({ where: { id: req.body[i].id } })
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
        await InquiryCivil.update({ isActive: false }, { where: { id: req.body[i].id } })
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
        await InquiryCivil.update({ isActive: true }, { where: { id: req.body[i].id } })
      }
      res.send('success')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}
