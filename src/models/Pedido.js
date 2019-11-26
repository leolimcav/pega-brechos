const pool = require("../config/database");

class Pedido {
  static async create(data) {
    const client = await pool.connect();
    const { usuarioId, total, dataPedido } = data;
    const {
      rows: pedido
    } = await client.query(
      "INSERT INTO pedido (usuario_id, total, data_pedido) VALUES ($1, $2, $3)",
      [usuarioId, total, dataPedido]
    );
    await client.release();
    return pedido;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: pedidos } = await client.query("SELECT * FROM pedido");
    await client.release();
    return pedidos;
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

  static async updateTotal(pedidoId, total) {
    const client = await pool.connect();
    const {
      rows: pedido
    } = await client.query(
      "UPDATE pedido SET total = $1 WHERE pedido_id = $2 RETURNING *",
      [total, pedidoId]
    );
    await client.release();
    return pedido;
  }
}

module.exports = Pedido;
