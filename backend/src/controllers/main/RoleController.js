const { Role } = require('../../models')
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
        if (!helper.isNullOrWhitespace(listQuery.search.answer)) {
          filter.answer = {}
          filter.answer.$like = `%${listQuery.search.answer}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.answerEn)) {
          filter.answerEn = {}
          filter.answerEn.$like = `%${listQuery.search.answerEn}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.question)) {
          filter.question = {}
          filter.question.$like = `%${listQuery.search.question}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.questionEn)) {
          filter.questionEn = {}
          filter.questionEn.$like = `%${listQuery.search.questionEn}%`
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
        response = await Role.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          include: [
          ],
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await Role.findAll({
          where: { isActive: true, isDelete: false },
          order: [['createdAt', 'DESC']],
          include: [
          ]
        })
        res.send(response)
      }
    } catch (err) {
      console.log(err)
    }
  },
  async post (req, res) {
    let temp // Role
    let newRole
    // let files
    let response
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      newRole = await Role.create(temp)
      response = await Role.findOne({
        where: { id: newRole.id },
        include: [
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
      console.log('Role -> update', req.body)
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      await Role.update(
        { updatedAt: new Date(), answer: temp.answer, answerEn: temp.answerEn, question: temp.question, questionEn: temp.questionEn },
        { where: { id: temp.id } }
      )
      response = await Role.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: temp.id },
        include: [
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
        await Role.update(
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
