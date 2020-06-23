module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      name: DataTypes.TEXT,
      code: DataTypes.TEXT,
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
  Role.associate = function (models) {
    // Role.hasMany(models.User, { foreignKey: 'roleId', as: 'roleIds' })
  }
  return Role
}
