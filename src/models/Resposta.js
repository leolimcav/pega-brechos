const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
  static init(sequelize) {
    super.init(
      {
        mensagem: DataTypes.TEXT,
        data_resposta: DataTypes.DATEONLY,
        resposta: DataTypes.INTEGER
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: "pergunta_id",
      as: "perguntas"
    });
  }
}

module.exports = Answer;
