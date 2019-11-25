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

  static async find(data) {
    const client = await pool.connect();
    const { usuario_id, pedido_id } = data;
    const {
      rows: carrinho
    } = await client.query(
      "SELECT * FROM produto_pedido pp INNER JOIN pedido pd ON pp.pedido_id = pd.pedido_id AND pd.usuario_id = $1 AND pp.pedido_id = $2" +
        "INNER JOIN produto p ON pp.produto_id = p.produto_id",
      [usuario_id, pedido_id]
    );
    await client.release();
    return carrinho;
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

  static async Delete(data) {
    const client = await pool.connect();
    const { pedido_id, produto_id } = data;
    const {
      rows: pedido
    } = await client.query(
      "DELETE from produto_pedido pd WHERE pd.pedido_id = $1 AND pd.produto_id = $2",
      [pedido_id, produto_id]
    );
    return pedido;
  }
}

module.exports = ProdutoPedido;
