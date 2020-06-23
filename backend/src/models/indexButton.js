module.exports = (sequelize, DataTypes) => {
  const indexButton = sequelize.define(
    'indexButton',
    {
      name: DataTypes.STRING(50),
      icon: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      link: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      deletedAt: DataTypes.DATE
    },
    { charset: 'utf8', collate: 'utf8_unicode_ci' }
  )
  return indexButton
}
