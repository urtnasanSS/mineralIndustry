module.exports = (sequelize, DataTypes) => {
  const OnlineCount = sequelize.define(
    'OnlineCount',
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { charset: 'utf8', collate: 'utf8_unicode_ci' }
  )
  return OnlineCount
}
