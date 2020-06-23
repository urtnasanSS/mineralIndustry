const {
  sequelize,
  User,
  AimagCity,
  BagKhoroo,
  SoumDistrict,
  RefAimagCity,
  RefSoumDistrict
} = require('../src/models')

const users = require('./users.json')
const aimagCities = require('./aimagCities.json')
const soumDistricts = require('./soumDistricts.json')
const bagKhoroos = require('./bagKhoroos.json')

sequelize.sync({
    force: true
  })
  .then(async function () {
    await Promise.all(
      aimagCities.map(aimagCity => {
        AimagCity.create(aimagCity)
      }),
      soumDistricts.map(soumDistrict => {
        SoumDistrict.create(soumDistrict)
      }),
      bagKhoroos.map(bagKhoroo => {
        BagKhoroo.create(bagKhoroo)
      }),
      users.map(user => {
        User.create(user)
      }),
      aimagCities.map(aimagCity => {
        RefAimagCity.create(aimagCity)
      }),
      soumDistricts.map(soumDistrict => {
        RefSoumDistrict.create(soumDistrict)
      })
    )
  })
  