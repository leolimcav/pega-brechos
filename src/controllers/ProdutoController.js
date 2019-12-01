const Produto = require("../models/Produto");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { product_id } = req.params;
    try {
      const produto = await Produto.findByPk(product_id, {
        include: {
          association: "categories",
          through: {
            attributes: []
          }
        }
      });

      return res.json(produto);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async findAll(req, res) {
    const { user_id } = req.params;
    try {
      const produtos = await Produto.findAll({
        where: { usuario_id: user_id },
        include: [{ association: "categories", through: { attributes: [] } }]
      });

      return res.json(produtos);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { titulo, descricao, valor, categoria, tamanho, estado } = req.body;
    try {
      const usuario = await Usuario.findByPk(user_id);

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      const produto = await Produto.create({
        titulo,
        descricao,
        valor,
        tamanho,
        estado,
        usuario_id: user_id
      });

      await produto.addCategories(categoria);

      return res.json(produto);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async update(req, res) {
    const { product_id } = req.params;
    const { titulo, descricao, valor, categoria, tamanho, estado } = req.body;
    try {
      const produto = await Produto.findByPk(product_id, {
        include: {
          association: "categories",
          attributes: ["id", "nome_categoria"],
          through: { attributes: [] }
        }
      });
      await produto.removeCategories(produto.categories);
      await produto.addCategories(categoria);
      await produto.update({
        titulo,
        descricao,
        valor,
        tamanho,
        estado
      });

      return res.json(produto);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async destroy(req, res) {
    const { product_id } = req.params;
    try {
      const produto = await Produto.findByPk(product_id);

      await produto.destroy();

      return res.json(produto);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  }
};
