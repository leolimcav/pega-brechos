const pool = require("../config/database");

class Pedido {
  static async create(data) {
    try {
      const client = await pool.connect();
      const { usuario_id, total, data_pedido } = data;
      const {
        rows: pedido
      } = await client.query(
        "INSERT INTO pedido (usuario_id, total, data_pedido) VALUES ($1, $2, $3) RETURNING *",
        [usuario_id, total, data_pedido]
      );
      await client.release();
      return pedido;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async findAll(usuario_id) {
    try {
      const client = await pool.connect();
      const {
        rows: pedidos
      } = await client.query("SELECT * FROM pedido p WHERE p.usuario_id = $1", [
        usuario_id
      ]);
      await client.release();
      return pedidos;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async findById(pedidoId, usuarioId) {
    const client = await pool.connect();
    const {
      rows: pedido
    } = await client.query(
      "SELECT * FROM pedido WHERE pedido_id = $1 and usuario_id = $2",
      [pedidoId, usuarioId]
    );
    await client.release();
    return pedido;
  }

  static async updateTotal(pedido_id, total) {
    const client = await pool.connect();
    const {
      rows: pedido
    } = await client.query(
      "UPDATE pedido SET total = $1 WHERE pedido_id = $2",
      [total, pedido_id]
    );
    await client.release();
    return pedido;
  }
}

module.exports = Pedido;
