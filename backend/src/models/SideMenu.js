module.exports = (sequelize, DataTypes) => {
  const SideMenu = sequelize.define('SideMenu', {
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
  return SideMenu
}
