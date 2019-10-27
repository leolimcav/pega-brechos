const pool = require('../config/database');

class Produto {
  static async create(data, usuarioid) {
    const client = await pool.connect();
    const {
      nome, descricao, valor, categoria, tamanho, estado,
    } = data;
    const { rows: produto } = await client.query(
      'INSERT INTO produto (nome, descricao, valor, categoria, tamanho, estado, usuarioid) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome, descricao, valor, categoria, tamanho, estado, usuarioid],
    );
    await client.release();
    return produto;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: produtos } = await client.query('SELECT * FROM produto');
    await client.release();
    return produtos;
  }

  static async findById(produtoId) {
    const client = await pool.connect();
    const { rows: produto } = await client.query('SELECT * FROM produto WHERE produtoid = $1', [
      produtoId,
    ]);
    await client.release();
    return produto;
  }
}

module.exports = Produto;
