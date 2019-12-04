const Pedido = require("../models/Pedido");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { order_id, user_id } = req.params;
    try {
      const usuario = await Usuario.findByPk(user_id, {
        include: { association: "usuario_pedidos", where: { id: order_id } }
      });

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      return res.json(usuario);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async findAll(req, res) {
    const { user_id } = req.params;
    try {
      const usuario = await Usuario.findByPk(user_id, {
        include: { association: "usuario_pedidos" }
      });

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      return res.json(usuario);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { data_pedido } = req.body;
    try {
      const usuario = await Usuario.findByPk(user_id);

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      const pedido = await Pedido.create({ data_pedido, usuario_id: user_id });

      return res.json(pedido);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  }

  // async checkout(req, res) {}
};
