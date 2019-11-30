const Carrinho = require("../models/ProdutoPedido");
const Pedido = require("../models/Pedido");

module.exports = {
  async index(req, res) {
    const { order_id, user_id } = req.params;

    const carrinho = await Carrinho.find({
      usuario_id: user_id,
      pedido_id: order_id
    });
    if (carrinho.length === 0) {
      return res.json({ msg: "Carrinho vazio!" });
    }
    let total = 0;
    carrinho.map(async item => {
      console.log(item.valor);
      total += item.valor;
    });
    await Pedido.updateTotal(order_id, total);

    return res.json(carrinho);
  },
  async store(req, res) {
    const { order_id, product_id } = req.params;
    const carrinho = await Carrinho.create({
      pedido_id: order_id,
      produto_id: product_id
    });
    return res.json(carrinho);
  },
  async destroy(req, res) {
    const { order_id, product_id } = req.params;
    const carrinho = await Carrinho.Delete({
      pedido_id: order_id,
      produto_id: product_id
    });
    return res.json(carrinho);
  }
};
