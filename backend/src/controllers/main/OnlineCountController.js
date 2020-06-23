const { OnlineCount } = require('../../models')
// ContentMenu
// ContentType
module.exports = {
  async index (req, res) {
    let response = null
    let listQuery
    try {
      listQuery = JSON.parse(req.query.listQuery)
      console.log(listQuery, 'response----------------------3 ')
      let limit = parseInt(listQuery.limit) || 10
      let offset = ((parseInt(listQuery.currentPage) || 1) - 1) * limit
      const prop = listQuery.sort.prop || 'createdAt'
      let order = listQuery.sort.order || 'descending'
      order = order === 'descending' ? 'ASC' : 'DESC'
      response = await OnlineCount.findAndCountAll({
        order: [[prop, order]],
        limit: limit,
        offset: offset
      })
      res.send(response)
    } catch (err) {
      console.log(err)
      // res.status(500).send({
      //   error: err
      // })
    }
  },
  async incrementCount (req, res) {
    let temp
    var moment = require('moment')
    let before
    try {
      temp = JSON.parse(JSON.stringify(req.body))
      var filter = {}
      filter.createdAt = {}
      const result1 = moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD')
      const result2 = moment(moment(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD').add(1, 'days')
      // console.log('date---------', result1.toDate(), result2.toDate())
      before = await OnlineCount.findAndCountAll({
        where: {
          createdAt: {
            $between: [result1.toDate(), result2.toDate()]
          }
        }
      })
      // console.log('before---------', before)
      if (before.count > 0) {
        OnlineCount.increment(
          {
            count: +1
          },
          { where: {id: before.rows[0].dataValues.id} }
        )
      } else {
        temp.count = 1
        await OnlineCount.create(temp)
      }
      // OnlineCount.count(
      //   {
      //     count: +1
      //   },
      //   { where: { id: 1 } }
      // )
      // const TimeType = moment(before.OnlineCount).format('YYYY-MM-DD')
      // console.log('------------------alright', TimeType, 'alright-----------------')
      // console.log('-------------------------thisalldata-------------------------------------', before, '-------------------------thisalldata-------------------------------------')
      // ognoogoor shuune.
      // oldogui gevel insert.
      // oldloo gevel update.
      // zovhon 2019-09-12 format-r shuune.
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  }
}
