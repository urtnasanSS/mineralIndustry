const { Menu, MenuViewType, MenuType } = require('../../models')
const helper = require('../../utils/Helper')
let menuList = []
var self = module.exports = {
  async index (req, res) {
    let response = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
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
        if (listQuery.search.isActive !== undefined && listQuery.search.isActive !== null) {
          filter.isActive = {}
          filter.isActive.$like = listQuery.search.isActive
        }
        if (listQuery.search.menuTypeId !== undefined && listQuery.search.menuTypeId !== null) {
          filter.menuTypeId = {}
          filter.menuTypeId = listQuery.search.menuTypeId
        }
        if (listQuery.search.notMenuTypeId !== undefined && listQuery.search.notMenuTypeId !== null) {
          filter.menuTypeId = {}
          filter.menuTypeId.$ne = listQuery.search.notMenuTypeId
        }
        if (listQuery.search.isDelete !== undefined && listQuery.search.isDelete !== null) {
          filter.isDelete = {}
          filter.isDelete.$like = listQuery.search.isDelete
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
        const prop = listQuery.sort.prop || 'createdAt'
        let order = listQuery.sort.order || 'ascending'
        order = order === 'ascending' ? 'DESC' : 'ASC'
        response = await Menu.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          include: [
            {
              model: MenuViewType,
              as: 'menuViewTypeIds',
              attributes: { exclude: ['deletedAt', 'deletedBy'] }
            },
            {
              model: MenuType,
              as: 'menuTypeIds',
              attributes: { exclude: ['deletedAt', 'deletedBy'] }
            }
          ],
          limit: limit
        })
        res.send(response)
      } else {
        response = await Menu.findAll({
          // attributes: ['id', 'register', 'surname', 'givenName'],
          where: { isActive: true, isDelete: false },
          order: [['createdAt', 'ASC']]
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
  async getChildMenus (parentId) {
    // console.log('****parentId****', parentId)
    let response = null
    const attributes = [['id', 'id'], ['id', 'value'], ['name', 'label'], ['nameEn', 'labelEn'], 'disabled', 'link', 'sortOrder', 'hide', 'menuViewTypeId', 'isRedirect']
    response = await Menu.findAll({
      attributes: attributes,
      where: { parentId: parentId, isActive: true, isDelete: false, menuTypeId: 1 },
      order: [['sortOrder', 'ASC']]
    })
    const response1 = JSON.parse(JSON.stringify(response))
    for (const r of response1) {
      // console.log('rrrrrrrrrrrrrrr', r)
      const children = await self.getChildMenus(r.value)
      if (children && children.length > 0) {
        r.children = children
      }
    }
    return response1
  },
  async cascadeList (req, res) {
    // let attributes = [['id', 'value'], ['name', 'label']]
    try {
      // response = await Menu.findAll({
      //   // attributes: ['id', 'register', 'surname', 'givenName'],
      //   // attributes: attributes,
      //   // include: [{ model: Menu, as: 'children', attributes: attributes }],
      //   where: { isActive: true, isDelete: false },
      //   order: [['createdAt', 'DESC']]
      // })
      // for (const item of response) {
      //   // item.dataValues.value = item.dataValues.value.toString()
      //   if (item.dataValues.children.length === 0) {
      //     delete item.dataValues.children
      //   } else {
      //     // item.children.dataValues.value = item.children.dataValues.value.toString()
      //   }
      // }
      if (menuList && menuList.length > 0) {
        res.send(menuList)
      } else {
        const menus = await self.getChildMenus(null)
        menuList = menus
        res.send(menus)
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async findById (req, res) {
    let tempId
    let response
    try {
      if (!helper.isNullOrWhitespace(req.query.item)) {
        tempId = JSON.parse(JSON.stringify(req.query.item))
        response = await Menu.findOne({
          where: { id: tempId },
          include: [
            {
              model: MenuViewType,
              as: 'menuViewTypeIds',
              attributes: { exclude: ['deletedAt', 'deletedBy'] }
            },
            {
              model: MenuType,
              as: 'menuTypeIds',
              attributes: { exclude: ['deletedAt', 'deletedBy'] }
            }
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
    menuList = []
    let temp // Menu
    let newMenu
    // let files
    let response
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      if (temp.parentId === '' || temp.parentId === 0) {
        temp.parentId = null
      }
      // temp.createdBy = req.user.id
      // files = req.body.files
      // var existuser = await User.findOne({
      //   where: {id: req.user.id}
      // })
      // if (existuser !== null && existuser !== undefined) {
      //   temp.organizationId = existuser.organizationId
      // }
      // console.log('Menu -> post 2 -------------', temp)
      newMenu = await Menu.create(temp)
      const attributes = [['id', 'value'], ['name', 'label'], 'disabled']
      response = await Menu.findOne({
        attributes: attributes,
        where: { id: newMenu.id }
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
    menuList = []
    let response = null
    let temp = null
    try {
      // console.log('Menu -> update', req.body)
      // req.body.updateBy = req.user.id
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      if (temp.parentId === '' || temp.parentId === 0) {
        temp.parentId = null
      }
      // console.log(temp.sortOrder, '----------------------------')
      // temp.updateBy = req.user.id
      await Menu.update(
        {
          updatedAt: new Date(),
          name: temp.name,
          nameEn: temp.nameEn,
          link: temp.link,
          isRedirect: temp.isRedirect,
          sortOrder: temp.sortOrder,
          menuViewTypeId: temp.menuViewTypeId,
          menuTypeId: temp.menuTypeId,
          parentId: temp.parentId,
          subParentId: temp.subParentId
        },
        { where: { id: temp.id } }
      )
      const attributes = [['id', 'value'], ['name', 'label'], 'disabled']
      response = await Menu.findOne({
        attributes: attributes,
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
  async manyDestroyhelpMenu (req, res) {
    menuList = []
    try {
      const aa = await Menu.update(
        { deletedAt: new Date(), isDelete: true },
        { where: { id: req.body.id } }
      )
      res.send(req.body)
      console.log(aa, 'aa')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async manyDestroy (req, res) {
    menuList = []
    try {
      const aa = await Menu.update(
        { deletedAt: new Date(), isDelete: true },
        { where: { id: req.body.value } }
      )
      res.send(req.body)
      console.log(aa, 'aa')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}
