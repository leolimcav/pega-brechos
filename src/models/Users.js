const pool = require('../config/database');

class Users {
  static async create(data) {
    const { nome, email, senha } = data;
    const client = await pool.connect();
    const { rows: user } = await client.query(
      'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha],
    );
    await client.release();
    return user;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: users } = await client.query('SELECT * FROM users');
    await client.release();
    return users;
  }

  static async findById(userId) {
    const client = await pool.connect();
    const { rows: user } = await client.query('SELECT * FROM users WHERE users.userid = $1', [
      userId,
    ]);
    await client.release();
    return user;
  }
}

module.exports = Users;
