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
        ((SELECT Count(3) FROM banners))
        as '2',
        ((SELECT Count(4) FROM slides))
        as '3',
        ((SELECT Count(5) FROM links))
        as '4',
        ((SELECT Count(6) FROM addresses))
        as '5',
        ((SELECT Count(7) FROM menus  WHERE menuTypeId = 1))
        as '6',
        ((SELECT Count(8) FROM menus  WHERE menuTypeId > 1))
        as '7',
        ((SELECT Count(9) FROM faqs))
        as '8',
        ((SELECT Count(10) FROM comments))
        as '9'
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }

      )
      res.send(response)
    } catch (err) {
    }
  }
}
