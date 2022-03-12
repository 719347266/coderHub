const koaRouter = require("koa-router")

const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware")
const {
  create,
  detail,
  list,
  updata,
  addLabels,
  fileInfo,
} = require("../controller/moment.controller")
const { verifyLabelExists } = require("../middleware/label.middleware")

const momentRouter = new koaRouter({ prefix: "/moment" })

momentRouter.get("/", list)
momentRouter.get("/:momentId", detail)
momentRouter.post("/", verifyAuth, create)
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, updata)

// 创建标签
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 动态配图的服务
momentRouter.get("/images/:filename", fileInfo)

module.exports = momentRouter
