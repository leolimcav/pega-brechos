const { Model, DataTypes } = require("sequelize");

class Anuncio extends Model {
  static init(sequelize) {
    super.init(
      {
        data_nascimento: DataTypes.DATEONLY,
        status: DataTypes.STRING(7)
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Produto, {
      foreignKey: "produto_id",
      as: "anuncio_produto"
    });

    this.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "anuncio_usuario"
    });

    this.hasMany(models.Pergunta, {
      foreignKey: "anuncio_id",
      as: "anuncio_perguntas"
    });
  }
}

module.exports = Anuncio;
