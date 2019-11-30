const Pedido = require("../models/Pedido");
const Usuario = require("../models/Usuario");
// const Produto = require("../models/Produto");
// const ProdutoPedido = require("../models/ProdutoPedido");

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

  async findAll(req, res) {
    const { user_id } = req.params;
    const usuario = await Usuario.findById(user_id);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    const pedidos = await Pedido.findAll(user_id);

    return res.json(pedidos);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { data_pedido } = req.body;
    const usuario = await Usuario.findById(user_id);

    if (!usuario) {
      return res.json({ msg: "Usuario não encontrado!" });
    }

    const pedido = await Pedido.create({ usuario_id: user_id, data_pedido });

    return res.json(pedido[0]);
  },

  async checkout(req, res) {}
};
