const connection = require("../app/database")

class fileService {
  async createAvatar(filename, size, mimetype, user_id) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [filename, mimetype, size, user_id])
    return result
  }
  async getAvatarByUserId(user_id) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?`
    const [result] = await connection.execute(statement, [user_id])
    return result[0]
  }
  async createFile(filename, size, mimetype, user_id, momentId) {
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      user_id,
      momentId,
    ])
    return result
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?`
    const [result] = await connection.execute(statement, [filename])
    return result
  }
}

module.exports = new fileService()
