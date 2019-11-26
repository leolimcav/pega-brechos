const Pedido = require("../models/Pedido");
const Produto = require("../models/Produto");
const Carrinho = require("../models/ProdutoPedido");

module.exports = {
  async index(req, res) {
    const { order_id, user_id } = req.params;

    const carrinho = await Carrinho.find({ user_id, order_id });

    if (!carrinho) {
      return res.json({ msg: "Carrinho inexistente!" });
    }

    return res.json(carrinho);
  },
  async store(req, res) {
    const { order_id, product_id } = req.params;
    const carrinho = await Carrinho.create(order_id, product_id);
    return res.json(carrinho);
  },
  async destroy(req, res) {
    const { order_id, product_id } = req.params;
    const carrinho = await Carrinho.Delete(order_id, product_id);
    return res.json(carrinho);
  }
};
