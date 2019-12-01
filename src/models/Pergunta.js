const { Model, DataTypes } = require("sequelize");

class Question extends Model {
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
    this.belongsTo(models.Announcement, {
      foreignKey: "anuncio_id",
      as: "anuncio"
    });

    this.hasMany(models.Answer, {
      foreignKey: "pergunta_id",
      as: "respostas"
    });
  }
}

module.exports = Question;
