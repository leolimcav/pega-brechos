const Anuncio = require("../models/Anuncio");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const usuario = await Usuario.findById(user_id);

    if (usuario.length === 0) {
      return res.json({ msg: "Usuário não encontrado!" });
    }

    const anuncios = await Anuncio.findAll(user_id);

    return res.json(anuncios);
  },

  async findOne(req, res) {
    const { poster_id } = req.params;

    const anuncio = await Anuncio.findById(poster_id);

    return res.json(anuncio);
  },

  async store(req, res) {
    const { product_id, user_id } = req.params;
    const anuncio = await Anuncio.create({
      produto_id: product_id,
      usuario_id: user_id
    });

    return res.json(anuncio);
  },

  async update(req, res) {
    const { poster_id } = req.params;
    const { status } = req.body;

    const an = await Anuncio.findById(poster_id);

    if (an.length === 0) {
      return res.json({ msg: "Anuncio não encontrado!" });
    }

    const anuncio = await Anuncio.Update({ anuncio_id: poster_id, status });

    return res.json(anuncio);
  }
};
