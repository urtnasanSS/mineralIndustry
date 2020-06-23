module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING(50),
    nameEn: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: true
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
  Category.associate = function (models) {
    Category.hasMany(models.ContentMenu, { foreignKey: 'categoryId' })
  }
  return Category
}
