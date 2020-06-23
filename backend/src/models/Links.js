module.exports = (sequelize, DataTypes) => {
  const Links = sequelize.define(
    'Links',
    {
      name: DataTypes.STRING(100),
      nameEn: DataTypes.STRING(100),
      link: {
        type: DataTypes.STRING(100),
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
  Links.associate = function (models) {
    //   Links.belongsTo(models.RefRespond, {foreignKey: {name: 'respondId', allowNull: false}, as: 'respondIds'})
    //   Links.belongsTo(models.RefStatus, {foreignKey: {name: 'statusId', allowNull: false}, as: 'statusIds'})
    //   Links.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}, as: 'createdUser'})
    //   Links.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}, as: 'updatedUser'})
    //   Links.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}, as: 'deletedUser'})
    Links.hasMany(models.AllFile, {foreignKey: 'linksId', as: 'files'})
  }
  return Links
}
