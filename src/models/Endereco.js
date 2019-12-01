const { Model, DataTypes } = require("sequelize");

class Address extends Model {
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
    this.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "usuario"
    });
  }
}

module.exports = Address;
