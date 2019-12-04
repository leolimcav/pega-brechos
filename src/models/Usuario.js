const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
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
        sexo: DataTypes.STRING(1),
        is_brecho: DataTypes.STRING(1)
      },
      {
        hooks: {
          beforeSave: async user => {
            if (user.senha) {
              user.hash_senha = await bcrypt.hash(user.senha, 8);
            }
          }
        },
        sequelize
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Address, {
      foreignKey: "usuario_id",
      as: "enderecos"
    });

    this.hasMany(models.Product, {
      foreignKey: "usuario_id",
      as: "usuario_produtos"
    });

    this.hasMany(models.Order, {
      foreignKey: "usuario_id",
      as: "usuario_pedidos"
    });

    this.hasMany(models.Announcement, {
      foreignKey: "usuario_id",
      as: "usuario_anuncios"
    });
  }
}

User.prototype.checkPassword = function(password) {
  return bcrypt.compare(password, this.hash_senha);
};

module.exports = User;
