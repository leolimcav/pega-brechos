const Usuario = require('../models/Usuario');

module.exports = {
  async index(req, res) {
    const usuarios = await Usuario.findAll();
    return res.render('index', {
      usuarios,
    });
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
    const { userid } = req.params;
    const { data } = req.body;
    const user = await Usuario.findByIdAndUpdate(userid, data);
    return res.json(user);
  },
};
