module.exports = (sequelize, DataTypes) => {
  const webButton = sequelize.define('webButton', {
    name: DataTypes.STRING(50),
    link: DataTypes.STRING(500),
    icon: DataTypes.STRING(50),
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
  return webButton
}
