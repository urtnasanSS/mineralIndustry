module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define(
    'Banner',
    {
      name: DataTypes.STRING(100),
      link: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    },
    { charset: 'utf8', collate: 'utf8_unicode_ci' }
  )
  Banner.associate = function (models) {
    Banner.belongsTo(models.BannerType, {foreignKey: { name: 'bannerTypeId', allowNull: false }, as: 'bannerTypeIds'})
    Banner.hasMany(models.AllFile, {foreignKey: 'bannerId', as: 'files'})
  }
  return Banner
}
