module.exports = (sequelize, DataTypes) => {
  const MenuType = sequelize.define('MenuType', {
    name: DataTypes.STRING(50),
    code: {
      type: DataTypes.STRING(20),
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
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  MenuType.associate = function (models) {
    MenuType.hasMany(models.Menu, { foreignKey: 'menuTypeId', as: 'menuTypeIds' })
  }
  return MenuType
}
