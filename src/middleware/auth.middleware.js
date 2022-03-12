const jwt = require("jsonwebtoken")
const errorType = require("../constants/error-types")
const userService = require("../service/user.service")
const authService = require("../service/auth.service")
const md5password = require("../utils/password-handle")

const { PUBLIC_KEY } = require("../app/config")

// 判断是否登录
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }
  const res = await userService.getUserByName(name)
  const user = res[0]
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS)
    return ctx.app.emit("error", error, ctx)
  }

  if (md5password(password) != user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT)
    return ctx.app.emit("error", error, ctx)
  }
  ctx.user = user
  await next()
}

// 判断token的有效性
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit("error", error, ctx)
  }
  const token = authorization.replace("Bearer ", "")
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    })
    ctx.user = result
    await next()
  } catch {
    const error = new Error(errorType.UNAUTHORIZATION)
    ctx.app.emit("error", error, ctx)
  }
}

// 判断是否有修改动态的权限
const verifyPermission = async (ctx, next) => {
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace("Id", "")
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id)
    if (!isPermission) throw new Error()
    await next()
  } catch (err) {
    const error = new Error(errorType.UNPERMISSION)
    return ctx.app.emit("error", error, ctx)
  }
}

module.exports = { verifyLogin, verifyAuth, verifyPermission }
