const PessoaFisica = require("../models/PessoaFisica");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { pfid } = req.params;
    const pessoaFisica = await PessoaFisica.findById(pfid);
    if (!pessoaFisica) {
      return res.json({ msg: "Pessoa Fisica não encontrada!" });
    }

    return res.json(pessoaFisica);
  },

  async store(req, res) {
    const { userid } = req.params;
    const { cpf, rg, dataNascimento, sexo } = req.body;

    const usuario = await Usuario.findById(userid);

    if (!usuario) {
      return res.json({ msg: "Usuario não encontrado!" });
    }

    const pessoaFisica = await PessoaFisica.create({
      cpf,
      rg,
      dataNascimento,
      sexo,
      userid
    });

    return res.json(pessoaFisica);
  },

  async update(req, res) {
    const { pfid } = req.params;
    const { cpf, rg, dataNascimento, sexo } = req.body;

    let pessoaFisica = await PessoaFisica.findById(pfid);

    if (!pessoaFisica) {
      return res.json({ msg: "Pessoa Fisica não encontrada" });
    }

    pessoaFisica = await PessoaFisica.findByIdAndUpdate(pfid, {
      cpf,
      rg,
      dataNascimento,
      sexo
    });

    return res.json(pessoaFisica);
  },

  async destroy(req, res) {
    const { pfid } = req.params;

    const pessoaFisica = await PessoaFisica.findById(pfid);

    if (!pessoaFisica) {
      return res.json({ msg: "Pessoa Fisica não encontrada!" });
    }

    await PessoaFisica.findByIdAndDelete(pfid);

    return res.json(pessoaFisica);
  }
};
