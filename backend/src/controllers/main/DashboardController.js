const sequelize = require('../../models').sequelize
const helper = require('../../utils/Helper')
module.exports = {
  /**
   * Иргэн, Байгууллага эзлэх хувь
   */
  async civilAndOrganizationPercent (req, res) {
    let response = {}
    var filter = ''
    try {
      if (req.query.listQuery !== undefined && req.query.listQuery !== null && req.query.listQuery !== undefined) {
        let listQuery = JSON.parse(req.query.listQuery)
        console.log('----listQuery-----', listQuery)
        if (!helper.isNull(listQuery.filterDate) && listQuery.filterDate.length === 2) {
          var result = new Date(listQuery.filterDate[1])
          var result0 = new Date(listQuery.filterDate[0])
          result.setDate(result.getDate() + 1)
          filter = ` AND updatedAt BETWEEN '` + result0 + `' AND '` + result + `'`
        }
      }
      response = await sequelize.query(
        `
        SELECT 
        ((SELECT COUNT(1) FROM InquiryCivils WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `) 
          / 
        ((SELECT COUNT(1) FROM InquiryCivils WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `) + (SELECT COUNT(1) FROM InquiryOrganizations WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `))) 
          * 100 AS civilPercent,
        (SELECT COUNT(1) FROM InquiryCivils WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `) AS civilCount,
        ((SELECT COUNT(1) FROM InquiryOrganizations WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `) 
          / 
        ((SELECT COUNT(1) FROM InquiryCivils WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `) + (SELECT COUNT(1) FROM InquiryOrganizations WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `))) 
          * 100 AS organizationPercent,
        (SELECT COUNT(1) FROM InquiryOrganizations WHERE isDelete = false AND isActive = true AND ((statusId = 3) AND (respondId = 3 OR respondId = 4))` + filter + `) AS organizationCount
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  /**
   * Иргэн, байгууллагын хариу авсан хэлбэр
   */
  async civilAndOrganizationReply (req, res) {
    let response = {}
    var filter = ''
    try {
      console.log('----civilAndOrganizationReply-----')
      if (req.query.listQuery !== undefined && req.query.listQuery !== null && req.query.listQuery !== undefined) {
        let listQuery = JSON.parse(req.query.listQuery)
        console.log('----listQuery-----', listQuery)
        if (!helper.isNull(listQuery.filterDate) && listQuery.filterDate.length === 2) {
          var result = new Date(listQuery.filterDate[1])
          var result0 = new Date(listQuery.filterDate[0])
          result.setDate(result.getDate() + 1)
          filter = ` AND c.updatedAt BETWEEN '` + result0 + `' AND '` + result + `'`
        }
      }
      response.civil = {}
      response.civil = await sequelize.query(
        `
        SELECT 
          rr.id, rr.name, COUNT(rr.id) AS count
        FROM InquiryCivils AS c
        INNER JOIN RefResponds AS rr ON c.respondId = rr.id
        WHERE ((c.respondId = 3) OR (c.respondId = 4)) AND c.isDelete = false AND c.isActive = true` + filter + `
        GROUP BY rr.id
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      response.organization = {}
      response.organization = await sequelize.query(
        `
        SELECT 
          rr.id, rr.name, COUNT(rr.id) AS count
        FROM InquiryOrganizations AS c
        INNER JOIN RefResponds AS rr ON c.respondId = rr.id
        WHERE ((c.respondId = 3) OR (c.respondId = 4)) AND c.isDelete = false AND c.isActive = true` + filter + `
        GROUP BY rr.id
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  /**
   * Лавлагаа авахаар илгээж буй банк
   */
  async refSendBankLine (req, res) {
    let response = {}
    var filter = ''
    try {
      console.log('----civilAndOrganizationReply-----')
      if (req.query.listQuery !== undefined && req.query.listQuery !== null && req.query.listQuery !== undefined) {
        let listQuery = JSON.parse(req.query.listQuery)
        console.log('----listQuery-----', listQuery)
        if (!helper.isNull(listQuery.filterDate) && listQuery.filterDate.length === 2) {
          var result = new Date(listQuery.filterDate[1])
          var result0 = new Date(listQuery.filterDate[0])
          result.setDate(result.getDate() + 1)
          filter = ` AND updatedAt BETWEEN '` + result0 + `' AND '` + result + `'`
        }
      }
      response = await sequelize.query(
        `
        SELECT 
          o.id, o.name,
          (SELECT COUNT(1) FROM InquiryCivils WHERE organizationId = o.id AND ((respondId = 3) OR (respondId = 4))` + filter + `) 
          +
          (SELECT COUNT(1) FROM InquiryOrganizations WHERE organizationId = o.id AND ((respondId = 3) OR (respondId = 4))` + filter + `) AS count
        FROM RefOrganizations AS o
        GROUP BY o.id;
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  },
  /**
   * Лавлагаа авахаар илгээж буй банк доторх иргэн байгууллагаар харах
   */
  async refSendBankBar (req, res) {
    let response = {}
    var filter = ''
    try {
      console.log('----civilAndOrganizationReply-----')
      if (req.query.listQuery !== undefined && req.query.listQuery !== null && req.query.listQuery !== undefined) {
        let listQuery = JSON.parse(req.query.listQuery)
        console.log('----listQuery-----', listQuery)
        if (!helper.isNull(listQuery.filterDate) && listQuery.filterDate.length === 2) {
          var result = new Date(listQuery.filterDate[1])
          var result0 = new Date(listQuery.filterDate[0])
          result.setDate(result.getDate() + 1)
          filter = ` AND updatedAt BETWEEN '` + result0 + `' AND '` + result + `'`
        }
      }
      response = await sequelize.query(
        `
        SELECT 
          o.id, o.name,
          (SELECT COUNT(1) FROM InquiryCivils WHERE organizationId = o.id AND ((respondId = 3) OR (respondId = 4))` + filter + `) 
          +
          (SELECT COUNT(1) FROM InquiryOrganizations WHERE organizationId = o.id AND ((respondId = 3) OR (respondId = 4))` + filter + `) AS count
        FROM RefOrganizations AS o
        GROUP BY o.id;
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      response = await sequelize.query(
        `
        SELECT 
          o.id, o.name,
          (SELECT COUNT(1) FROM InquiryCivils WHERE organizationId = o.id AND ((respondId = 3) OR (respondId = 4))` + filter + `) AS civilCount,
          (SELECT COUNT(1) FROM InquiryOrganizations WHERE organizationId = o.id AND ((respondId = 3) OR (respondId = 4))` + filter + `) AS organiationCount
        FROM RefOrganizations AS o
        GROUP BY o.id;
        `,
        { replacements: { }, type: sequelize.QueryTypes.SELECT }
      )
      res.send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: err
      })
    }
  }
}
