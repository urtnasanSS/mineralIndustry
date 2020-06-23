const {RefPermissionType, User} = require('../../models')
const helper = require('../../utils/Helper')
module.exports = {
  async index (req, res) {
    let response = null
    try {
      if (req.query.listQuery !== undefined && req.query.listQuery !== null && req.query.listQuery !== undefined) {
        console.log(req.query.listQuery)
        let listQuery = JSON.parse(req.query.listQuery)
        var filter = {}
        if (!helper.isNullOrWhitespace(listQuery.search.searchText)) {
          filter.$or = ['code', 'name'].map(key => ({[key]: {$like: `%${listQuery.search.searchText}%`}}))
        }
        if (!helper.isNullOrWhitespace(listQuery.search.code)) {
          filter.code = {}
          filter.code.$like = `%${listQuery.search.code}%`
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
        let limit = parseInt(listQuery.limit) || 10
        let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
        const prop = listQuery.sort.prop || 'createdAt'
        let order = listQuery.sort.order || 'ascending'
        order = order === 'ascending' ? 'ASC' : 'DESC'
        response = await RefPermissionType.findAndCountAll({
          where: filter,
          order: [
            [prop, order]
          ],
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await RefPermissionType.findAll({
          where: { isActive: true },
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
    try {
      const exist = await RefPermissionType.findAndCountAll({
        where: {code: req.body.code}
      })
      if (exist.count > 0) {
        return res.status(403).send({
          error: 'Duplicated'
        })
      }
      req.body.createdBy = req.user.id
      const response = await RefPermissionType.create(req.body)
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
      const exist = await RefPermissionType.find({
        where: {code: req.body.code}
      })
      if (exist !== null && exist.id !== req.body.id) {
        return res.status(403).send({
          error: 'Duplicated'
        })
      }
      req.body.updatedBy = req.user.id
      await RefPermissionType.update(req.body, {
        where: {
          id: req.params.itemId
        }
      })

      const response = await RefPermissionType.findOne({
        where: {id: req.params.itemId}
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
      // Check User Relation
      for (var i = 0; i < req.body.length; i++) {
        const exist = await User.findAndCountAll({
          where: {permissionTypeId: req.body[i].id}
        })
        if (exist.count > 0) {
          return res.status(403).send({
            error: 'Permission Denied'
          })
        }
      }
      for (i = 0; i < req.body.length; i++) {
        await RefPermissionType.destroy({ where: { id: req.body[i].id } })
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
        await RefPermissionType.update({ isActive: false }, { where: { id: req.body[i].id } })
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
        await RefPermissionType.update({ isActive: true }, { where: { id: req.body[i].id } })
      }
      res.send('success')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}
