const pool = require('../config/database');

class Usuario {
  static async create(data) {
    const { nome, email, senha } = data;
    const client = await pool.connect();
    const { rows: usuario } = await client.query(
      'INSERT INTO usuario (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha],
    );
    await client.release();
    return usuario;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: users } = await client.query('SELECT * FROM usuario');
    await client.release();
    return users;
  }

  static async findById(usuarioid) {
    const client = await pool.connect();
    const { rows: usuario } = await client.query('SELECT * FROM users WHERE users.usuarioid = $1', [
      usuarioid,
    ]);
    await client.release();
    return usuario;
  }

  static async findByIdAndUpdate(usuarioid, data) {
    const client = await pool.connect();
    const { rows: usuario } = await client.query('SELECT * FROM users WHERE usuarioid = $1', [
      usuarioid,
    ]);
    if (usuario) {
      const {
        nome, endereco, email, senha, telefone,
      } = data;
      const { rows: updatedUser } = await client.query(
        'UPDATE users set nome = $1, endereco = $2, email = $3, senha = $4, telefone = $5',
        [nome, endereco, email, senha, telefone],
      );
      await client.release();
      return updatedUser;
    }
    return usuario;
  }

  static async findByIdAndDelete(usuarioid) {
    const client = await pool.connect();
    const { rows: usuario } = await client.query('SELECT * FROM users WHERE usuarioid = $1', [
      usuarioid,
    ]);
    if (usuario) {
      await client.query('DELETE FROM users WHERE usuarioid = $1', [usuarioid]);
      return usuario;
    }
    return usuario;
  }
}

module.exports = Usuario;