var self = module.exports = {
  isNullOrWhitespace (value) {
    return value === undefined || value === null || value.trim() === ''
  },
  isNull (value) {
    return value === undefined || value === null
  },
  isNullOrZero (value) {
    return value === undefined || value === null || value === 0
  },
  isNullOrEmpty (values) {
    return self.isNull(values) || values.length === 0
  },
  isEmptyObject (value) {
    if (!self.isNull(value)) {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          return false
        }
      }
      return true
    } else {
      return true
    }
  }
}
