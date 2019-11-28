const Usuario = require("../models/Usuario");
const Produto = require("../models/Produto");

module.exports = {
  async findUser(req, res) {
    const { nome } = req.query;
    const usuario = await Usuario.findByName(nome);

    return res.json(usuario);
  },
  async findProduct(req, res) {
    const { nome } = req.query;
    const produto = await Produto.findByName(nome);

    return res.json(produto);
  }
};
