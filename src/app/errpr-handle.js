const errorType = require("../constants/error-types")

const errorHandler = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = "名字或密码为空"
      break
    case errorType.USER_ALREADY_EXISTS:
      status = 409
      message = "用户存在"
      break
    case errorType.USER_DOES_NOT_EXISTS:
      status = 400 // 参数错误
      message = "用户名不存在~"
      break
    case errorType.PASSWORD_IS_INCORRENT:
      status = 400 // 参数错误
      message = "密码是错误的~"
      break
    case errorType.UNAUTHORIZATION:
      status = 401 // 参数错误
      message = "无效的token~"
      break
    case errorType.UNPERMISSION:
      status = 401 // 参数错误
      message = "您不具备操作的权限~"
      break
    default:
      status = 404
      message = "NOT FOUND"
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandler
