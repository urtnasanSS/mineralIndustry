module.exports = (sequelize, DataTypes) => {
  const InquiryCivil = sequelize.define('InquiryCivil', {
    register: DataTypes.STRING(10),
    surname: DataTypes.STRING(50),
    givenName: DataTypes.STRING(50),
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
  InquiryCivil.associate = function (models) {
    InquiryCivil.belongsTo(models.RefRespond, {foreignKey: {name: 'respondId', allowNull: false}, as: 'respondIds'})
    InquiryCivil.belongsTo(models.RefStatus, {foreignKey: {name: 'statusId', allowNull: false}, as: 'statusIds'})
    InquiryCivil.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}, as: 'createdUser'})
    InquiryCivil.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}, as: 'updatedUser'})
    InquiryCivil.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}, as: 'deletedUser'})
    InquiryCivil.hasMany(models.AllFile, {foreignKey: 'inquiryCivilId', as: 'files'})
  }
  return InquiryCivil
}
