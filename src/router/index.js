const fs = require("fs")

const useRoutes = function () {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === "index.js") return
    console.log(file)
    const router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = useRoutes
