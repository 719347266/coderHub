const connection = require("../app/database")

class lableService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async getLabelByName(name) {
    const statement = `SELECT * FROM label WHERE name = ?`
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }

  async getLabelList(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ?, ?`
    const [result] = await connection.execute(statement, [limit, offset])
    return result
  }
}

module.exports = new lableService()