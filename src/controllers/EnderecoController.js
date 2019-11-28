const Endereco = require("../models/Endereco");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const usuario = await Usuario.findById(user_id);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    const endereco = await Endereco.findAll(user_id);

    return res.json(endereco);
  },

  async findOne(req, res) {
    const { address_id, user_id } = req.params;
    const usuario = await Usuario.findById(user_id);
    const end = await Endereco.findById(user_id, address_id);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    if (end.length === 0) {
      return res.json({ msg: "Endereço não encontrado!" });
    }

    const endereco = await Endereco.findById(user_id, address_id);

    return res.json(endereco);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { cep, rua, bairro, cidade, uf, numero, complemento } = req.body;

    const usuario = await Usuario.findById(user_id);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    const endereco = await Endereco.create({
      cep,
      rua,
      bairro,
      cidade,
      uf,
      numero,
      complemento,
      usuario_id: user_id
    });

    return res.json(endereco);
  },

  async update(req, res) {
    const { user_id, address_id } = req.params;
    const { cep, rua, bairro, cidade, uf, numero, complemento } = req.body;

    const usuario = await Usuario.findById(user_id);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    const endereco = await Endereco.Update(
      {
        cep,
        rua,
        bairro,
        cidade,
        uf,
        numero,
        complemento
      },
      user_id,
      address_id
    );

    return res.json(endereco);
  },

  async destroy(req, res) {
    const { user_id, address_id } = req.params;
    const usuario = await Usuario.findById(user_id);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    const end = await Endereco.findById(user_id, address_id);

    if (end.length === 0) {
      return res.json({ msg: "Endereço não encontrado!" });
    }

    const endereco = await Endereco.Delete(address_id, user_id);

    return res.json(endereco);
  }
};
