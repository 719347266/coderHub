const connection = require("../app/database")

class Momentservice {
  async created(user_id, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [content, user_id])
    return result
  }
  async getMomentById(id) {
    const statement = `
        SELECT
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) author,
          IF(COUNT(l.id), JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
          ), NULL) labels,
          (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                        'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatar', cu.avatar_url))
          ),NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id ) comments,
          (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
	        FROM file WHERE m.id = file.moment_id) imges
          FROM moment m
          LEFT JOIN users u ON m.user_id = u.id
          LEFT JOIN moment_label ml ON m.id = ml.moment_id
          LEFT JOIN label l ON ml.label_id = l.id
        WHERE m.id = ?
          GROUP BY m.id
    `
    const [result] = await connection.execute(statement, [id])
    return result[0]
  }
  async getMomentList(offset, size) {
    console.log(offset, size)
    const statement = `
        SELECT
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'avatar', u.avatar_url) author,
          (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
          (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) commentCount,
          (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename))
	        FROM file WHERE m.id = file.moment_id) imges
          FROM moment m
          LEFT JOIN users u ON m.user_id = u.id
        LIMIT ?, ?
    `
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  async updata(content, id) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, id])
    return result
  }

  async hasLabel(mommentId, id) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
    const [result] = await connection.execute(statement, [mommentId, id])
    return !!result[0]
  }

  async addLabel(mommentId, id) {
    const statement = `INSERT INTO moment_label(moment_id, label_id) VALUES(?, ?)`
    const [result] = await connection.execute(statement, [mommentId, id])
    return result
  }
}

module.exports = new Momentservice()
