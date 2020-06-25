module.exports = {
  port: process.env.PORT || 8083,
  db: {
    database: process.env.DB_NAME || 'uulUurhai',
    user: process.env.DB_USER || 'archive',
    password: process.env.DB_PASS || 'Qwerty123@',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST ? process.env.HOST.trim() : '192.168.0.116'
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      timestamps: true
    },
    pool: {
      maxConnections: 100,
      maxIdleTime: 20000
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
