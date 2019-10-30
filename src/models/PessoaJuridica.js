const pool = require('../config/database');

class PessoaJuridica {
  static async create(data) {
    const {
      cnpj, nomeFantasia, naturezaJuridica, usuarioId,
    } = data;
    const client = await pool.connect();
    const { rows: pessoaJuridica } = await client.query(
      'INSERT INTO pessoa_juridica (cnpj, nome_fantasia, natureza_juridica, usuarioid) VALUES ($1, $2, $3, $4) RETURNING *',
      [cnpj, nomeFantasia, naturezaJuridica, usuarioId],
    );
    await client.release();
    return pessoaJuridica;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: pessoasJuridicas } = await client.query('SELECT * FROM pessoa_juridica');
    await client.release();
    return pessoasJuridicas;
  }

  static async findById(pessoaJuridicaId) {
    const client = await pool.connect();
    const { rows: pessoaJuridica } = await client.query(
      'SELECT * FROM pessoa_juridica WHERE pessoa_juridica.cnpj = $1',
      [pessoaJuridicaId],
    );
    await client.release();
    return pessoaJuridica;
  }

  static async findByIdAndUpdate(pessoaJuridicaId, data) {
    const client = await pool.connect();
    const { rows: pessoaJuridica } = await client.query(
      'SELECT * FROM pessoa_juridica WHERE cnpj = $1',
      [pessoaJuridicaId],
    );
    if (pessoaJuridica) {
      const {
        cnpj, nomeFantasia, naturezaJuridica, usuarioId,
      } = data;
      const { rows: updatedPF } = await client.query(
        'UPDATE pessoa_juridica set cnpj = $1, nome_fantasia = $2, natureza_juridica = $3, usuarioid = $4',
        [cnpj, nomeFantasia, naturezaJuridica, usuarioId],
      );
      await client.release();
      return updatedPF;
    }
    return pessoaJuridica;
  }

  static async findByIdAndDelete(pessoaJuridicaId) {
    const client = await pool.connect();
    const { rows: pessoaJuridica } = await client.query(
      'SELECT * FROM pessoa_juridica WHERE cnpj = $1',
      [pessoaJuridicaId],
    );
    if (pessoaJuridica) {
      await client.query('DELETE FROM pessoa_juridica WHERE cnpj = $1', [pessoaJuridicaId]);
      return pessoaJuridica;
    }
    return pessoaJuridica;
  }
}

module.exports = PessoaJuridica;
