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
    return endereco;
  }
}

module.exports = Endereco;
