const { Model, DataTypes } = require("sequelize");

class Announcement extends Model {
  static init(sequelize) {
    super.init(
      {
        data_anuncio: DataTypes.DATEONLY,
        status: DataTypes.STRING(7),
        tipo_pagamento: DataTypes.STRING(20)
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: "produto_id",
      as: "anuncio_produto"
    });

    this.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "anuncio_usuario"
    });

    this.hasMany(models.Question, {
      foreignKey: "anuncio_id",
      as: "anuncio_perguntas"
    });
  }
}

module.exports = Announcement;
