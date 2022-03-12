const commentService = require("../service/comment.service")

const created = async (ctx, next) => {
  const { momentId, content } = ctx.request.body
  const { id } = ctx.user
  console.log(momentId, content, id)
  const result = await commentService.create(momentId, content, id)
  ctx.body = result
}

const reply = async (ctx, next) => {
  const { commentId } = ctx.params
  const { momentId, content } = ctx.request.body
  const { id } = ctx.user
  const result = await commentService.reply(momentId, content, id, commentId)
  ctx.body = result
}

const update = async (ctx, next) => {
  const { commentId } = ctx.params
  const { content } = ctx.request.body
  const result = await commentService.update(commentId, content)
  ctx.body = result
}

const remove = async (ctx, next) => {
  const { commentId } = ctx.params
  const result = await commentService.remove(commentId)
  ctx.body = result
}

const list = async (ctx, next) => {
  const { mommentId } = ctx.query
  const result = await commentService.getCommentsByMomentId(mommentId)
  ctx.body = result
}

module.exports = {
  created,
  reply,
  update,
  remove,
  list,
}
