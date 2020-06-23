module.exports = (sequelize, DataTypes) => {
  const MenuViewType = sequelize.define('MenuViewType', {
    code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
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
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  MenuViewType.associate = function (models) {
    // MenuViewType.hasMany(models.User, {foreignKey: 'organizationId'})
    // MenuViewType.hasMany(models.InquiryCivil, {foreignKey: 'organizationId'})
    // MenuViewType.hasMany(models.InquiryOrganization, {foreignKey: 'organizationId'})
    // MenuViewType.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}})
    // MenuViewType.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}})
    // MenuViewType.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}})
    MenuViewType.hasMany(models.Menu, { foreignKey: 'menuViewTypeId', as: 'menuViewTypeIds' })
  }

  return MenuViewType
}
