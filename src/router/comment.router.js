const koaRouter = require("koa-router")
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware")
const { created, reply, update, remove, list } = require("../middleware/comment.middleware")

const commentRouter = new koaRouter({ prefix: "/comment" })

commentRouter.post("/", verifyAuth, created)

commentRouter.post("/:commentId/reply", verifyAuth, reply)

// 修改评论
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update)
// 删除评论
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove)

// 获取评论列表
commentRouter.get("/", list)

module.exports = commentRouter
