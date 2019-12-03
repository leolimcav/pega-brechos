const Anuncio = require("../models/Anuncio");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    try {
      const anuncios = await Anuncio.findAll({
        where: {
          usuario_id: user_id
        },
        include: [
          {
            association: "anuncio_produto"
          },
          {
            association: "anuncio_usuario",
            attributes: []
          }
        ]
      });

      return res.json(anuncios);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async findOne(req, res) {
    const { poster_id, user_id } = req.params;
    try {
      const anuncio = await Anuncio.findByPk(poster_id, {
        where: {
          usuario_id: user_id
        },
        include: [
          {
            association: "anuncio_produto"
          },
          {
            association: "anuncio_usuario",
            attributes: []
          }
        ]
      });

      return res.json(anuncio);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async store(req, res) {
    const { product_id, user_id } = req.params;
    const { data_anuncio, tipo_pagamento } = req.body;
    try {
      const usuario = await Usuario.findByPk(user_id);

      if (!usuario) {
        return res.json({ msg: "Usuário não encontrado!" });
      }

      const anuncio = await Anuncio.create({
        usuario_id: user_id,
        produto_id: product_id,
        data_anuncio,
        tipo_pagamento
      });

      return res.json(anuncio);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  },

  async update(req, res) {
    const { poster_id } = req.params;
    const { status } = req.body;
    try {
      const anuncio = await Anuncio.findByPk(poster_id);

      if (!anuncio) {
        return res.json({ msg: "Anuncio não encontrado!" });
      }

      await anuncio.update({ status });

      return res.json(anuncio);
    } catch (err) {
      console.log(err);
      return res.json({ error: "An error ocurred!" });
    }
  }
};
