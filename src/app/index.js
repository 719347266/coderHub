const koa = require("koa")
const bodyParser = require("koa-bodyparser")
const errorHandler = require("./errpr-handle")
const useRoutes = require("../router")

const app = new koa()
app.useRoutes = useRoutes

app.use(bodyParser())
app.useRoutes()
app.on("error", errorHandler)

module.exports = app
