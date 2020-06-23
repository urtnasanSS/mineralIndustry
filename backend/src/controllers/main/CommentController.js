const { Comment } = require('../../models')
// AllFile
const helper = require('../../utils/Helper')
module.exports = {
  async index (req, res) {
    let response = null
    let tempId = null
    let listQuery
    try {
      tempId = req.query.id
      console.log(tempId, 'tempId-----------------------------------------')
      listQuery = JSON.parse(req.query.listQuery)
      console.log(listQuery, 'response----------------------1 ')
      let limit = parseInt(listQuery.limit) || 10
      let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
      const prop = listQuery.sort.prop || 'createdAt'
      let order = listQuery.sort.order || 'descending'
      order = order === 'descending' ? 'ASC' : 'DESC'
      response = await Comment.findAndCountAll({
        where: { contentId: tempId },
        order: [[prop, order]],
        limit: limit,
        offset: offset
      })
      res.send(response)
    } catch (err) {
      console.log(err)
    }
  },
  async post (req, res) {
    let temp // Comment
    let newComment
    // let files
    let response
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      temp.isActive = true
      newComment = await Comment.create(temp)
      response = await Comment.findOne({
        where: { id: newComment.id },
        include: []
      })
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async update (req, res) {
    let response = null
    let temp = null
    try {
      console.log('Comment -> update', req.body, '--------------------ssss--------------------------')
      // req.body.updateBy = req.user.id
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      await Comment.update(
        { updatedAt: new Date(), author: temp.author, text: temp.text },
        { where: { id: temp.id } }
      )
      response = await Comment.findOne({
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
        await Comment.destroy({ where: { id: req.body[i].id } })
      }
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async show (req, res) {
    let response = null
    let listQuery
    let filter = {}
    console.log(req.query.listQuery, 'shit--------------------------------------------------')
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        listQuery = JSON.parse(req.query.listQuery)
        console.log(listQuery, 'console.lgo(00---------------------------------')
        if (!helper.isNullOrWhitespace(listQuery.search.author)) {
          filter.author = {}
          filter.author.$like = `%${listQuery.search.author}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.text)) {
          filter.text = {}
          filter.text.$like = `%${listQuery.search.text}%`
        }
        console.log(listQuery, 'response----------------------2 ')
        let limit = parseInt(listQuery.limit) || 10
        let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
        const prop = listQuery.sort.prop || 'createdAt'
        let order = listQuery.sort.order || 'descending'
        order = order === 'descending' ? 'ASC' : 'DESC'
        response = await Comment.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          limit: limit,
          offset: offset
        })
        res.send(response)
      } else {
        console.log('pizdaaa---------------------------------------')
        let limit = parseInt(listQuery.limit) || 10
        let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
        const prop = listQuery.sort.prop || 'createdAt'
        let order = listQuery.sort.order || 'descending'
        order = order === 'descending' ? 'ASC' : 'DESC'
        response = await Comment.findAndCountAll({
          order: [[prop, order]],
          limit: limit,
          offset: offset
        })
        res.send(response)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
