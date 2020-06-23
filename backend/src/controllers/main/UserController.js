const {User, RefPermissionType} = require('../../models')
const helper = require('../../utils/Helper')
const errorFunction = require('../../utils/ErrorFunction')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
module.exports = {
  async index (req, res) {
    let user = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        let listQuery = JSON.parse(req.query.listQuery)
        var filter = {}
        if (!helper.isNullOrWhitespace(listQuery.search.searchText)) {
          filter.$or = ['surname', 'givenName', 'userName', 'phoneNumber'].map(key => ({[key]: {$like: `%${listQuery.search.searchText}%`}}))
        }
        if (!helper.isNullOrWhitespace(listQuery.search.surName)) {
          filter.surName = {}
          filter.surName.$like = `%${listQuery.search.surName}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.givenName)) {
          filter.givenName = {}
          filter.givenName.$like = `%${listQuery.search.givenName}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.surName)) {
          filter.surName = {}
          filter.surName.$like = `%${listQuery.search.surName}%`
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
        if (listQuery.search.userTypeId !== undefined && listQuery.search.userTypeId !== null) {
          filter.userTypeId = {}
          filter.userTypeId.$like = listQuery.search.userTypeId
        }
        let limit = parseInt(listQuery.limit) || 10
        let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
        const prop = listQuery.sort.prop || 'createdAt'
        let order = listQuery.sort.order || 'ascending'
        order = order === 'ascending' ? 'ASC' : 'DESC'
        user = await User.findAndCountAll({
          attributes: { exclude: ['password'] },
          where: filter,
          order: [
            [prop, order]
          ],
          include: [{model: RefPermissionType, attributes: ['name']}],
          distinct: true,
          offset: offset,
          limit: limit
        })
        res.send(user)
      } else {
        user = await User.findAll({
          attributes: { exclude: ['password'] },
          where: { isActive: true },
          include: [{model: RefPermissionType, attributes: ['code', 'name']}],
          order: [[ 'createdAt', 'DESC' ]]
        })
        res.send(user)
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async post (req, res) {
    let user // User
    let response
    try {
      // req.body.createdBy = req.user.id
      // console.log('---------post---------', req.body)
      console.log(req.body)
      user = await User.create(req.body)
      const SALT_FACTOR = 8
      const hash = await bcrypt.genSaltAsync(SALT_FACTOR).then(salt => bcrypt.hashAsync('123456', salt, null))
      await User.update({password: hash}, {
        where: { id: user.id }
      })
      response = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {id: user.id},
        include: [{model: RefPermissionType, attributes: ['name']}]
      })
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async put (req, res) {
    try {
      if (req.body.password !== undefined && req.body.password !== null) {
        const hash = await bcrypt.genSaltAsync(8).then(salt => bcrypt.hashAsync(req.body.password, salt, null))
        req.body.password = hash
      }
      console.log(req.body, '---------------reqBody---------------')
      await User.update(req.body, {
        where: { id: req.body.id }
      })
      const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {id: req.body.id},
        include: [{model: RefPermissionType, attributes: ['name']}]
      })
      res.send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async userChangePassword (req, res) {
    try {
      console.log('==========userChangePassword============')
      const userId = req.params.itemId
      const user = await User.findOne({ where: {id: userId} })
      if (user !== null && user !== undefined) {
        const SALT_FACTOR = 8
        const hash = await bcrypt.genSaltAsync(SALT_FACTOR).then(salt => bcrypt.hashAsync('123456', salt, null))
        await User.update({password: hash}, {
          where: {
            id: user.id
          }
        })
      }
      res.send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Алдаа гарлаа. Түр хүлээж байгаад дахин оролдоно уу'
      })
    }
  },
  async manyDestroy (req, res) {
    try {
      console.log(req, '===============custom==================')
      // console.log(test)
      for (var i = 0; i < req.body.length; i++) {
        await User.destroy({ where: { id: req.body[i].id } })
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
        await User.update({ isActive: false }, { where: { id: req.body[i].id } })
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
        await User.update({ isActive: true }, { where: { id: req.body[i].id } })
      }
      res.send('success')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async logout (req, res) {
    try {
      console.log('end orlooooooo--------------------------')
      // НЭВТЭРСЭН ЛОГИЙГ ЗАСАХ
      // await LoginLog.update({userKeyId: req.userKey._id, tokenId: req.userKey.tokenId}, {$set: {logoutDate: new Date()}}).exec()
      return res.send({status: 1, result: 1, description: 'good bye!'})
    } catch (err) {
      return errorFunction.saveErrorAndSend(req, res, err)
    }
  }
}
module.exports.map = function (name) {
  return 'haha'
}
