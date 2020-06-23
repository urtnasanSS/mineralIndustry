// const {SystemErrorMessages, OtherSystemLogin} = require('../schemaModels')
const CustomError = require('./CustomError')
module.exports = {
  // saveError (obj) {
  //   try {
  //     var newItem = new SystemErrorMessages(obj)
  //     newItem.save()
  //   } catch (err) {
  //     console.error(err)
  //   }
  // },
  // saveErrorEService (req, res, err) {
  //   var newItem = new SystemErrorMessages(err)
  //   newItem.save()
  // },
  saveErrorAndSend (req, res, err) {
    if (err instanceof CustomError) {
      return res.status(403).send({ error: err.toString() })
    } else {
      console.log('saveErrorAndSend', err.lineNumber, '******:', err)
      let user = null
      if (req.userKey !== undefined && req.userKey !== null) {
        user = req.userKey._id
      }
      var errSend = {
        'userId': user,
        'actionType': req.method,
        'workingUrl': req.protocol + '://' + req.get('host') + req.originalUrl,
        'errorMessage': err.stack ? err.stack : err.message,
        'errorDate': new Date(),
        'body': req.body
      }
      this.saveError(errSend)
      return res.status(500).send({error: err.lineNumber ? res.t('system.error') : [err.message]})
    }
  }
  // ,
  // saveSystemsLogin (uk, apiKey, infos, desc) {
  //   var newItem = new OtherSystemLogin({userKeyId: uk, systemId: apiKey, userInfo: infos, description: desc})
  //   newItem.save()
  // }
}
