const Produto = require("../models/Produto");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { product_id } = req.params;
    const produto = await Produto.findById(product_id);

    if (!produto) {
      return res.json({ msg: "Produto não encontrado!" });
    }

    return res.json(produto);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { nome, descricao, valor, categoria, tamanho, estado } = req.body;
    const usuario = await Usuario.findById(user_id);

    if (!usuario) {
      return res.json({ msg: "Usuario não encontrado!" });
    }

    const produto = await Produto.create(
      { nome, descricao, valor, categoria, tamanho, estado },
      user_id
    );

    return res.json(produto);
  },

  async update(req, res) {
    const { product_id } = req.params;
    const { nome, descricao, valor, categoria, tamanho, estado } = req.body;
    const produto = await Produto.findByIdAndUpdate(product_id, {
      nome,
      descricao,
      valor,
      categoria,
      tamanho,
      estado
    });

    return res.json(produto);
  },

  async destroy(req, res) {
    const { product_id } = req.params;
    const produto = await Produto.findByIdAndDelete(product_id);
    return res.json(produto);
  }
};