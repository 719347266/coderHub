const service = require("../service/label.service")

const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLables = []
  for (let name of labels) {
    const labelResult = await service.getLabelByName(name)
    const label = { name }
    if (!labelResult) {
      const result = await service.create(name)
      label.id = result.insertId
    } else {
      label.id = labelResult.id
    }
    newLables.push(label)
  }
  ctx.labels = newLables
  await next()
}

module.exports = {
  verifyLabelExists,
}
