module.exports = (sequelize, DataTypes) => {
  const ContentMenu = sequelize.define('ContentMenu', {
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  ContentMenu.associate = function (models) {
    ContentMenu.belongsTo(models.Content, {foreignKey: {name: 'contentId', allowNull: false}, as: 'contentMenuIds'})
    ContentMenu.belongsTo(models.Menu, {foreignKey: {name: 'menuId', allowNull: false}, as: 'menuIds'})
  }
  return ContentMenu
}
