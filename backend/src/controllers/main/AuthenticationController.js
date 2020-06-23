const {User, RefPermissionType} = require('../../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async login (req, res) {
    try {
      const {userName, password} = req.body
      console.log(userName)
      console.log(password)
      const user = await User.findOne({
        where: {
          userName: userName,
          isActive: true
        },
        include: [
          {model: RefPermissionType}
        ]
      })
      if (!user) {
        return res.status(403).send({
          error: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Алдаа гарлаа. Түр хүлээж байгаад дахин нэвтэрнэ үү'
      })
    }
  },
  async changePassword (req, res) {
    try {
      console.log('==========changePassword============')
      const oldPassword = req.body.oldPassword
      const newPassword = req.body.newPassword
      const user = await User.findOne({
        where: {
          id: req.user.id,
          isActive: true
        }
      })

      console.log('==========1============')
      console.log(req.body)
      if (!user) {
        return res.status(403).send({
          error: 'Хэрэглэгч олдсонгүй'
        })
      }

      console.log('==========2============')
      console.log(oldPassword)
      const isPasswordValid = await user.comparePassword(oldPassword)
      console.log(isPasswordValid)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Хуучин нууц үг буруу байна'
        })
      }
      console.log('==========3============')
      const SALT_FACTOR = 8
      const hash = await bcrypt.genSaltAsync(SALT_FACTOR).then(salt => bcrypt.hashAsync(newPassword, salt, null))
      await User.update({password: hash}, {
        where: {
          id: user.id
        }
      })
      res.send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Алдаа гарлаа. Түр хүлээж байгаад дахин оролдоно уу'
      })
    }
  },
  async show (req, res) {
    try {
      // Login hiigeed Refresh hiihed ene duudagdaj bga
      const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.user.id
        },
        include: [
          {model: RefPermissionType}
        ]
      })
      res.send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  }
}
