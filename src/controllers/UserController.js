const Users = require('../models/Users');

module.exports = {
  async index(req, res) {
    const users = await Users.findAll();
    return res.json(users);
  },

  async store(req, res) {
    const { data } = req.body;
    const user = await Users.create(data);
    return res.json(user);
  },

  async findById(req, res) {
    const { userid } = req.params;
    const user = await Users.findById(userid);
    return res.json(user);
  },

  async findByIdAndUpdate(req, res) {
    return res.json({ msg: 'oi' });
  },
};
