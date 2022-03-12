const fs = require("fs")
const service = require("../service/moment.service")
const fileService = require("../service/file.service")
const { PICTURE_PATH } = require("../constants/file-types")

class MomentController {
  async create(ctx, next) {
    const user_id = ctx.user.id
    const { content } = ctx.request.body
    const result = await service.created(user_id, content)
    ctx.body = result
  }
  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await service.getMomentById(momentId)
    ctx.body = result
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await service.getMomentList(offset, size)
    ctx.body = result
  }
  async updata(ctx, next) {
    const { content } = ctx.request.body
    const { momentId } = ctx.params
    const result = await service.updata(content, momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { momentId } = ctx.params
    const labels = ctx.labels
    for (const lable of labels) {
      const isExist = await service.hasLabel(momentId, lable.id)
      if (!isExist) {
        await service.addLabel(momentId, lable.id)
      }
    }
    ctx.body = "动态标签添加成功~"
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)

    const { type } = ctx.query
    const types = ["small", "middle", "large"]
    if (types.some(item => item === type)) {
      filename = `${filename}-${type}`
    }

    ctx.response.set("content-type", fileInfo.mimetype)
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
  }
}

module.exports = new MomentController()
