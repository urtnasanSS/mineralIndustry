module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    author: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  Comment.associate = function (models) {
    Comment.belongsTo(models.Content, {foreignKey: 'contentId'})
  }
  return Comment
}
