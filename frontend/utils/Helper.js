// import moment from 'moment'
// import axios from 'axios'
import { Message } from 'element-ui'
const ObjectID = require('bson-objectid')
export function isObjectID(val) {
  return ObjectID.isValid(val)
}
export function uniqueId () {
  return '_' + Math.random().toString(36).substr(2, 9)
}
export function isNull (value) {
  return value === undefined || value === null
}
export function isNullOrEmpty (values) {
  return isNull(values) || values.length === 0
}
export function isNullOrWhitespace (value) {
  return isNull(value) || value.trim() === ''
}
export function getRouteTitles (name, vue) {
  let titles = []
  for (const menu of vue.$store.state.menuDatas) {
    if (
      menu.items !== null &&
      menu.items !== undefined &&
      menu.items.length > 0
    ) {
      for (const item of menu.items) {
        if (item.name === name) {
          titles = [menu.title, `<span> / ${item.title}</span>`]
          break
        }
      }
    } else if (menu.name === name) {
      titles = [`<span>${menu.title}</span>`]
      break
    }
  }
  return titles
}
export function downloadExcel (
  name,
  headers,
  lq,
  headerText,
  subLabel,
  subText
) {
  const listQuery = Object.assign(
    {
      columns: [],
      headerText,
      subLabel,
      subText
    },
    lq
  )
  for (const header of headers) {
    listQuery.columns.push({
      header: header.text,
      key: header.value,
      width: 10,
      hidden: false
    })
  }
  // const response = await axios.create({responseType: 'blob'}).get(`/api/executeQueryExcel/${name}`, { params: {listQuery}})
  // var url = URL.createObjectURL(response.data)
  // downloadURI(url, moment().format('YYYYMMDDHHmm') + '.xlsx')
}
export function viewPdf (departmentCode, documentRegId) {
  // const response = await axios.create({responseType: 'blob'}).get(`/api/executePdf`, { params: {folderName: departmentCode, fileName: documentRegId} })
  // var url = URL.createObjectURL(response.data)
  viewURI(
    `/api/executePdf?folderName=${departmentCode}&fileName=${documentRegId}`
  )
}

function viewURI (uri) {
  const link = document.createElement('a')
  // link.download = name
  link.target = '_blank'
  link.href = uri
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// function downloadURI(uri, name) {
//   var link = document.createElement("a")
//   link.download = name
//   link.href = uri
//   document.body.appendChild(link)
//   link.click()
//   document.body.removeChild(link)
// }
export function strip (html) {
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.textContent || ''
}
export function numberFormat (value, fixed) {
  if (isNaN(value)) {
    return value
  }
  if (fixed) {
    return value.toFixed(fixed).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  } else {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export function date2str (x, y) {
  /* eslint-disable */
  var z = {
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds()
  };
  y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
    return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
  })
  return y.replace(/(y+)/g, function (v) {
    return x.getFullYear().toString().slice(-v.length)
  })
  /* eslint-enable */
}
export function getKeyAttributeValue (item, value) {
  for (const key in item) {
    if (key === value) {
      return item[key]
    }
  }
  return null
}

function isObject (item) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null
}
const removeAttributes = [
  'createdOrganizationId',
  'createdBy',
  'createdAt',
  'modifiedOrganizationId',
  'modifiedBy',
  'modifiedAt',
  '__v',
  'deleted',
  'isChanged'
]
let removeCustomAtts = []
export function removeAtts (datas, removeAtts) {
  if (!isNull(removeAtts)) {
    removeCustomAtts = removeAtts
  } else {
    removeCustomAtts = []
  }
  if (Array.isArray(datas)) {
    removeArray(datas)
  } else if (isObject(datas)) {
    removeObject(datas)
  }
}
export function newId() {
  return ObjectID.generate()
}
function removeObject (datas) {
  for (const data in datas) {
    if (removeAttributes.includes(data) || removeCustomAtts.includes(data)) {
      delete datas[data]
    } else if (Array.isArray(datas[data])) {
      removeArray(datas[data])
    } else if (isObject(datas[data])) {
      removeObject(datas[data])
    }
  }
}

