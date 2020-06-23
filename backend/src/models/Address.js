module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      nameEn: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      Fax: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      facebook: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      Email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      iframe: {
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
      },
      deletedAt: DataTypes.DATE
    },
    { charset: 'utf8', collate: 'utf8_unicode_ci' }
  )
  return Address
}
