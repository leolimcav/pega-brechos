const Endereco = require("../models/Enderecos");
const Usuario = require("../models/Usuarios");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    try {
      const usuario = await Usuario.findByPk(user_id, {
        include: { association: "enderecos" }
      });
      return res.json(usuario);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async findOne(req, res) {
    const { user_id, address_id } = req.params;
    try {
      const usuario = await Usuario.findByPk(user_id, {
        include: {
          association: "enderecos",
          where: { id: address_id }
        },
        attributes: []
      });
      return res.json(usuario.enderecos[0]);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async store(req, res) {
    const { user_id } = req.params;
    const {
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      numero,
      complemento
    } = req.body;
    try {
      const usuario = await Usuario.findByPk(user_id);

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      const endereco = await Endereco.create({
        cep,
        logradouro,
        bairro,
        cidade,
        uf,
        numero,
        complemento,
        usuario_id: user_id
      });

      return res.json(endereco);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async update(req, res) {
    const { address_id } = req.params;
    const {
      cep,
      logradouro,
      bairro,
      cidade,
      uf,
      numero,
      complemento
    } = req.body;
    try {
      const endereco = await Endereco.findByPk(address_id);

      await endereco.update({
        cep,
        logradouro,
        bairro,
        cidade,
        uf,
        numero,
        complemento
      });

      return res.json(endereco);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async destroy(req, res) {
    const { address_id } = req.params;
    try {
      const endereco = await Endereco.findByPk(address_id);

      await endereco.destroy();

      return res.json(endereco);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  }
};
