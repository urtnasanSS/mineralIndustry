// const { Banner, MenuCount, Slide } = require('../../models')
const sequelize = require('../../models').sequelize

module.exports = {
  async index (req, res) {
    let response = {}
    try {
      response = await sequelize.query(
        `
        SELECT
        ((SELECT Count(1) FROM contents))
        as '0',
        ((SELECT Count(2) FROM categories))
        as '1',
        ((SELECT Count(3) FROM addresses))
        as '2',
        ((SELECT Count(4) FROM menus  WHERE menuTypeId = 1))
        as '3',
        ((SELECT Count(5) FROM comments))
        as '4'
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }

      )
      res.send(response)
    } catch (err) {
    }
  }
}
