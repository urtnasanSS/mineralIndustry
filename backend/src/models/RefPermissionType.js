module.exports = (sequelize, DataTypes) => {
  const RefPermissionType = sequelize.define('RefPermissionType', {
    code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  RefPermissionType.associate = function (models) {
    RefPermissionType.hasMany(models.User, {foreignKey: 'permissionTypeId'})
    // RefPermissionType.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}})
    // RefPermissionType.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}})
    // RefPermissionType.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}})
  }

  return RefPermissionType
}
