module.exports = (sequelize, DataTypes) => {
  const Slide = sequelize.define('Slide', {
    name: DataTypes.STRING(50),
    description: {
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
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  Slide.associate = function (models) {
    Slide.hasMany(models.AllFile, {foreignKey: 'slideId', as: 'files'})
  }
  return Slide
}
