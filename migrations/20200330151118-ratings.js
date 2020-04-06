"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ratings", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      count: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      meal_name: {
        type: Sequelize.STRING,
      },
      restaurant_name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ratings");
  }
};
