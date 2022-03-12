const fileService = require("../service/file.service")
const userService = require("../service/user.service")
const { APP_HOST, APP_PORT } = require("../app/config")

class Filecontroller {
  async saveAvatarInfo(ctx, next) {
    const { filename, size, mimetype } = ctx.req.file
    const { id } = ctx.user
    const result = await fileService.createAvatar(filename, size, mimetype, id)
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id)
    ctx.body = "上传头像成功~"
  }
  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query
    for (const file of files) {
      const { filename, size, mimetype } = file
      await fileService.createFile(filename, size, mimetype, id, momentId)
    }
    ctx.body = "动态配图上传完成~"
  }
}

module.exports = new Filecontroller()
