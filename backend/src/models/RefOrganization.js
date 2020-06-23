module.exports = (sequelize, DataTypes) => {
  const RefOrganization = sequelize.define('RefOrganization', {
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
    deletedAt: DataTypes.DATE
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  RefOrganization.associate = function (models) {
    // RefOrganization.hasMany(models.User, {foreignKey: 'organizationId'})
    // RefOrganization.hasMany(models.InquiryCivil, {foreignKey: 'organizationId'})
    // RefOrganization.hasMany(models.InquiryOrganization, {foreignKey: 'organizationId'})
    // RefOrganization.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}})
    // RefOrganization.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}})
    // RefOrganization.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}})
  }

  return RefOrganization
}
