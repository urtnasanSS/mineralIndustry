const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
require('sequelize-hierarchy')(Sequelize)
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
  config.db.define,
  config.db.pool
)

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
setInterval(function () {
  sequelize.query('SELECT SLEEP(1);')
}, 20000)
module.exports = db
