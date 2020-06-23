module.exports = (sequelize, DataTypes) => {
  const LogRequest = sequelize.define('LogRequest', {
    IpAddress: DataTypes.STRING
  }, {charset: 'utf8', collate: 'utf8_unicode_ci'})
  LogRequest.associate = function (models) {}
  return LogRequest
}
