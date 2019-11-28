const pool = require("../config/database");

class Usuario {
  static async create(data) {
    try {
      const {
        nome,
        email,
        hash_senha,
        telefone,
        rg,
        cpf,
        data_nascimento,
        sexo
      } = data;
      const client = await pool.connect();
      const {
        rows: usuario
      } = await client.query(
        "INSERT INTO usuario (nome, email, hash_senha, telefone, rg, cpf, data_nascimento, sexo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [nome, email, hash_senha, telefone, rg, cpf, data_nascimento, sexo]
      );
      await client.release();
      return usuario;
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: users } = await client.query("SELECT * FROM usuario");
    await client.release();
    return users;
  }

  static async findById(usuarioId) {
    try {
      const client = await pool.connect();
      const {
        rows: usuario
      } = await client.query(
        "SELECT * FROM usuario WHERE usuario.usuario_id = $1",
        [usuarioId]
      );
      await client.release();
      return usuario;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async Update(usuarioId, data) {
    try {
      const client = await pool.connect();
      const {
        rows: usuario
      } = await client.query(
        "SELECT * FROM usuario WHERE usuario.usuario_id = $1",
        [usuarioId]
      );
      if (usuario) {
        const {
          nome,
          email,
          hash_senha,
          telefone,
          rg,
          cpf,
          data_nascimento,
          sexo
        } = data;
        const {
          rows: updatedUser
        } = await client.query(
          "UPDATE usuario SET nome = $1, email = $2, hash_senha = $3, telefone = $4, rg = $5, cpf = $6, data_nascimento = $7, sexo = $8 WHERE usuario.usuario_id = $9 RETURNING *",
          [
            nome,
            email,
            hash_senha,
            telefone,
            rg,
            cpf,
            data_nascimento,
            sexo,
            usuarioId
          ]
        );
        await client.release();
        return updatedUser;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async Delete(usuarioId) {
    try {
      const client = await pool.connect();
      const {
        rows: usuario
      } = await client.query(
        "SELECT * FROM usuario WHERE usuario.usuario_id = $1",
        [usuarioId]
      );
      if (usuario) {
        await client.query(
          "DELETE FROM usuario WHERE usuario.usuario_id = $1",
          [usuarioId]
        );
        return usuario;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}

module.exports = Usuario;
