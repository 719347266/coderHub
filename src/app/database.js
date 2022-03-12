const mysql = require("mysql2")
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require("../app/config")

const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
})

connections.getConnection((err, conn) => {
  conn.connect(err => {
    console.log(err)
    if (err) {
      console.log("连接失败", err)
    } else {
      console.log("连接成功", err)
    }
  })
})

module.exports = connections.promise()
