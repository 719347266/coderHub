const koaRouter = require("koa-router")

const { verifyAuth } = require("../middleware/auth.middleware")
const { create, list } = require("../controller/label.controller")

const labelRouter = new koaRouter({ prefix: "/label" })

labelRouter.post("/", verifyAuth, create)
labelRouter.get("/", list)

module.exports = labelRouter
