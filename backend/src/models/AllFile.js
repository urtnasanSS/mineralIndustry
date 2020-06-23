module.exports = (sequelize, DataTypes) => {
  const AllFile = sequelize.define('AllFile', {
    type: DataTypes.STRING, // logo || attachment || ...
    name: DataTypes.STRING,
    storageName: DataTypes.STRING,
    url: DataTypes.STRING,
    fileType: DataTypes.STRING,
    size: DataTypes.INTEGER,
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isActive: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  AllFile.associate = function (models) {
    AllFile.belongsTo(models.InquiryCivil, {foreignKey: {name: 'inquiryCivilId', allowNull: true}})
    AllFile.belongsTo(models.InquiryOrganization, {foreignKey: {name: 'inquiryOrganizationId', allowNull: true}})
    AllFile.belongsTo(models.Banner, {foreignKey: {name: 'bannerId', allowNull: true}})
    AllFile.belongsTo(models.Slide, {foreignKey: {name: 'slideId', allowNull: true}})
    AllFile.belongsTo(models.Links, {foreignKey: {name: 'linksId', allowNull: true}})
    AllFile.belongsTo(models.Menu, {foreignKey: {name: 'menuId', allowNull: true}})
    AllFile.belongsTo(models.Content, {foreignKey: {name: 'contentId', allowNull: true}})
    AllFile.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}, as: 'createdUser'})
    AllFile.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}, as: 'updatedUser'})
    AllFile.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}, as: 'deletedUser'})
  }

  return AllFile
}
