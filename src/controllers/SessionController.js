const Usuario = require("../models/Usuario");

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;
    try {
      const usuario = await Usuario.findOne({
        where: {
          email
        }
      });

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      const check = await usuario.checkPassword(senha);

      if (check) {
        return res.json(usuario);
      }

      return res.json({ msg: "Email e/ou Senha incorretos!" });
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  }
};
