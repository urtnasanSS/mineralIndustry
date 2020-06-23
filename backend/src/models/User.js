const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      console.log(hash, 'encrypted')
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    register: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    surName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    givenName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  },
  {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword// ,
      // beforeSave: hashPassword
    }
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  User.associate = function (models) {
    User.belongsTo(models.RefPermissionType, {foreignKey: 'permissionTypeId'})
    // User.belongsTo(models.Role, {foreignKey: { name: 'roleId', allowNull: false }, as: 'roleIds'})
  }
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User
}
