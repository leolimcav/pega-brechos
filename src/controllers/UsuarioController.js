const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    try {
      const usuario = await Usuario.findByPk(user_id);

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      return res.json(usuario);
    } catch (err) {
      console.log(err);
      return res.json({ msg: "An error ocurred!" });
    }
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
      sexo,
      is_brecho
    } = req.body;
    try {
      const created = await Usuario.findOne({ where: { email } });
      if (!created) {
        const usuario = await Usuario.create({
          nome,
          email,
          senha,
          telefone,
          rg,
          cpf,
          data_nascimento,
          sexo,
          is_brecho
        });
        return res.json(usuario);
      }
      return res.json({ msg: "Este email já esta em uso!" });
    } catch (err) {
      console.log(err);
      return res.json(err.detail);
    }
  },

  async update(req, res) {
    const { user_id } = req.params;
    const {
      nome,
      email,
      senha,
      telefone,
      rg,
      cpf,
      data_nascimento,
      sexo,
      is_brecho
    } = req.body;

    try {
      const usuario = await Usuario.findByPk(user_id);

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      await usuario.update({
        nome,
        email,
        senha,
        telefone,
        rg,
        cpf,
        data_nascimento,
        sexo,
        is_brecho
      });

      return res.json(usuario);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async destroy(req, res) {
    const { user_id } = req.params;
    try {
      const usuario = await Usuario.findByPk(user_id);

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      await usuario.destroy();

      return res.json(usuario);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  }
};
