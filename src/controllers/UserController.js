const Users = require('../models/Users');

module.exports = {
  async store(req, res) {
    const { data } = req.body;
    const user = await Users.create(data);
    return res.json(user);
  },
};
