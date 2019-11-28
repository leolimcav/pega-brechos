const pool = require("../config/database");

class Anuncio {
  static async create(data) {
    try {
      const client = await pool.connect();
      const { produto_id, usuario_id } = data;
      const {
        rows: anuncio
      } = await client.query(
        "INSERT INTO anuncio (produto_id, usuario_id) VALUES ($1, $2) RETURNING *",
        [produto_id, usuario_id]
      );
      await client.release();
      return anuncio;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async findAll(usuario_id) {
    try {
      const client = await pool.connect();
      const {
        rows: anuncio
      } = await client.query(
        "SELECT * FROM anuncio a INNER JOIN usuario u ON a.usuario_id = u.usuario_id AND u.usuario_id = $1 INNER JOIN produto p ON a.produto_id = p.produto_id",
        [usuario_id]
      );
      await client.release();
      return anuncio;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async findById(anuncio_id) {
    try {
      const client = await pool.connect();
      const {
        rows: anuncio
      } = await client.query(
        "SELECT * FROM anuncio a INNER JOIN produto p ON a.produto_id = p.produto_id INNER JOIN usuario u ON a.usuario_id = u.usuario_id AND a.anuncio_id = $1",
        [anuncio_id]
      );
      await client.release();
      return anuncio;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async Update(data) {
    try {
      const client = await pool.connect();
      const { anuncio_id, status } = data;
      const {
        rows: anuncio
      } = await client.query(
        "UPDATE anuncio a set status = UPPER($1) WHERE a.anuncio_id = $2 RETURNING *",
        [status, anuncio_id]
      );
      await client.release();
      return anuncio;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  // static async findByIdAndDelete() {
  //   const client = await pool.connect();
  //   const { rows:  } = await client.query('SELECT * FROM  WHERE ', []);
  //   if () {
  //     await client.query('DELETE FROM  WHERE ', []);
  //     await client.release();
  //     return ;
  //   }
  //   return ;
  // }
}

module.exports = Anuncio;
