module.exports = (sequelize, DataTypes) => {
  const ContentCategory = sequelize.define('ContentCategory', {
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  ContentCategory.associate = function (models) {
    ContentCategory.belongsTo(models.Content, {foreignKey: {name: 'contentId', allowNull: false}, as: 'contentCategoryIds'})
    ContentCategory.belongsTo(models.Category, {foreignKey: {name: 'categoryId', allowNull: false}, as: 'categoryIds'})
  }
  return ContentCategory
}
