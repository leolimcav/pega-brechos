const pool = require("../config/database");

class PessoaFisica {
  static async create(data) {
    const { cpf, rg, dataNascimento, sexo, usuarioId } = data;
    const client = await pool.connect();
    const {
      rows: pessoaFisica
    } = await client.query(
      "INSERT INTO pessoa_fisica (cpf, rg, data_nascimento, sexo, usuarioid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [cpf, rg, dataNascimento, sexo, usuarioId]
    );
    await client.release();
    return pessoaFisica;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: pessoasFisicas } = await client.query(
      "SELECT * FROM pessoa_fisica"
    );
    await client.release();
    return pessoasFisicas;
  }

  static async findById(pessoaFisicaId) {
    const client = await pool.connect();
    const {
      rows: pessoaFisica
    } = await client.query("SELECT * FROM pessoa_fisica WHERE pf_id = $1", [
      pessoaFisicaId
    ]);
    await client.release();
    return pessoaFisica;
  }

  static async findByIdAndUpdate(pessoaFisicaId, data) {
    const client = await pool.connect();
    const {
      rows: pessoaFisica
    } = await client.query("SELECT * FROM pessoa_fisica WHERE pf_id = $1", [
      pessoaFisicaId
    ]);
    if (pessoaFisica) {
      const { cpf, rg, dataNascimento, sexo, usuarioId } = data;
      const {
        rows: updatedPF
      } = await client.query(
        "UPDATE pessoa_fisica set cpf = $1, rg = $2, data_nascimento = $3, sexo = $4, usuarioid = $5",
        [cpf, rg, dataNascimento, sexo, usuarioId]
      );
      await client.release();
      return updatedPF;
    }
    return pessoaFisica;
  }

  static async findByIdAndDelete(pessoaFisicaId) {
    const client = await pool.connect();
    const {
      rows: pessoaFisica
    } = await client.query("SELECT * FROM pessoa_fisica WHERE pf_id = $1", [
      pessoaFisicaId
    ]);
    if (pessoaFisica) {
      await client.query("DELETE FROM pessoa_fisica WHERE pf_id = $1", [
        pessoaFisicaId
      ]);
      return pessoaFisica;
    }
    return pessoaFisica;
  }
}

module.exports = PessoaFisica;
