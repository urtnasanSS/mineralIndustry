const passport = require('passport')
const {User, RefPermissionType} = require('./models')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('./config/config')

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async function (jwtPayload, done) {
    try {
      const user = await User.findOne({
        where: {
          id: jwtPayload.id
        },
        include: [
          { model: RefPermissionType }
        ]
      })
      if (!user) {
        return done(new Error(), false)
      }
      return done(null, user)
    } catch (err) {
      console.log(err)
      return done(new Error(), false)
    }
  })
)

module.exports = null
