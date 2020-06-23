module.exports = (sequelize, DataTypes) => {
  const InquiryOrganization = sequelize.define('InquiryOrganization', {
    register: DataTypes.STRING(10),
    name: DataTypes.STRING(50),
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
  InquiryOrganization.associate = function (models) {
    InquiryOrganization.belongsTo(models.RefRespond, {foreignKey: {name: 'respondId', allowNull: false}, as: 'respondIds'})
    InquiryOrganization.belongsTo(models.RefStatus, {foreignKey: {name: 'statusId', allowNull: false}, as: 'statusIds'})
    InquiryOrganization.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}, as: 'createdUser'})
    InquiryOrganization.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}, as: 'updatedUser'})
    InquiryOrganization.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}, as: 'deletedUser'})
    InquiryOrganization.hasMany(models.AllFile, {foreignKey: 'inquiryOrganizationId', as: 'files'})
  }
  return InquiryOrganization
}
