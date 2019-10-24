const Usuario = require('../models/Usuario');

module.exports = {
  async index(req, res) {
    const usuarios = await Usuario.findAll();
    return res.json(usuarios);
  },

  async store(req, res) {
    const { data } = req.body;
    const usuario = await Usuario.create(data);
    return res.json(usuario);
  },

  async findById(req, res) {
    const { userid } = req.params;
    const usuario = await Usuario.findById(userid);
    return res.json(usuario);
  },

  async update(req, res) {
    return res.json({ msg: 'oi' });
  },
};