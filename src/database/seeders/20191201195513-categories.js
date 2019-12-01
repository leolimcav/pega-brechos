"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        nome_categoria: "Feminino",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Masculino",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Roupa",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Acessório",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Calçado",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Camisa",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Calça",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Regata",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Vestido",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Short",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Saia",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Sapato",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Sandália",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Bolsa",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Brinco",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Colar",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Pulseira",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Jaqueta",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nome_categoria: "Cropped",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};
