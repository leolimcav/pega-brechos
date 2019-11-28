const pool = require("../config/database");

class Endereco {
  static async create(data) {
    try {
      const client = await pool.connect();
      const {
        cep,
        rua,
        bairro,
        cidade,
        uf,
        numero,
        complemento,
        usuario_id
      } = data;
      const {
        rows: endereco
      } = await client.query(
        "INSERT INTO endereco (cep, rua, bairro, cidade, uf, numero, complemento, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [cep, rua, bairro, cidade, uf, numero, complemento, usuario_id]
      );
      await client.release();
      return endereco;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async findAll(usuario_id) {
    try {
      const client = await pool.connect();
      const {
        rows: endereco
      } = await client.query(
        "SELECT * FROM usuario u INNER JOIN endereco e ON e.usuario_id = u.usuario_id AND u.usuario_id = $1",
        [usuario_id]
      );
      await client.release();
      return endereco;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async findById(usuario_id, endereco_id) {
    try {
      const client = await pool.connect();
      const {
        rows: endereco
      } = await client.query(
        "SELECT * FROM usuario u INNER JOIN endereco e ON e.usuario_id = u.usuario_id AND u.usuario_id = $1 AND e.end_id = $2",
        [usuario_id, endereco_id]
      );
      await client.release();
      return endereco;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async Update(data, usuario_id, endereco_id) {
    try {
      const client = await pool.connect();
      const {
        rows: endereco
      } = await client.query(
        "SELECT * FROM usuario u INNER JOIN endereco e ON e.usuario_id = u.usuario_id AND u.usuario_id = $1",
        [usuario_id]
      );
      if (endereco) {
        const { rua, bairro, cidade, uf, numero, complemento } = data;
        const {
          rows: novoEndereco
        } = await client.query(
          "UPDATE endereco e SET rua = $1, bairro = $2, cidade = $3, uf = $4, numero = $5, complemento = $6 WHERE e.usuario_id = $7 AND e.end_id = $8 RETURNING *",
          [
            rua,
            bairro,
            cidade,
            uf,
            numero,
            complemento,
            usuario_id,
            endereco_id
          ]
        );
        await client.release();
        return novoEndereco;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async Delete(endereco_id, usuario_id) {
    try {
      const client = await pool.connect();
      const {
        rows: endereco
      } = await client.query(
        "SELECT * FROM usuario u INNER JOIN endereco e ON e.usuario_id = u.usuario_id AND u.usuario_id = $1 AND e.end_id = $2",
        [usuario_id, endereco_id]
      );
      if (endereco) {
        await client.query(
          "DELETE FROM endereco e WHERE e.end_id = $1 and e.usuario_id = $2 RETURNING *",
          [endereco_id, usuario_id]
        );
        await client.release();
        return endereco;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}

module.exports = Endereco;
