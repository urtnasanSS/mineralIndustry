module.exports = (sequelize, DataTypes) => {
  const RefStatus = sequelize.define('RefStatus', {
    code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  RefStatus.associate = function (models) {
    RefStatus.hasMany(models.InquiryCivil, {foreignKey: 'statusId'})
    RefStatus.hasMany(models.InquiryOrganization, {foreignKey: 'statusId'})
    // RefStatus.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}})
    // RefStatus.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}})
    // RefStatus.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}})
  }

  return RefStatus
}
