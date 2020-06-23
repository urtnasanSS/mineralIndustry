class CustomError extends Error {
  constructor (message, status) {
    super(message)
    this.status = status || 403
  }
}
module.exports = CustomError
