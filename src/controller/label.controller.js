const service = require("../service/label.service")

class labelController {
  async create(ctx, next) {
    const { label } = ctx.request.body
    const result = await service.create(label)
    ctx.body = result
  }
  async list(ctx, next) {
    const { limit, offset } = ctx.query
    const result = await service.getLabelList(offset, limit)
    ctx.body = result
  }
}

module.exports = new labelController()
