module.exports = (sequelize, DataTypes) => {
  const RefRespond = sequelize.define('RefRespond', {
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
  RefRespond.associate = function (models) {
    RefRespond.hasMany(models.InquiryCivil, {foreignKey: 'respondId'})
    RefRespond.hasMany(models.InquiryOrganization, {foreignKey: 'respondId'})
    // RefRespond.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}})
    // RefRespond.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}})
    // RefRespond.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}})
  }

  return RefRespond
}
