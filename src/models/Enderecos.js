const { Model, DataTypes } = require("sequelize");

class Endereco extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: DataTypes.STRING(8),
        logradouro: DataTypes.STRING,
        bairro: DataTypes.STRING,
        cidade: DataTypes.STRING,
        uf: DataTypes.STRING(2),
        numero: DataTypes.STRING,
        complemento: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario"
    });
  }
}

module.exports = Endereco;
