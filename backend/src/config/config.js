module.exports = {
  port: process.env.PORT || 8090,
  db: {
    database: process.env.DB_NAME || 'mpetro',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Ho0lahan',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST ? process.env.HOST.trim() : 'http://mpetro.smartsolution.mn'
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
