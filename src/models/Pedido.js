const pool = require('../config/database');

class Pedido {
  static async create(data) {
    const client = await pool.connect();
    const { usuarioId, total, dataPedido } = data;
    const { rows: pedido } = await client.query(
      'INSERT INTO pedido (usuarioid, total, data_pedido) VALUES ($1, $2, $3)',
      [usuarioId, total, dataPedido],
    );
    await client.release();
    return pedido;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: pedidos } = await client.query('SELECT * FROM pedido');
    await client.release();
    return pedidos;
  }

  static async findById(pedidoId) {
    const client = await pool.connect();
    const { rows: pedido } = await client.query('SELECT * FROM pedido WHERE pedidoid = $1', [
      pedidoId,
    ]);
    await client.release();
    return pedido;
  }

  static async findByIdAndUpdate(pedidoId, data) {
    const client = await pool.client();
    const { rows: pedido } = await client.query('SELECT * FROM pedido WHERE pedidoid = $1', [
      pedidoId,
    ]);
    if (pedido) {
      const { usuarioId, total, dataPedido } = data;
      const { rows: pedidoUpd } = await client.query(
        'UPDATE pedido set usuarioid = $1, total = $2, data_pedido = $3 RETURNING *',
        [usuarioId, total, dataPedido],
      );
      await client.release();
      return pedidoUpd;
    }
    return pedido;
  }

  static async findByIdAndDelete(pedidoId) {
    const client = await pool.connect();
    const { rows: pedido } = await client.query('SELECT * FROM pedido WHERE pedidoid = $1', [
      pedidoId,
    ]);
    if (pedido) {
      await client.query('DELETE FROM pedido WHERE pedidoid = $1', [pedidoId]);
      await client.release();
      return pedido;
    }
    return pedido;
  }
}

module.exports = Pedido;
