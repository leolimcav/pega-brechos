const { Op } = require("sequelize");
const Usuario = require("../models/Usuario");
const Produto = require("../models/Produto");
const Anuncio = require("../models/Anuncio");

module.exports = {
  async findUser(req, res) {
    try {
      const { nome } = req.query;

      const usuario = await Usuario.findAll({
        where: {
          nome: {
            [Op.iLike]: `%${nome}%`
          }
        }
      });

      return res.json(usuario);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },
  async findProduct(req, res) {
    const { nome } = req.query;
    try {
      const anuncio = await Anuncio.findAll({
        include: {
          association: "anuncio_produto",
          where: {
            titulo: {
              [Op.iLike]: `%${nome}%`
            }
          }
        }
      });

      return res.json(anuncio);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async findCategory(req, res) {
    const { categoria } = req.query;

    try {
      const produtos = await Produto.findAll({
        include: [
          {
            association: "categories",
            where: {
              nome_categoria: {
                [Op.iLike]: `%${categoria}%`
              }
            }
          },
          {
            association: "produto_anuncio"
          }
        ]
      });

      return res.json(produtos);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred" });
    }
  }
};
