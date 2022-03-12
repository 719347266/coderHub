const connection = require("../app/database")

class Userservice {
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`
    const res = await connection.execute(statement, [name, password])
    return res[0]
  }
  async getUserByName(name) {
    const statement = "SELECT * FROM `users` WHERE name = ?"
    const result = await connection.execute(statement, [name])
    return result[0]
  }
  async updateAvatarUrlById(avatar_url, id) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [avatar_url, id])
    return result
  }
}

module.exports = new Userservice()