function removeArray (datas) {
  if (datas == null || datas.length === 0) {
    return
  }
  for (let i = 0; i < datas.length; i++) {
    if (Array.isArray(datas[i])) {
      removeArray(datas[i])
    } else if (isObject(datas[i])) {
      removeObject(datas[i], true)
    }
  }
}
export function validateShowMessage (fields, vue, reg) {
  let message =
    '<p style="line-height: 20px; margin-left: -5px;">Дараах алдааг арилгана уу.</p><ul style="margin:0px;-webkit-margin-before: 0px;-webkit-margin-after: 0px;-webkit-margin-start: 15px; -webkit-margin-end: 0px; -webkit-padding-start: 0px; list-style-type: circle;">'
  for (const field in fields) {
    for (const data of fields[field]) {
      console.log(data, 'data')
      message =
        message +
        '<li style="line-height: 20px;">' +
        (!isNull(reg)
          ? '<strong>' + reg + '.' + data.field + ' </strong>'
          : '') +
        data.message +
        '</li>'
    }
  }
  message = message + '</ul>'
  Message({
    dangerouslyUseHTMLString: true,
    type: 'warning',
    message,
    duration: 5000,
    showClose: true
  })
}
export function checkValidSub (tempList, formName, vue, reg) {
  let isValidSub = true
  if (isNullOrEmpty(tempList)) {
    return true
  }
  for (let i = 0; i < tempList.length; i++) {
    vue.$refs[formName + i].validate((valid, fields) => {
      if (!valid) {
        isValidSub = false
        validateShowMessage(fields, vue, reg)
      } else {
        tempList[i].editMode = false
      }
    })
  }
  return isValidSub
}
const ignoreAttributes = ['createdOrganizationId', 'createdBy', 'createdAt', 'modifiedOrganizationId', 'modifiedBy', 'modifiedAt', '__v', '_id', 'editMode', 'isChanged']
let ignoreCustomAtts = []
export function isEqualsData (newData, oldData, ignoreAtts) {
  if (!isNull(ignoreAtts)) {
    ignoreCustomAtts = ignoreAtts
  } else {
    ignoreCustomAtts = []
  }
  console.log(ignoreCustomAtts, ' ignoreCustomAtts')
  if (Array.isArray(newData)) {
    // console.log('array', newData, oldData)
    return isEqualsArray(newData, oldData)
  } else if (isObject(newData)) {
    // console.log('object', newData, oldData)
    return isEqualsObject(newData, oldData)
  } else {
    // console.log('is equals DATA', newData, oldData)
    return isEqualsValue(newData, oldData)
  }
}
function isEqualsObject (newData, oldData) {
  for (const data in newData) {
    if (ignoreAttributes.includes(data) || ignoreCustomAtts.includes(data)) {
      continue
    }
    if (Array.isArray(newData[data])) {
      if (!Array.isArray(oldData[data])) {
        return false
      }
      if (!isEqualsArray(newData[data], oldData[data])) {
        return false
      }
    } else if (isObject(newData[data])) {
      if (!isObject(oldData[data])) {
        return false
      }
      if (!isEqualsObject(newData[data], oldData[data])) {
        return false
      }
    } else if (!isEqualsValue(newData[data], oldData[data])) {
      return false
    }
  }
  return true
}
function isEqualsArray (newData, oldData) {
  if (newData === oldData) {
    return true
  }
  if (newData == null || oldData == null) {
    return false
  }
  if (newData.length !== oldData.length) {
    return false
  }
  for (let i = 0; i < newData.length; i++) {
    if (Array.isArray(newData[i])) {
      if (!Array.isArray(oldData[i])) {
        return false
      }
      if (!isEqualsArray(newData[i], oldData[i])) {
        return false
      }
    } else if (isObject(newData[i])) {
      if (!isObject(oldData[i])) {
        return false
      }
      if (!isEqualsObject(newData[i], oldData[i])) {
        return false
      }
    } else if (!isEqualsValue(newData[i], oldData[i])) {
      return false
    }
  }
  return true
}
function isEqualsValue (newVal, oldVal) {
  // console.log(oldVal === newVal, oldVal, newVal)
  return oldVal === newVal
}
export function checkValidSubArray (
  tempList,
  formName,
  tempSubAttribute,
  vue,
  reg
) {
  let isValidSub = true
  for (let i = 0; i < tempList.length; i++) {
    for (const key in tempList[i]) {
      if (key === tempSubAttribute) {
        const tempSubList = tempList[i][key]
        for (let k = 0; k < tempSubList.length; k++) {
          vue.$refs[formName + i + 'r' + k].validate((valid, fields) => {
            if (!valid) {
              isValidSub = false
              validateShowMessage(fields, vue, reg)
            } else if (!isNull(tempSubList[i])) {
              tempSubList[i].editMode = false
            }
          })
        }
        break
      }
    }
  }
  return isValidSub
}
