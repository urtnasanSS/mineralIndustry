module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    'Content',
    {
      title: DataTypes.TEXT,
      titleEn: DataTypes.TEXT,
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      descriptionEn: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      contentEn: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      youtubeIframe: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      haveUploadVideo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isSpecial: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isStopPress: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isHideComments: {
        type: DataTypes.BOOLEAN
      },
      publishDate: DataTypes.DATE,
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
  Content.associate = function (models) {
    Content.hasMany(models.AllFile, {foreignKey: 'contentId', as: 'files'})
    Content.hasMany(models.Comment, {foreignKey: 'contentId', as: 'commentIds'})
    Content.hasMany(models.ContentMenu, {foreignKey: 'contentId', as: 'contentMenuIds'})
    Content.hasMany(models.ContentCategory, {foreignKey: 'contentId', as: 'contentCategoryIds'})
  }
  return Content
}
