module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: DataTypes.TEXT,
    nameEn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sortOrder: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isRedirect: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    disabled: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return false
      }
    },
    selected: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return false
      }
    },
    hide: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return true
      }
    },
    deletedAt: DataTypes.DATE
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  Menu.associate = function (models) {
    Menu.belongsTo(models.MenuViewType, {foreignKey: { name: 'menuViewTypeId', allowNull: false }, as: 'menuViewTypeIds'})
    Menu.belongsTo(models.MenuType, {foreignKey: { name: 'menuTypeId', allowNull: false }, as: 'menuTypeIds'})
    Menu.hasMany(models.Menu, {foreignKey: { name: 'parentId', allowNull: false }, as: 'children'})
    Menu.hasMany(models.AllFile, {foreignKey: 'menuId'})
    Menu.hasMany(models.ContentMenu, {foreignKey: 'menuId'})
  }
  return Menu
}
