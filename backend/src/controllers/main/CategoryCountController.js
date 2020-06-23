const sequelize = require('../../models').sequelize

module.exports = {
  async index (req, res) {
    let response
    try {
      response = await sequelize.query(
        `
        SELECT
        ((SELECT Count(1) FROM contentcategories WHERE categoryId = 8 AND isDelete = 0))
        as '0',
        ((SELECT Count(1) FROM contentcategories WHERE categoryId = 7 AND isDelete = 0))
        as '1',
        ((SELECT Count(1) FROM contentcategories WHERE categoryId = 4 AND isDelete = 0))
        as '2',
        ((SELECT Count(1) FROM contentcategories WHERE categoryId = 3 AND isDelete = 0))
        as '3',
        ((SELECT Count(1) FROM contentcategories WHERE categoryId = 2 AND isDelete = 0))
        as '4',
        ((SELECT Count(1) FROM contentcategories WHERE categoryId = 1 AND isDelete = 0))
        as '5'
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      res.send(response)
    } catch (err) {
    }
  }
}
