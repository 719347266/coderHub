const fs = require("fs")

const userService = require("../service/user.service")
const fileService = require("../service/file.service")
const { AVATAR_PATH } = require("../constants/file-types")

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body
    // 查询数据
    const res = await userService.create(user)
    // 返回结果
    ctx.body = res
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    ctx.response.set("content-type", avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
