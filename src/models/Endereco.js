const pool = require('../config/database');

class Endereco {
  static async create(data) {
    const client = await pool.connect();
    const {
      cep, rua, bairro, cidade, uf, numero, complemento,
    } = data;
    const { rows: endereco } = await client.query(
      'INSERT INTO endereco (cep, rua, bairro, cidade, uf, numero, complemento) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [cep, rua, bairro, cidade, uf, numero, complemento],
    );
    await client.release();
    return endereco;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: enderecos } = await client.query('SELECT * FROM endereco');
    await client.release();
    return enderecos;
  }

  static async findById(cep) {
    const client = await pool.connect();
    const { rows: endereco } = await client.query('SELECT * FROM endereco WHERE cep = $1', [cep]);
    await client.release();
    return endereco;
  }
}

module.exports = Endereco;
