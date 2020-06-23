const {AllFile} = require('../../models')
const fs = require('fs')
const util = require('util')
const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)
const directory = 'uploads'
var self = module.exports = {
  async deleteOne (req, res) {
    try {
      console.log('attachment => deleteOne', req.body)
      for (var i = 0; i < req.body.length; i++) {
        await self.removeFile(req.body[i])
        await AllFile.destroy({ where: { id: req.body[i] } })
      }
      res.send({success: true})
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  async removeFile (allFIleId) {
    try {
      const temp = await AllFile.findOne({
        where: { id: allFIleId }
      })
      // console.log('temp', temp)/
      const files = await readdir(directory)
      const unlinkPromises = files.map(filename => unlink(`${directory}/${temp.storageName}`))
      // console.log('unlinkPromises', unlinkPromises)
      await Promise.all(unlinkPromises)
    } catch (err) {
      console.log(err)
    }
  }
}
