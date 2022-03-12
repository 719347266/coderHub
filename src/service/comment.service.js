const connection = require("../app/database")

class CommentService {
  async create(momenId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES(?, ?, ?)`
    const [result] = await connection.execute(statement, [content, momenId, userId])
    return result
  }
  async reply(momentId, content, userId, commentId) {
    console.log(momentId, content, userId, commentId)
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES(?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId])
    console.log(result, "123")
    return result
  }
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, commentId])
    return result
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`
    const [result] = await connection.execute(statement, [commentId])
    return result
  }
  async getCommentsByMomentId(mommentId) {
    const statement = `
      SELECT 
        c.id id, c.content content, c.comment_id commentId, c.createAt createTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
        FROM comment c
        LEFT JOIN users u ON u.id = c.user_id
      WHERE moment_id = ?
    `
    const [result] = await connection.execute(statement, [mommentId])
    return result
  }
}

module.exports = new CommentService()
