const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const usuario = await Usuario.findById(user_id);

    if (!usuario) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    return res.json(usuario[0]);
  },

  async store(req, res) {
    const {
      nome,
      email,
      senha,
      telefone,
      rg,
      cpf,
      data_nascimento,
      sexo
    } = req.body;
    const hash_senha = await bcrypt.hash(senha, 8);
    const usuario = await Usuario.create({
      nome,
      email,
      hash_senha,
      telefone,
      rg,
      cpf,
      data_nascimento,
      sexo
    });
    return res.json(usuario[0]);
  },

  async update(req, res) {
    const { user_id } = req.params;
    const {
      nome,
      email,
      senha,
      rg,
      cpf,
      data_nascimento,
      sexo,
      telefone
    } = req.body;
    const user = await Usuario.findById(user_id);

    if (user.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    let hash_senha;
    if (await bcrypt.compare(senha, user[0].hash_senha)) {
      hash_senha = user[0].hash_senha;
    } else {
      hash_senha = await bcrypt.hash(senha, 8);
    }
    const usuario = await Usuario.Update(user_id, {
      nome,
      email,
      hash_senha,
      telefone,
      rg,
      cpf,
      data_nascimento,
      sexo
    });

    if (usuario === null) {
      return res.json(user);
    }
    return res.json(usuario[0]);
  },

  async destroy(req, res) {
    const { user_id } = req.params;
    const user = await Usuario.findById(user_id);

    if (user.length === 0) {
      return res.json({ msg: "Usuario não encontrado!" });
    }

    const usuario = await Usuario.Delete(user_id);

    if (usuario === null) {
      return res.json({ msg: "Não foi possível remover o usuário!" });
    }

    if (usuario !== null) {
      return res.json(usuario[0]);
    }

    return user[0];
  }
};
