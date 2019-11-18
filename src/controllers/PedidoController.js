const Pedido = require("../models/Pedido");
const Usuario = require("../models/Usuario");
const Produto = require("../models/Produto");
const ProdutoPedido = require("../models/ProdutoPedido");

module.exports = {
  async index(req, res) {
    const { order_id, user_id } = req.params;
    const usuario = await Usuario.findById(user_id);

    if (!usuario) {
      return res.json({ msg: "Usuario não encontrado!" });
    }

    const pedido = await Pedido.findById(order_id, user_id);
    if (!pedido) {
      return res.json({ msg: "Pedido não encontrado!" });
    }

    return res.json(pedido);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { data_pedido } = req.body;
    const usuario = await Usuario.findById(user_id);

    if (!usuario) {
      return res.json({ msg: "Usuario não encontrado!" });
    }

    let pedido = await Pedido.create(data_pedido);

    const carrinho = await ProdutoPedido.findById(pedido.pedido_id);

    let total = 0;
    carrinho.map(async item => {
      const produto = await Produto.findById(item.produto_id);
      total += produto.valor;
    });

    pedido = await Pedido.updateTotal(pedido.pedido_id, total);

    return res.json(pedido);
  }
};
