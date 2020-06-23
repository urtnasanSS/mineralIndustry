module.exports = (sequelize, DataTypes) => {
  const BannerType = sequelize.define(
    'BannerType',
    {
      name: DataTypes.STRING(50),
      code: {
        type: DataTypes.STRING(20),
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
  BannerType.associate = function (models) {
    BannerType.hasMany(models.Banner, { foreignKey: 'bannerTypeId', as: 'bannerTypeIds' })
  }
  return BannerType
}
