const PessoaJuridica = require("../models/PessoaJuridica");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    const { pj_id } = req.params;
    const PJ = await PessoaJuridica.findById(pj_id);

    if (!PJ) {
      return res.json({ msg: "Pessoa Juridica não encontrada!" });
    }

    return res.json(PJ);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { cnpj, nome_fantasia, natureza_juridica } = req.body;
    const usuario = await Usuario.findById(user_id);

    if (!usuario) {
      return res.json({ msg: "Usuario não encontrado!" });
    }

    const PJ = await PessoaJuridica.create({
      cnpj,
      nome_fantasia,
      natureza_juridica,
      user_id
    });

    return res.json(PJ);
  },

  async update(req, res) {
    const { pj_id } = req.params;
    const { cnpj, nome_fantasia, natureza_juridica } = req.body;
    let PJ = await PessoaJuridica.findById(pj_id);

    if (!PJ) {
      return res.json({ msg: "Pessoa Juridica não encontrada!" });
    }

    PJ = await PessoaJuridica.findByIdAndUpdate(pj_id, {
      cnpj,
      nome_fantasia,
      natureza_juridica
    });

    return res.json(PJ);
  },

  async destroy(req, res) {
    const { pj_id } = req.params;
    const PJ = await PessoaJuridica.findById(pj_id);

    if (!PJ) {
      return res.json({ msg: "Pessoa Juridica não encontrada!" });
    }

    await PessoaJuridica.findByIdAndDelete(pj_id);

    return PJ;
  }
};
