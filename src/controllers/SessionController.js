const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;
    const usuario = await Usuario.auth(email);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não existente!" });
    }

    if (await bcrypt.compare(senha, usuario[0].hash_senha)) {
      return res.json(usuario[0]);
    }

    return res.json({ msg: "Email e/ou Senha incorretos!" });
  }
};
