const {
  Content, AllFile, ContentMenu, ContentCategory
  // Comment
} = require('../../models')
// ContentMenu
// ContentType
const helper = require('../../utils/Helper')
module.exports = {
  async index (req, res) {
    let response = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        let listQuery = JSON.parse(req.query.listQuery)
        var filter = {}
        filter.isActive = true
        filter.isDelete = false
        var categoryFilter = {}
        var menuFilter = {}
        if (!helper.isNullOrWhitespace(listQuery.search.name)) {
          filter.name = {}
          filter.name.$like = `%${listQuery.search.name}%`
        }
        if (!helper.isNullOrEmpty(listQuery.search.categoryIds)) {
          categoryFilter.categoryId = {$in: listQuery.search.categoryIds}
        }
        if (!helper.isNull(listQuery.search.categoryId)) {
          categoryFilter.categoryId = {}
          categoryFilter.categoryId = listQuery.search.categoryId
        }
        if (!helper.isNull(listQuery.search.menuId)) {
          menuFilter.menuId = {}
          menuFilter.menuId = listQuery.search.menuId
        }
        if (listQuery.search.isActive !== undefined && listQuery.search.isActive !== null) {
          filter.isActive = {}
          filter.isActive.$like = listQuery.search.isActive
        }
        if (listQuery.search.isDelete !== undefined && listQuery.search.isDelete !== null) {
          filter.isDelete = {}
          filter.isDelete.$like = listQuery.search.isDelete
        }
        if (listQuery.search.isSpecial !== undefined && listQuery.search.isSpecial !== null) {
          filter.isSpecial = {}
          filter.isSpecial.$like = listQuery.search.isSpecial
        }
        if (listQuery.search.isStopPress !== undefined && listQuery.search.isStopPress !== null) {
          filter.isStopPress = {}
          filter.isStopPress.$like = listQuery.search.isStopPress
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
        const prop = listQuery.sort.prop || 'publishDate'
        let order = listQuery.sort.order || 'ascending'
        order = order === 'ascending' ? 'ASC' : 'DESC'
        const includes = [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
          // { model: Comment, as: 'commentIds', attributes: { exclude: [ 'text', 'author', 'createdAt' ] } }
        ]
        // if (!helper.isEmptyObject(menuFilter)) {
        const incMenu = { model: ContentMenu,
          attributes: { exclude: ['deletedAt'] },
          where: menuFilter,
          as: 'contentMenuIds',
          required: false
        }
        const incCategory = {
          model: ContentCategory,
          attributes: { exclude: ['deletedAt'] },
          where: categoryFilter,
          as: 'contentCategoryIds',
          required: false
        }
        if (!helper.isEmptyObject(menuFilter)) {
          incMenu.required = true
        }
        if (!helper.isEmptyObject(categoryFilter)) {
          incCategory.required = true
        }
        includes.push(incMenu)
        includes.push(incCategory)
        // }
        response = await Content.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          include: includes,
          distinct: true,
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await Content.findAll({
          where: { isDelete: false },
          order: [['createdAt', 'DESC']]
        })
        res.send(response)
      }
    } catch (err) {
      res.status(500).send({error: err.message})
    }
  },
  async indexAdmin (req, res) {
    let response = null
    try {
      if (!helper.isNullOrWhitespace(req.query.listQuery)) {
        let listQuery = JSON.parse(req.query.listQuery)
        console.log('--------------------------------', listQuery, '------------------------------------------')
        var filter = {}
        filter.isDelete = false
        var categoryFilter = {}
        var menuFilter = {}
        if (!helper.isNullOrWhitespace(listQuery.search.title)) {
          filter.title = {}
          filter.title.$like = `%${listQuery.search.title}%`
        }
        if (!helper.isNullOrWhitespace(listQuery.search.description)) {
          filter.description = {}
          filter.description.$like = `%${listQuery.search.description}%`
        }
        if (!helper.isNullOrEmpty(listQuery.search.categoryIds)) {
          categoryFilter.categoryId = {$in: listQuery.search.categoryIds}
        }
        if (!helper.isNull(listQuery.search.categoryId)) {
          categoryFilter.categoryId = {}
          categoryFilter.categoryId = listQuery.search.categoryId
        }
        if (!helper.isNull(listQuery.search.menuId)) {
          menuFilter.menuId = {}
          menuFilter.menuId = listQuery.search.menuId
        }
        if (listQuery.search.isActive !== undefined && listQuery.search.isActive !== null) {
          filter.isActive = {}
          filter.isActive.$like = listQuery.search.isActive
        }
        if (listQuery.search.isDelete !== undefined && listQuery.search.isDelete !== null) {
          filter.isDelete = {}
          filter.isDelete.$like = listQuery.search.isDelete
        }
        if (listQuery.search.isSpecial !== undefined && listQuery.search.isSpecial !== null) {
          filter.isSpecial = {}
          filter.isSpecial.$like = listQuery.search.isSpecial
        }
        if (listQuery.search.isStopPress !== undefined && listQuery.search.isStopPress !== null) {
          filter.isStopPress = {}
          filter.isStopPress.$like = listQuery.search.isStopPress
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
        const includes = [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
          // { model: Comment, as: 'commentIds', attributes: { exclude: [ 'text', 'author', 'createdAt' ] } }
        ]
        // if (!helper.isEmptyObject(menuFilter)) {
        const incMenu = { model: ContentMenu,
          attributes: { exclude: ['deletedAt'] },
          where: menuFilter,
          as: 'contentMenuIds',
          required: false
        }
        const incCategory = {
          model: ContentCategory,
          attributes: { exclude: ['deletedAt'] },
          where: categoryFilter,
          as: 'contentCategoryIds',
          required: false
        }
        if (!helper.isEmptyObject(menuFilter)) {
          incMenu.required = true
        }
        if (!helper.isEmptyObject(categoryFilter)) {
          incCategory.required = true
        }
        includes.push(incMenu)
        includes.push(incCategory)
        // }
        response = await Content.findAndCountAll({
          where: filter,
          order: [[prop, order]],
          include: includes,
          distinct: true,
          offset: offset,
          limit: limit
        })
        res.send(response)
      } else {
        response = await Content.findAll({
          // attributes: ['id', 'register', 'surname', 'givenName'],
          where: { isDelete: false },
          order: [['createdAt', 'DESC']]
        })
        res.send(response)
      }
    } catch (err) {
      res.status(500).send({error: err.message})
    }
  },
  async post (req, res) {
    let temp // Content
    let newContent
    let files
    let menus
    let response
    let categories
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      temp.isDelete = false
      files = req.body.files
      menus = temp.menuId
      categories = temp.categoryId
      newContent = await Content.create(temp)
      for (const obj of files) {
        const attachment = {}
        attachment.createdBy = 1
        attachment.contentId = newContent.id
        attachment.type = 'Content'
        attachment.name = obj.name
        attachment.storageName = obj.response.response.filename
        attachment.url = obj.url
        attachment.size = obj.size
        attachment.fileType = obj.fileType
        attachment.isActive = true
        attachment.isDelete = false
        await AllFile.create(attachment)
      }
      for (const menu of menus) {
        // console.log(menu, '++++++++++++++++++++++++++++++', ContentMenu)
        const contentMenu = {}
        contentMenu.contentId = newContent.id
        contentMenu.menuId = menu
        contentMenu.isDelete = false
        await ContentMenu.create(contentMenu)
      }
      for (const category of categories) {
        // console.log(menu, '++++++++++++++++++++++++++++++', ContentMenu)
        const contentCategory = {}
        contentCategory.contentId = newContent.id
        contentCategory.categoryId = category
        contentCategory.isDelete = false
        await ContentCategory.create(contentCategory)
      }
      response = await Content.findOne({
        where: { id: newContent.id },
        include: [
          { model: ContentMenu, as: 'contentMenuIds', attributes: { exclude: ['deletedAt'] } },
          { model: ContentCategory, as: 'contentCategoryIds', attributes: { exclude: ['deletedAt'] } },
          //   { model: RefRespond, as: 'respondIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          //   { model: RefStatus, as: 'statusIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
      })
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async update (req, res) {
    let response
    let temp
    let menus
    let categories
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      temp.updatedAt = new Date()
      await AllFile.destroy({where: {contentId: temp.id}})
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
          attachment.contentId = temp.id
          attachment.type = 'Content'
          attachment.storageName = obj.storageName
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
      await ContentMenu.destroy({where: {contentId: temp.id}})
      menus = temp.menuId
      categories = temp.categoryId
      for (const menu of menus) {
        // console.log(menu, '++++++++++++++++++++++++++++++', ContentMenu)
        const contentMenu = {}
        contentMenu.contentId = temp.id
        contentMenu.menuId = menu
        contentMenu.isDelete = false
        await ContentMenu.create(contentMenu)
      }
      await ContentCategory.destroy({where: {contentId: temp.id}})
      for (const category of categories) {
        // console.log(menu, '++++++++++++++++++++++++++++++', ContentMenu)
        const contentCategory = {}
        contentCategory.contentId = temp.id
        contentCategory.categoryId = category
        contentCategory.isDelete = false
        await ContentCategory.create(contentCategory)
      }
      await Content.update(
        {
          updatedAt: new Date(),
          title: temp.title,
          titleEn: temp.titleEn,
          description: temp.description,
          descriptionEn: temp.descriptionEn,
          content: temp.content,
          contentEn: temp.contentEn,
          count: temp.count,
          isSpecial: temp.isSpecial,
          isStopPress: temp.isStopPress,
          isHideComments: temp.isHideComments,
          publishDate: temp.publishDate,
          link: temp.link,
          haveUploadVideo: temp.haveUploadVideo,
          youtubeIframe: temp.youtubeIframe,
          files: temp.files
        },
        { where: { id: temp.id } }
      )
      response = await Content.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: temp.id },
        include: [
          { model: ContentMenu, as: 'contentMenuIds', attributes: { exclude: ['deletedAt'] } },
          { model: ContentCategory, as: 'contentCategoryIds', attributes: { exclude: ['deletedAt'] } },
          //   { model: RefRespond, as: 'respondIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          //   { model: RefStatus, as: 'statusIds', attributes: { exclude: ['deletedAt', 'deletedBy'] } },
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
      })
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async updateSpecial (req, res) {
    let response = null
    let temp = null
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      await Content.update(
        {
          isSpecial: temp.isSpecial
        },
        { where: { id: temp.id } }
      )
      response = await Content.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: temp.id },
        include: [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
      })
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async updateStopPress (req, res) {
    let response = null
    let temp = null
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      await Content.update(
        {
          isStopPress: temp.isStopPress
        },
        { where: { id: temp.id } }
      )
      response = await Content.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: temp.id },
        include: [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
      })
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async manyDestroy (req, res) {
    try {
      for (var i = 0; i < req.body.length; i++) {
        var temp = JSON.parse(JSON.stringify(req.body[i]))
        await Content.update(
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
  },
  async getContentById (req, res) {
    let response = null
    let tempId = null
    try {
      if (!helper.isNull(req.query.id)) {
        tempId = req.query.id
      }
      response = await Content.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: tempId },
        include: [
          { model: ContentMenu, as: 'contentMenuIds', attributes: { exclude: ['deletedAt'] } },
          { model: ContentCategory, as: 'contentCategoryIds', attributes: { exclude: ['deletedAt'] } },
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
      })
      res.send(response)
    } catch (err) {
      // res.status(500).send({
      //   error: err
      // })
    }
  },
  async incrementCount (req, res) {
    let response = null
    let tempId = null
    try {
      if (!helper.isNull(req.query.id)) {
        tempId = req.query.id
      }
      await Content.increment(
        {
          count: +1
        },
        { where: { id: tempId } }
      )
      response = await Content.findOne({
        attributes: { exclude: ['deletedAt', 'deletedBy'] },
        where: { id: tempId },
        include: [
          { model: AllFile, as: 'files', attributes: { exclude: ['deletedAt', 'deletedBy'] } }
        ]
      })
      res.send(response)
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  },
  async manyDeActive (req, res) {
    try {
      for (var i = 0; i < req.body.length; i++) {
        await Content.update({ isActive: false }, { where: { id: req.body[i].id } })
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
        await Content.update({ isActive: true }, { where: { id: req.body[i].id } })
      }
      res.send('success')
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
}
