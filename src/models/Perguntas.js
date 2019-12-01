const { Model, DataTypes } = require("sequelize");

class Pergunta extends Model {
  static init(sequelize) {
    super.init(
      {
        mensagem: DataTypes.TEXT,
        data_pergunta: DataTypes.DATEONLY
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Anuncio, {
      foreignKey: "anuncio_id",
      as: "anuncio"
    });

    this.hasMany(models.Resposta, {
      foreignKey: "pergunta_id",
      as: "respostas"
    });
  }
}

module.exports = Pergunta;
