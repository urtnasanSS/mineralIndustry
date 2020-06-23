module.exports = (sequelize, DataTypes) => {
  const Faqs = sequelize.define(
    'Faqs',
    {
      answer: DataTypes.TEXT,
      answerEn: DataTypes.TEXT,
      question: DataTypes.TEXT,
      questionEn: DataTypes.TEXT,
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
  Faqs.associate = function (models) {
    //   Faqs.belongsTo(models.RefRespond, {foreignKey: {name: 'respondId', allowNull: false}, as: 'respondIds'})
    //   Faqs.belongsTo(models.RefStatus, {foreignKey: {name: 'statusId', allowNull: false}, as: 'statusIds'})
    //   Faqs.belongsTo(models.User, {foreignKey: {name: 'createdBy', allowNull: false}, as: 'createdUser'})
    //   Faqs.belongsTo(models.User, {foreignKey: {name: 'updatedBy', allowNull: true}, as: 'updatedUser'})
    //   Faqs.belongsTo(models.User, {foreignKey: {name: 'deletedBy', allowNull: true}, as: 'deletedUser'})
    // Faqs.hasMany(models.AllFile, {foreignKey: 'FaqsId', as: 'files'})
  }
  return Faqs
}
