const pool = require("../config/database");

class ProdutoPedido {
  static async create(data) {
    const client = await pool.connect();
    const { pedidoId, produtoId } = data;
    const {
      rows: pedidoProduto
    } = await client.query(
      "INSERT INTO produto_pedido (pedido_id, produto_id) VALUES ($1, $2)",
      [pedidoId, produtoId]
    );
    await client.release();
    return pedidoProduto;
  }

  static async findAll() {
    const client = await pool.connect();
    const { rows: produtosPedidos } = await client.query(
      "SELECT * FROM produto_pedido"
    );
    await client.release();
    return produtosPedidos;
  }

  static async findById(pedidoId) {
    const client = await pool.connect();
    const {
      rows: pedido
    } = await client.query(
      "SELECT * FROM produto_pedido WHERE pedido_id = $1",
      [pedidoId]
    );
    await client.release();
    return pedido;
  }

  static async findByIdAndUpdate(pedidoId, data) {
    const client = await pool.client();
    const {
      rows: pedido
    } = await client.query(
      "SELECT * FROM produto_pedido WHERE pedido_id = $1",
      [pedidoId]
    );
    if (pedido) {
      const { produtoId } = data;
      const {
        rows: pedidoUpd
      } = await client.query(
        "UPDATE produto_pedido SET pedido_id = $1, produto_id = $2 RETURNING *",
        [pedidoId, produtoId]
      );
      await client.release();
      return pedidoUpd;
    }
    return pedido;
  }

  static async findByIdAndDelete(pedidoId) {
    const client = await pool.connect();
    const {
      rows: pedido
    } = await client.query(
      "SELECT * FROM produto_pedido WHERE pedido_id = $1",
      [pedidoId]
    );
    if (pedido) {
      await client.query("DELETE FROM produto_pedido WHERE pedido_id = $1", [
        pedidoId
      ]);
      await client.release();
      return pedido;
    }
    return pedido;
  }
}

module.exports = ProdutoPedido;
