const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.VIRTUAL,
        hash_senha: DataTypes.STRING,
        telefone: DataTypes.STRING(11),
        rg: DataTypes.STRING(11),
        cpf: DataTypes.STRING(11),
        data_nascimento: DataTypes.DATEONLY,
        sexo: DataTypes.STRING(1)
      },
      {
        hooks: {
          beforeSave: async usuario => {
            if (usuario.senha) {
              usuario.hash_senha = await bcrypt.hash(usuario.senha, 8);
            }
          }
        },
        sequelize
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Endereco, {
      foreignKey: "usuario_id",
      as: "enderecos"
    });

    this.hasMany(models.Produto, {
      foreignKey: "usuario_id",
      as: "usuario_produtos"
    });

    this.hasMany(models.Pedido, {
      foreignKey: "usuario_id",
      as: "usuario_pedidos"
    });

    this.hasMany(models.Anuncio, {
      foreignKey: "usuario_id",
      as: "usuario_anuncios"
    });
  }
}

Usuario.prototype.checkPassword = function(password) {
  return bcrypt.compare(password, this.hash_senha);
};

module.exports = Usuario;
